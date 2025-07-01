import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Car, RotateCw } from 'lucide-react';
import socket from '../socket';

const RideStatus = ({ rideData }) => {
  const navigate = useNavigate();
  const rideIdRef = useRef(null);
  const [status, setStatus] = useState({
    state: 'pending',
    driver: null,
    timer: 60,
    error: null,
  });

  useEffect(() => {
    if (!rideData?.ride_id) {
      navigate('/book');
      return;
    }


    if (!rideIdRef.current) {
      rideIdRef.current = rideData.ride_id;
      console.log('🔐 Locked ride ID:', rideIdRef.current);
    }

    if (!socket.connected) {
      console.log('🔌 Connecting socket...');
      socket.connect();
    }

    const handleAccepted = (data) => {
      console.log('✅ [ride_accepted] Received:', data);

      // Force override for testing
      setStatus({
        state: 'accepted',
        driver: {
          name: data.driver_name,
          car: data.car_plate,
          message: data.message || 'Your driver is coming!',
        },
        timer: 0,
        error: null,
      });
    };

    const handleDeclined = (data) => {
      console.log('❌ [ride_declined] Received:', data);

      setStatus({
        state: 'declined',
        driver: null,
        timer: 0,
        error: data.message || 'No drivers available',
      });
    };

    const handleTripEnded = (data) => {
      setStatus({
        state: 'declined',
        driver: null,
        timer: 0,
        error: 'Trip ended by driver',
      });
    };

    const handleCancelledByDriver = (data) => {
      setStatus({
        state: 'declined',
        driver: null,
        timer: 0,
        error: 'Driver cancelled the ride',
      });
   
    };

    socket.on('ride_accepted', handleAccepted);
    socket.on('ride_declined', handleDeclined);
    socket.on('trip_ended', handleTripEnded);
    socket.on('ride_cancelled_by_driver', handleCancelledByDriver);


    socket.onAny((event, data) => {
      console.log(`Socket Event: ${event}`, data);
    });

    const timer = setInterval(() => {
        if (prev.timer <= 1) {
          clearInterval(timer);
          if (prev.state === 'pending') {
            return { ...prev, state: 'declined', error: 'Request timed out' };
          }
          return prev;
        }
        return { ...prev, timer: prev.timer - 1 };
      });
    }, 1000);

    return () => {
      console.log('🧹 Cleaning up RideStatus listeners...');

      socket.off('ride_accepted', handleAccepted);
      socket.off('ride_declined', handleDeclined);
      socket.off('trip_ended', handleTripEnded);
      socket.off('ride_cancelled_by_driver', handleCancelledByDriver);
      socket.offAny();

      clearInterval(timer);
    };
  }, [rideData?.ride_id, navigate]);


  const handleRetry = () => navigate('/BookRide');

  const handleCancel = () => {
    if (rideData?.ride_id) {
      socket.emit('client_cancel_ride', { ride_id: rideData.ride_id });
    }

    navigate('/BookRide');
  };

  if (!rideData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>No ride information found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={handleCancel} className="flex items-center py-2 px-4 rounded-md bg-gray-300 gap-1 text-blue-600">
            <ArrowLeft className='text-black' size={18} />
            <span className='text-black'>Back</span>
          </button>
          <h1 className="text-xl text-black font-bold">Ride Status</h1>
          <div className="w-6" />
        </div>


        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          {status.state === 'pending' && (
            <>
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-xl font-bold mb-2">Looking for a driver</h2>
              <p className="text-gray-600 mb-4">{status.timer} seconds remaining</p>
              <div className="w-full bg-gray-200 rounded-full h-2">

               <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(status.timer / 60) * 100}%` }}
              />
              </div>
            </>
          )}

          {status.state === 'accepted' && status.driver && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />

              <h2 className="text-xl text-black font-bold mb-2">Driver accepted!</h2>

              <p className="text-gray-600 mb-6">{status.driver.message}</p>
            </>
          )}

          {status.state === 'declined' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Ride not available</h2>
              <p className="text-gray-600 mb-6">{status.error}</p>
            </>
          )}
        </div>


        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold text-black mb-4 text-lg">Trip Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">From:</span>
              <span className='text-black'>{rideData.pickup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">To:</span>
              <span className='text-black'>{rideData.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className='text-black'>{rideData.selectedRide.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fare:</span>
              <span className='text-black'>Ksh {rideData.selectedRide.price}</span>
            </div>
          </div>
        </div>



        {status.state === 'accepted' && status.driver && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Car size={18} className="text-blue-500" />

              <span className='text-black'>Driver Information</span>
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className='text-black'>{status.driver.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span className='text-black'>{status.driver.car}</span>

              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {status.state === 'declined' && (
            <button
              onClick={handleRetry}

              className="bg-black  text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"

            >
              <RotateCw size={18} />
              Try Again
            </button>
          )}
          <button
            onClick={handleCancel}
            className="border bg-black py-3 rounded-lg font-medium"
          >
            {status.state === 'pending' ? 'Cancel Request' : 'Back Home'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideStatus;