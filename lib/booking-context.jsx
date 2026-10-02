"use client";
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext({
  isOpen: false,
  options: {},
  openBooking: () => {},
  closeBooking: () => {},
});

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({});

  const openBooking = (opts = {}) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ isOpen, options, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
