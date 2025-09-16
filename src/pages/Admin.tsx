import React from "react";

const Admin: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary">Admin Calendar</h1>
      <p className="mt-4 text-muted-foreground">
        This is where you’ll manage bookings and see the hall’s availability.
      </p>
      {/* Later we can add the calendar component here */}
    </div>
  );
};

export default Admin;
