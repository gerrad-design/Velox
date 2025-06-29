import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Car, RotateCw } from 'lucide-react';
import socket from '../src/socket';

const RideStatus = ({ rideData }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    state: 'pending', // 'pending' | 'accepted' | 'declined'
    driver: null,
    timer: 60,
    error: null
  });

  useEffect(() => {
    if (!rideData?.ride_id) {
      navigate('/book');
      return;
    }

    console.log('Tracking ride:', rideData.ride_id);

    const handleAccepted = (data) => {
      if (data.ride_id === rideData.ride_id) {
        setStatus({
          state: 'accepted',
          driver: {
            name: data.driver_name,
            car: data.car_plate,
            message: data.message || 'Your driver is coming!'
          },
          timer: 0,
          error: null
        });
      }
    };

    const handleDeclined = (data) => {
      if (data.ride_id === rideData.ride_id) {
        setStatus({
          state: 'declined',
          driver: null,
          timer: 0,
          error: data.message || 'No drivers available'
        });
      }
    };

    const handleTripEnded = (data) => {
      if (data.ride_id === rideData.ride_id) {
        setStatus({
          state: 'declined',
          driver: null,
          timer: 0,
          error: 'Trip ended by driver'
        });
      }
    };

    const handleCancelledByDriver = (data) => {
      if (data.ride_id === rideData.ride_id) {
        setStatus({
          state: 'declined',
          driver: null,
          timer: 0,
          error: 'Driver cancelled the ride'
        });
      }
    };

    socket.on('ride_accepted', handleAccepted);
    socket.on('ride_declined', handleDeclined);
    socket.on('trip_ended', handleTripEnded);
    socket.on('ride_cancelled_by_driver', handleCancelledByDriver);

    const timer = setInterval(() => {
      setStatus(prev => {
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
      socket.off('ride_accepted', handleAccepted);
      socket.off('ride_declined', handleDeclined);
      socket.off('trip_ended', handleTripEnded);
      socket.off('ride_cancelled_by_driver', handleCancelledByDriver);
      clearInterval(timer);
    };
  }, [rideData?.ride_id, navigate]);

  const handleRetry = () => navigate('/book');

  const handleCancel = () => {
    if (rideData?.ride_id) {
      socket.emit('client_cancel_ride', { ride_id: rideData.ride_id });
    }
    navigate('/');
  };

  if (!rideData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>No ride information found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={handleCancel} className="flex items-center gap-1 text-blue-600">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold">Ride Status</h1>
          <div className="w-6" />
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          {status.state === 'pending' && (
            <>
              <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-xl font-bold mb-2">Looking for a driver</h2>
              <p className="text-gray-600 mb-4">{status.timer} seconds remaining</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: (status.timer / 60) * 100 + '%' }}
                />
              </div>
            </>
          )}

          {status.state === 'accepted' && status.driver && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Driver accepted!</h2>
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

        {/* Ride Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-bold mb-4 text-lg">Trip Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">From:</span>
              <span>{rideData.pickup}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">To:</span>
              <span>{rideData.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span>{rideData.selectedRide.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fare:</span>
              <span>Ksh {rideData.selectedRide.price}</span>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        {status.state === 'accepted' && status.driver && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Car size={18} className="text-blue-500" />
              <span>Driver Information</span>
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span>{status.driver.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle:</span>
                <span>{status.driver.car}</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {status.state === 'declined' && (
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <RotateCw size={18} />
              Try Again
            </button>
          )}

          <button
            onClick={handleCancel}
            className="border border-gray-300 hover:bg-gray-50 py-3 rounded-lg font-medium"
          >
            {status.state === 'pending' ? 'Cancel Request' : 'Back Home'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideStatus;