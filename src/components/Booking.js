import React from 'react';
import { useEffect } from 'react';
import Calendar from './Calendar';
import '../style/Booking.css';

function Booking() {
  useEffect(() => {}, []);

  return (
    <div className="CalendarContainer">
      <Calendar />
    </div>
  );
}

export default Booking;
