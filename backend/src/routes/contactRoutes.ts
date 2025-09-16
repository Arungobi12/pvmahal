import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/contact
router.post('/', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  // --- Server-side validation ---
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // In a real application, you would do the following here:
  // 1. Sanitize the input data.
  // 2. Send an email notification (using a service like Nodemailer).
  // 3. Save the message to a database.

  console.log('Received contact form submission:');
  console.log({ name, email, subject, message });

  // Send a success response back to the frontend
  res.status(200).json({ message: 'Message received successfully!' });
});

export default router;