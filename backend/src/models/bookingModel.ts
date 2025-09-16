import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  guestCount: { type: String, required: true },
  specialRequests: { type: String },
}, {
  timestamps: true
});

const Booking = model('Booking', bookingSchema);

export default Booking;