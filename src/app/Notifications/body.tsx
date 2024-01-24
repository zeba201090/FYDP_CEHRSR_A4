"use client";
import { Suspense, useEffect, useState } from 'react';

import { fetchOtpData,fetchNotificationData } from './fetchOtpData';
import Loading from '../loading';

const Notifications = () => {
  const [otpData, setOtpData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const otpValues = await fetchOtpData();
      const notificationValues = await fetchNotificationData();

      setOtpData(otpValues);
      setNotificationData(notificationValues);
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-20 mb-5">Notifications</h1>

      {/* OTP Table */}
      <div className="overflow-auto rounded-lg flex-col shadow mb-10">
        <table className="w-auto border">
          <thead className="bg-blue-300 border-b-2 border-green-300">
            <tr className="border border-solid border-l-0 border-r-0">
              <th className="text-md px-10 py-5 border">Permission OTP</th>
            </tr>
          </thead>
          <Suspense fallback={<Loading />}>
            <thead>
              {otpData.map((otp, index) => (
                <tr key={index} className="bg-green-100">
                  <th className="text-md px-8 py-4 border">{otp.otp}- {otp.timestamp}</th>
                </tr>
              ))}
            </thead>
          </Suspense>
        </table>
      </div>

      {/* Notifications Table */}
      <div className="overflow-auto rounded-lg shadow mb-10">
        <table className="w-auto border">
          <thead className="bg-blue-200 border-b-2 border-blue-300">
            <tr className="border border-solid border-l-0 border-r-0">
              <th className="text-md px-10 py-5 border">Logs & History</th>
            </tr>
          </thead>
          <Suspense fallback={<Loading />}>
            <tbody>
              {notificationData.map((notification, index) => (
                <tr key={index} className="hover:bg-orange-50 ">
                  <td className="text-md px-8 py-4 border">{notification.notification} </td>
                </tr>
              ))}
            </tbody>
          </Suspense>
        </table>
      </div>
    </main>
  );
};

export default Notifications;



