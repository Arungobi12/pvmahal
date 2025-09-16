// src/api/bookingService.ts

// This reads the VITE_API_BASE_URL from your .env.local file
const apiUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Submits a new booking to the backend.
 * @param bookingData - The data from the booking form.
 * @returns The server's response.
 */
export const createBooking = async (bookingData: unknown) => {
  try {
    const response = await fetch(`${apiUrl}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      // If the server response is not OK, throw an error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit booking.');
    }

    return await response.json();
  } catch (error) {
    console.error("Booking submission error:", error);
    // Re-throw the error to be handled by the component
    throw error;
  }
};