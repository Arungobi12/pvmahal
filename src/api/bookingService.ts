// src/api/bookingService.ts

// This reads the VITE_API_BASE_URL from your .env.local file
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export interface Booking {
  id: string;
  eventType: string;
  eventDate: string;
  timeSlot: string;
  guestCount: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface BlockedDate {
  id: string;
  date: string;
  reason?: string;
  timeSlots?: string[];
}

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

/**
 * Admin function to get all bookings
 */
export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    throw error;
  }
};

/**
 * Admin function to update booking status
 */
export const updateBookingStatus = async (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking> => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update booking:", error);
    throw error;
  }
};

/**
 * Admin function to delete a booking
 */
export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/admin/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
  } catch (error) {
    console.error("Failed to delete booking:", error);
    throw error;
  }
};

/**
 * Admin function to get blocked dates
 */
export const getBlockedDates = async (): Promise<BlockedDate[]> => {
  try {
    const response = await fetch(`${apiUrl}/admin/blocked-dates`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blocked dates');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blocked dates:", error);
    throw error;
  }
};

/**
 * Admin function to block a date
 */
export const blockDate = async (date: string, reason?: string, timeSlots?: string[]): Promise<BlockedDate> => {
  try {
    const response = await fetch(`${apiUrl}/admin/blocked-dates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify({ date, reason, timeSlots }),
    });

    if (!response.ok) {
      throw new Error('Failed to block date');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to block date:", error);
    throw error;
  }
};

/**
 * Admin function to unblock a date
 */
export const unblockDate = async (blockedDateId: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/admin/blocked-dates/${blockedDateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to unblock date');
    }
  } catch (error) {
    console.error("Failed to unblock date:", error);
    throw error;
  }
};

/**
 * Admin authentication
 */
export const adminLogin = async (username: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await fetch(`${apiUrl}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return data;
  } catch (error) {
    console.error("Admin login error:", error);
    throw error;
  }
};

/**
 * Admin logout
 */
export const adminLogout = (): void => {
  localStorage.removeItem('adminToken');
};

/**
 * Check if admin is logged in
 */
export const isAdminLoggedIn = (): boolean => {
  return !!localStorage.getItem('adminToken');
};