'use client';

import Image from "next/image";
import Link from "next/link";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotificationBell from "../component/notificationBell";
import React, { useState, useEffect } from 'react';



export default async function WelcomePatient() {
  const router = useRouter();
  const { data: session } = useSession();
  const nid = session?.user?.id;

  

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center border-b-4 border-blue-800 mt-10 mb-5">
        Welcome {(session?.user?.name)}
      </h1>
         <div className="flex items-center justify-center">
         <Link href = {`/PatientHistory`}>
        <button   className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/consulting.png"
            alt="consulting"
            id="consulting"
            height={200}
            width={130}
          />
          Consultation History{" "}
        </button>
        </Link>
       
        <button className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/diagnostic.png"
            alt="diagnosis"
            id="diagnosis"
            height={200}
            width={130}
          />
          Summary Reports
        </button>
        <Link href = {`/Notifications`}>
        <button className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200">
          <Image
            src="/book.png"
            alt="Logs and Notifications"
            id="book"
            height={200}
            width={130}
          />
          Logs & Notifications
        </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
     
      <h1 className="font-semibold " >"Take a break and stretch every hour."</h1>
    
      </div>
    </main>
    
  );
}
