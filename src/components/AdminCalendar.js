import React, { useState } from 'react';
import AdminCalendarTemplate from './AdminCalendarTemplate';

function AdminCalendar() {
  const [availability, setAvailability] = useState([]);
  const Calendar = AdminCalendarTemplate({
    availability,
    setAvailability,
  });
  return (
    <div>
      <Calendar />
    </div>
  );
}

export default AdminCalendar;
