'use client';

import { get } from 'http';
import { getToken } from 'next-auth/jwt';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import ConsultationHistory from '../ConsultationHistory/body';




const PatientHistory = () => {
  let { data: session } = useSession();
  const [data, setData] = useState(false);
  const [NID, setNID] = useState('');
  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const router = useRouter();

  const generateOTP = () => 
  {
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    return otp;

  };

  const verifyOTP = () => 
  {
    return OTP === generatedOTP;
  };

  async function MedicalHistory()
   {
      setLoading(true);

      try {

        setId(true);

        const otp = generateOTP();
        console.log('Generated OTP:', otp);
        const response = await fetch('/api/otpReceive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp: generatedOTP, nid: NID }),
        });

      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
      setNID('');
  }

  const handleVerifyOTP = () => 
  {
    if (verifyOTP())
    {    
      session.user.auth = 'true';
      
      console.log('Client Session', session?.user?.auth)
      console.log('OTP is valid');
      //ekhane saadman allowaccess er reponse anbe
      // if Response.ok {
    //   setData(session.user.auth);
    // }



    } 

    else 
    
    {

      console.log('Invalid OTP');
    }
  };

  return (
    <div>

      <div className="bg-white flex justify-center items-center h-auto border-m mt-10">
        
        <label className="p-5 text-xl font-bold">
          Enter NID no. of patient:
        </label>
        <input
          className="bg-blue-100 border-2 h-14 rounded-xl justify-center px-6"
          onChange={(e) => {
            setNID(e.target.value);
          }}
          type="text"
          placeholder="NID no."
          value={NID}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded "
          onClick={MedicalHistory}
        >
          Search
        </button>
      </div>
      {id && (
        <div className="bg-white flex justify-center items-center h-auto border-m mt-4">
          <label className="p-5 text-xl font-bold">
            Enter OTP for EHR access:
          </label>
          <input
            className="bg-blue-100 border-2 h-14 rounded-xl justify-center px-6"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            type="text"
            placeholder="OTP"
            value={OTP}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>
        </div>
      )}
      

    
</div>
  );
};


export default PatientHistory;
