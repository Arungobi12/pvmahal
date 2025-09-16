// src/api/sheetsService.ts

export interface BookingData {
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

// Google Sheets Integration
class SheetsService {
  private sheetsUrl: string = '';
  
  constructor() {
    // You'll need to set this in your .env.local file
    this.sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';
  }

  /**
   * Send booking data to Google Sheets via Google Apps Script
   * This method sends data to a Google Sheets web app
   */
  async sendToGoogleSheets(bookingData: BookingData): Promise<boolean> {
    if (!this.sheetsUrl) {
      console.warn('Google Sheets URL not configured');
      return false;
    }

    try {
      const response = await fetch(this.sheetsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...bookingData
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      return false;
    }
  }

  /**
   * Export bookings to CSV format
   */
  exportToCSV(bookings: BookingData[]): void {
    const headers = [
      'ID',
      'Event Type',
      'Event Date',
      'Time Slot',
      'Guest Count',
      'Customer Name',
      'Email',
      'Phone',
      'Special Requests',
      'Status',
      'Created At'
    ];

    const csvContent = [
      headers.join(','),
      ...bookings.map(booking => [
        booking.id,
        booking.eventType,
        booking.eventDate,
        booking.timeSlot,
        booking.guestCount,
        `"${booking.name}"`,
        booking.email,
        booking.phone,
        `"${booking.specialRequests || ''}"`,
        booking.status,
        booking.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `pv-mahal-bookings-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Export bookings to Excel format (using CSV with Excel headers)
   */
  exportToExcel(bookings: BookingData[]): void {
    const headers = [
      'Booking ID',
      'Event Type',
      'Event Date',
      'Time Slot',
      'Number of Guests',
      'Customer Name',
      'Email Address',
      'Phone Number',
      'Special Requests',
      'Booking Status',
      'Created Date'
    ];

    // Add BOM for Excel to recognize UTF-8
    const BOM = '\uFEFF';
    const csvContent = BOM + [
      headers.join(','),
      ...bookings.map(booking => [
        booking.id,
        booking.eventType,
        booking.eventDate,
        booking.timeSlot,
        booking.guestCount,
        `"${booking.name}"`,
        booking.email,
        booking.phone,
        `"${booking.specialRequests || ''}"`,
        booking.status,
        booking.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `PV-Mahal-Bookings-${new Date().toISOString().split('T')[0]}.xlsx`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Get all bookings from localStorage (demo data)
   */
  getAllBookings(): BookingData[] {
    try {
      const bookings = localStorage.getItem('pv-mahal-bookings');
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error('Error reading bookings from localStorage:', error);
      return [];
    }
  }

  /**
   * Save booking to localStorage and optionally to Google Sheets
   */
  async saveBooking(bookingData: BookingData): Promise<boolean> {
    try {
      // Save to localStorage
      const existingBookings = this.getAllBookings();
      const updatedBookings = [...existingBookings, bookingData];
      localStorage.setItem('pv-mahal-bookings', JSON.stringify(updatedBookings));

      // Optionally send to Google Sheets
      if (this.sheetsUrl) {
        await this.sendToGoogleSheets(bookingData);
      }

      return true;
    } catch (error) {
      console.error('Error saving booking:', error);
      return false;
    }
  }

  /**
   * Create sample data for testing
   */
  createSampleData(): void {
    const sampleBookings: BookingData[] = [
      {
        id: 'BK001',
        eventType: 'wedding',
        eventDate: '2025-02-14',
        timeSlot: 'morning',
        guestCount: 200,
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '+91-9876543210',
        specialRequests: 'Vegetarian menu, flower decorations',
        status: 'confirmed',
        createdAt: '2025-01-15T10:30:00Z'
      },
      {
        id: 'BK002',
        eventType: 'birthday',
        eventDate: '2025-03-10',
        timeSlot: 'evening',
        guestCount: 75,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+91-9876543211',
        specialRequests: 'DJ setup, birthday cake arrangement',
        status: 'pending',
        createdAt: '2025-01-16T14:20:00Z'
      },
      {
        id: 'BK003',
        eventType: 'corporate',
        eventDate: '2025-04-05',
        timeSlot: 'full-day',
        guestCount: 150,
        name: 'Amit Patel',
        email: 'amit@company.com',
        phone: '+91-9876543212',
        specialRequests: 'Audio/visual setup, lunch arrangements',
        status: 'confirmed',
        createdAt: '2025-01-17T09:15:00Z'
      }
    ];

    localStorage.setItem('pv-mahal-bookings', JSON.stringify(sampleBookings));
  }
}

// Export singleton instance
export const sheetsService = new SheetsService();

// Export types
export type { BookingData };