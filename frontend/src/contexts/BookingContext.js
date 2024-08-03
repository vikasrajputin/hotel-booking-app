// src/contexts/BookingContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context
const BookingContext = createContext();

// Create a provider component
export function BookingProvider({ children }) {
  const [city, setCity] = useState('Goa');
  const [checkIn, setCheckIn] = useState('2024-08-20');
  const [checkOut, setCheckOut] = useState('2024-08-21');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [childrens, setChildrens] = useState(1);
  const [priceRange, setPriceRange] = useState('₹ 0 - ₹ 1500');

  return (
    <BookingContext.Provider value={{ city, setCity, checkIn, setCheckIn, checkOut, setCheckOut, rooms, setRooms, adults, setAdults, childrens, setChildrens, priceRange, setPriceRange }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook to use the context
export function useBooking() {
  return useContext(BookingContext);
}
