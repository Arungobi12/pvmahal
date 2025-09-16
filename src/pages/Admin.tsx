import React, { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogOut, Users, Calendar, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <AdminDashboard onLogout={handleLogout} />
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
      alert("Logged in successfully!");
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
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-orange-600">PV Mahal Admin Panel</h1>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <span>Booking Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View, edit, and manage all bookings. Update booking status, view customer details, and handle cancellations.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>• View all bookings</li>
                <li>• Update booking status (Pending/Confirmed/Cancelled)</li>
                <li>• Edit booking details</li>
                <li>• Delete bookings</li>
              </ul>
              <Button className="w-full" onClick={() => alert("Booking management feature - Navigate to booking management section")}>
                Manage Bookings
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span>Calendar Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Control the booking calendar. Block dates for maintenance or special events, and manage availability.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>• Block/unblock dates</li>
                <li>• Set maintenance periods</li>
                <li>• View calendar overview</li>
                <li>• Manage date availability</li>
              </ul>
              <Button className="w-full" onClick={() => alert("Calendar management feature - Navigate to calendar management section")}>
                Manage Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-orange-600" />
                <span>System Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure system settings, manage admin accounts, and set up notification preferences.
              </p>
              <ul className="text-sm text-gray-500 mb-4 space-y-1">
                <li>• Admin account management</li>
                <li>• Notification settings</li>
                <li>• System configuration</li>
                <li>• Data backup options</li>
              </ul>
              <Button className="w-full" onClick={() => alert("Settings feature - Navigate to settings section")}>
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-500">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-500">Confirmed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-gray-500">Cancelled</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Admin Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How to Access Admin Features:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Navigate to <code className="bg-gray-100 px-2 py-1 rounded">/admin</code> in your browser</li>
                  <li>Login with credentials: <strong>admin / admin123</strong></li>
                  <li>Access booking management, calendar controls, and settings</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li><strong>Booking Management:</strong> View, edit, approve, or cancel bookings</li>
                  <li><strong>Calendar Control:</strong> Block dates to show as unavailable (red) on the booking calendar</li>
                  <li><strong>Status Updates:</strong> Change booking status manually (Pending → Confirmed/Cancelled)</li>
                  <li><strong>Authentication:</strong> Secure admin access with login protection</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Note:</h4>
                <p className="text-orange-700 text-sm">
                  This is a demo implementation. In production, you would integrate with a real backend API 
                  for booking management, implement proper authentication with password hashing, 
                  and add real-time notifications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
