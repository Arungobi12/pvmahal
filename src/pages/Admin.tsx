import React, { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { 
  Shield, 
  LogOut, 
  Download, 
  FileSpreadsheet, 
  Users, 
  Calendar as CalendarIcon, 
  Settings,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Bell,
  User,
  Save,
  RefreshCw
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sheetsService, type BookingData } from "@/api/sheetsService";
import { toast } from "sonner";
import "../styles/calendar.css";

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('adminAuthenticated', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      onLogin();
      toast.success("Logged in successfully!");
    } else {
      setError("Invalid credentials. Use admin/admin123");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
            
            <p className="text-sm text-gray-600 text-center">
              Demo credentials: admin / admin123
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    loadBookings();
    loadBlockedDates();
  }, []);

  const loadBookings = () => {
    const allBookings = sheetsService.getAllBookings();
    setBookings(allBookings);
    
    if (allBookings.length === 0) {
      sheetsService.createSampleData();
      setBookings(sheetsService.getAllBookings());
    }
  };

  const loadBlockedDates = () => {
    const blocked = JSON.parse(localStorage.getItem('blockedDates') || '[]');
    setBlockedDates(blocked.map((date: string) => new Date(date)));
  };

  const handleExportToExcel = () => {
    sheetsService.exportToExcel(bookings);
    toast.success("Bookings exported to Excel successfully!");
  };

  const handleExportToCSV = () => {
    sheetsService.exportToCSV(bookings);
    toast.success("Bookings exported to CSV successfully!");
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    toast.success(`Booking status updated to ${newStatus}!`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    toast.success("Booking deleted successfully!");
  };

  const handleEditBooking = (booking: BookingData) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleBlockDate = (date: Date) => {
    const isBlocked = blockedDates.some(blockedDate => 
      blockedDate.toDateString() === date.toDateString()
    );
    
    if (isBlocked) {
      const newBlockedDates = blockedDates.filter(blockedDate => 
        blockedDate.toDateString() !== date.toDateString()
      );
      setBlockedDates(newBlockedDates);
      localStorage.setItem('blockedDates', JSON.stringify(newBlockedDates));
      toast.success("Date unblocked successfully!");
    } else {
      const newBlockedDates = [...blockedDates, date];
      setBlockedDates(newBlockedDates);
      localStorage.setItem('blockedDates', JSON.stringify(newBlockedDates));
      toast.success("Date blocked successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-orange-600">PV Mahal Admin Panel</h1>
              <p className="text-gray-600 mt-1">Comprehensive event management system</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportToExcel} className="hover:bg-orange-50 hover:border-orange-300 transition-colors">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button variant="outline" onClick={handleExportToCSV} className="hover:bg-orange-50 hover:border-orange-300 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={onLogout} className="hover:bg-red-50 hover:border-red-300 transition-colors">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{bookings.length}</p>
                      <p className="text-sm text-gray-500">Total Bookings</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {bookings.filter(b => b.status === 'confirmed').length}
                      </p>
                      <p className="text-sm text-gray-500">Confirmed</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {bookings.filter(b => b.status === 'pending').length}
                      </p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {bookings.filter(b => b.status === 'cancelled').length}
                      </p>
                      <p className="text-sm text-gray-500">Cancelled</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5 text-orange-600" />
                  <span>Excel Data Collection System</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Excel Integration Active
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700 text-sm">
                    <ul className="space-y-1">
                      <li>• Automatic data collection from booking forms</li>
                      <li>• Real-time Excel (.xlsx) export capability</li>
                      <li>• CSV export for Google Sheets compatibility</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Complete customer and event information</li>
                      <li>• Booking status tracking and management</li>
                      <li>• Data preservation across sessions</li>
                    </ul>
                  </div>
                </div>

                {bookings.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Recent Bookings Preview
                    </h4>
                    <div className="space-y-2">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex justify-between items-center p-3 bg-white rounded border hover:shadow-md transition-shadow">
                          <div>
                            <div className="font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">
                              {booking.eventType} on {booking.eventDate} for {booking.guestCount} guests
                            </div>
                          </div>
                          <Badge 
                            variant={
                              booking.status === 'confirmed' ? 'default' :
                              booking.status === 'pending' ? 'secondary' :
                              'destructive'
                            }
                            className={
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                              'bg-red-100 text-red-800 hover:bg-red-200'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                      {bookings.length > 3 && (
                        <p className="text-sm text-gray-500 text-center py-2">
                          ...and {bookings.length - 3} more bookings (view in Bookings tab)
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                    <span>Booking Management</span>
                  </span>
                  <Button onClick={loadBookings} variant="outline" size="sm" className="hover:bg-orange-50">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Customer</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell>
                              <div>
                                <div className="font-medium">{booking.name}</div>
                                <div className="text-sm text-gray-500">{booking.email}</div>
                                <div className="text-sm text-gray-500">{booking.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{booking.eventType}</div>
                                <div className="text-sm text-gray-500">{booking.timeSlot}</div>
                              </div>
                            </TableCell>
                            <TableCell>{booking.eventDate}</TableCell>
                            <TableCell>{booking.guestCount}</TableCell>
                            <TableCell>
                              <Select 
                                value={booking.status} 
                                onValueChange={(value: 'pending' | 'confirmed' | 'cancelled') => handleUpdateBookingStatus(booking.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditBooking(booking)}
                                  className="hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteBooking(booking.id)}
                                  className="hover:bg-red-50 hover:border-red-300"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 mb-4">Start by creating sample data or wait for customer bookings.</p>
                    <Button onClick={loadBookings} className="bg-orange-600 hover:bg-orange-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Sample Data
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-orange-600" />
                  <span>Calendar Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Select Dates to Block/Unblock
                    </h3>
                    <style>{`
                      .rdp-day_selected[data-blocked="true"] {
                        background-color: #fee2e2 !important;
                        color: #dc2626 !important;
                        font-weight: bold !important;
                        border: 2px solid #dc2626 !important;
                      }
                      
                      .rdp-day[data-blocked="true"] {
                        background-color: #fee2e2 !important;
                        color: #dc2626 !important;
                        font-weight: bold !important;
                        border: 2px solid #dc2626 !important;
                      }
                      
                      .rdp-day[data-blocked="true"]:hover {
                        background-color: #fca5a5 !important;
                        color: #dc2626 !important;
                      }
                    `}</style>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      modifiers={{
                        blocked: blockedDates
                      }}
                      modifiersStyles={{
                        blocked: {
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          fontWeight: 'bold',
                          border: '2px solid #dc2626',
                          borderRadius: '50%'
                        }
                      }}
                    />
                    {selectedDate && (
                      <div className="mt-4">
                        <Button 
                          onClick={() => handleBlockDate(selectedDate)}
                          className={`w-full ${
                            blockedDates.some(date => date.toDateString() === selectedDate.toDateString())
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-red-600 hover:bg-red-700'
                          }`}
                        >
                          {blockedDates.some(date => date.toDateString() === selectedDate.toDateString())
                            ? 'Unblock Date'
                            : 'Block Date'
                          }
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Blocked Dates ({blockedDates.length})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {blockedDates.length > 0 ? (
                        blockedDates.map((date, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                            <span className="text-red-800 font-medium">
                              {date.toLocaleDateString()}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleBlockDate(date)}
                              className="hover:bg-red-100"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <CalendarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">No blocked dates</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Calendar Management Instructions</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Click on any date in the calendar to select it</li>
                    <li>• Use "Block Date" to prevent bookings on that date</li>
                    <li>• Blocked dates will show in red on customer booking forms</li>
                    <li>• Use "Unblock Date" to make dates available again</li>
                    <li>• Perfect for maintenance periods and holidays</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-orange-600" />
                    <span>Admin Account</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Username</Label>
                    <Input id="admin-username" value="admin" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" type="email" placeholder="admin@pvmahal.com" />
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Save className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive booking alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive urgent alerts via SMS</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Reports</Label>
                      <p className="text-sm text-gray-500">Daily booking summary reports</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-orange-600" />
                    <span>System Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-hours">Business Hours</Label>
                    <Input id="business-hours" value="9:00 AM - 11:00 PM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-capacity">Maximum Capacity</Label>
                    <Input id="max-capacity" type="number" value="500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="booking-window">Advance Booking (Days)</Label>
                    <Input id="booking-window" type="number" value="365" />
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-orange-600" />
                    <span>Data Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start hover:bg-green-50">
                      <Download className="h-4 w-4 mr-2" />
                      Backup All Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-red-50 text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All Data
                    </Button>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Data operations cannot be undone. Please backup before clearing.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Customer Name</Label>
                <Input
                  id="edit-name"
                  value={selectedBooking.name}
                  onChange={(e) => setSelectedBooking({...selectedBooking, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedBooking.email}
                  onChange={(e) => setSelectedBooking({...selectedBooking, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedBooking.phone}
                  onChange={(e) => setSelectedBooking({...selectedBooking, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-guests">Guest Count</Label>
                <Input
                  id="edit-guests"
                  type="number"
                  value={selectedBooking.guestCount}
                  onChange={(e) => setSelectedBooking({...selectedBooking, guestCount: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-requests">Special Requests</Label>
                <Textarea
                  id="edit-requests"
                  value={selectedBooking.specialRequests || ''}
                  onChange={(e) => setSelectedBooking({...selectedBooking, specialRequests: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    const updatedBookings = bookings.map(b => 
                      b.id === selectedBooking.id ? selectedBooking : b
                    );
                    setBookings(updatedBookings);
                    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
                    setIsEditDialogOpen(false);
                    toast.success("Booking updated successfully!");
                  }}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
