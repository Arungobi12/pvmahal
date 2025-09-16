import { Router, Request, Response } from 'express';
import Booking from '../models/bookingModel';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import path from 'path';

const router = Router();

const csvWriter = createCsvWriter({
  path: path.resolve(__dirname, '../../bookings.csv'),
  header: [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'phone', title: 'Phone' },
    { id: 'eventType', title: 'Event Type' },
    { id: 'eventDate', title: 'Event Date' },
    { id: 'timeSlot', title: 'Time Slot' },
    { id: 'guestCount', title: 'Guest Count' },
    { id: 'specialRequests', title: 'Special Requests' },
    { id: 'createdAt', title: 'Submission Date' },
  ],
  append: true,
});

// ROUTE TO GET ALL BOOKINGS (for the Admin Page)
router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});

// ROUTE TO CREATE A NEW BOOKING (from the Booking Form)
router.post('/', async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;

    if (!bookingData.name || !bookingData.eventDate || !bookingData.eventType) {
      return res.status(400).json({ message: 'Missing required booking fields.' });
    }

    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    
    // --- FIX START ---
    // Create a new, clean object specifically for the CSV record.
    const csvRecord = {
      ...savedBooking.toObject(),
      // Format the dates into readable strings for the CSV file.
      eventDate: new Date(savedBooking.eventDate).toLocaleDateString('en-IN'), // Use Indian date format
      createdAt: new Date(savedBooking.createdAt).toLocaleString('en-IN'),
    };
    
    // Write the new, formatted record to the CSV.
    await csvWriter.writeRecords([csvRecord]);
    // --- FIX END ---

    console.log('Booking saved to database and bookings.csv');
    
    res.status(201).json({ 
      message: 'Booking request received and saved successfully!',
      booking: savedBooking 
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Failed to save booking. Please try again.' });
  }
});

export default router;