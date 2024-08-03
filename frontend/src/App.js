import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom';
import Home from './Hotels/Home';
import Headers from './Hotels/Header ';
import HotelList from './List/HotelList';
import { RoomDetail } from './RoomPage/RoomDetail';

import { RoomType } from './RoomPage/RoomType';
import { PropertyRules } from './RoomPage/PropertyRules';
import { UserRating } from './RoomPage/UserRating';
import { RoomHeader } from './RoomPage/RoomHeader';
import { Booking } from './BookingPage/Booking';
import { SignUpLogin } from './SignUpLogin/SignUpLogin';
import Profile from './MyProfile/Profile';
import { BookingProvider } from './contexts/BookingContext';
import AuthGuard from './AuthGuard';



function App() {
  const [hotels, setHotels] = useState([]); // Define setHotels here
  // const [priceRange, setPriceRange] = useState('₹ 0 - ₹ 1500');
 

  return (
   <>
    <BookingProvider>
    <BrowserRouter> 
      <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/hotels' element={
        <AuthGuard>
        <Headers  hotels={hotels} setHotels={setHotels}  
      // priceRange={priceRange} setPriceRange={setPriceRange} 
      />
      </AuthGuard>} 
      />
   
      <Route path='/list' element={
         <AuthGuard>
        <HotelList  hotels={hotels} 
      // priceRange={priceRange} setPriceRange={setPriceRange} 
      />
      </AuthGuard>} />


      <Route path="/roomPages" element={
        <AuthGuard>
        <RoomHeader></RoomHeader>
        </AuthGuard>
        }/>
      <Route path="/roomDetails" element={
          <AuthGuard>
        <RoomDetail></RoomDetail>
        </AuthGuard>
        }/>
        {/* // <><RoomDetail></RoomDetail>
        // <RoomType></RoomType>
        // <PropertyRules></PropertyRules>
        // <UserRating ></UserRating>
        // </>}
        
        // /> */}
      <Route path="/booking" element={
          <AuthGuard>
        <Booking></Booking>
        </AuthGuard>
        }/>

      <Route path="/sign" element={<SignUpLogin></SignUpLogin>}/>

      <Route path="/profile" element={
          <AuthGuard>
        <Profile></Profile>
        </AuthGuard>
        }
        
        />
      </Routes>
      </BrowserRouter>
      </BookingProvider>
   </>
  );
}

export default App;
