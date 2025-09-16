import { Router, Request, Response } from 'express';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';

const router = Router();

// JSON file storage paths
const bookingsFilePath = path.resolve(__dirname, '../../data/bookings.json');
const dataDir = path.resolve(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure bookings file exists
if (!fs.existsSync(bookingsFilePath)) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify([]));
}

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

// Helper functions for JSON file operations
const readBookings = () => {
  try {
    const data = fs.readFileSync(bookingsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeBookings = (bookings: any[]) => {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2));
};

// ROUTE TO GET ALL BOOKINGS (for the Admin Page)
router.get('/', async (req: Request, res: Response) => {
  try {
    const bookings = readBookings();
    // Sort by createdAt descending
    bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

    // Create booking object with ID and timestamp
    const newBooking = {
      _id: Date.now().toString(),
      ...bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Read existing bookings
    const bookings = readBookings();
    
    // Add new booking
    bookings.push(newBooking);
    
    // Save to JSON file
    writeBookings(bookings);
    
    // Create CSV record
    const csvRecord = {
      ...newBooking,
      eventDate: new Date(newBooking.eventDate).toLocaleDateString(),
      createdAt: new Date(newBooking.createdAt).toLocaleDateString(),
    };
    
    // Write to CSV
    await csvWriter.writeRecords([csvRecord]);
    
    console.log('✅ Booking saved successfully:', newBooking._id);
    res.status(201).json({
      message: 'Booking saved successfully!',
      booking: newBooking
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Failed to save booking.' });
  }
});

export default router;