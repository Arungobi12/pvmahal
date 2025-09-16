// src/api/contactService.ts

// This reads the VITE_API_BASE_URL from your frontend's .env.local file
const apiUrl = import.meta.env.VITE_API_BASE_URL;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends the contact form data to the backend API.
 * @param data The contact form data.
 * @returns The response from the server.
 */
export const sendContactMessage = async (data: ContactFormData) => {
  const response = await fetch(`${apiUrl}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to send message.');
  }

  return response.json();
};