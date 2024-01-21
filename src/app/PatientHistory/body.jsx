"use client";

import { get } from "http";
import { getToken } from "next-auth/jwt";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { db } from "../firebaseConfig";
import Image from "next/image";
import  Link  from "next/link";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { set, update } from "firebase/database";

const PatientHistory = () => {
  let { data: session } = useSession();

  const [data, setData] = useState(false);
  const [NID, setNID] = useState("");
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const router = useRouter();

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  const verifyOTP = () => {
    return OTP === generatedOTP;
  };

  const sendOtpToFirestore = async (otp, nid) => {
    try {
      // Check if the 'otp' collection exists
      const otpCollectionRef = collection(db, nid);
      const collectionSnapshot = await getDocs(otpCollectionRef);

      if (collectionSnapshot.empty) {
        console.log("Collection 'otp' does not exist. Creating...");

        await addDoc(otpCollectionRef, { otp: otp });

        console.log("Collection 'otp' created successfully.");
      } else {
        await addDoc(otpCollectionRef, { otp: otp });
      }
    } catch (error) {
      console.error("Error adding OTP: ", error.message);
    }
  };

  async function MedicalHistory() {

    setLoading(true);

    try {
      const otp = generateOTP();
      console.log("Generated OTP:", otp);
       await sendOtpToFirestore(otp, NID);
      setId(true);
      console.log("OTP sent to firestore");
    } catch (error) {
      console.error("Fetch error:", error);
    
    }
    setNID("");
  }

  const handleVerifyOTP = () => {

    if (verifyOTP()) {

      session.user.auth = true;
      setData(session.user.auth);
       setId(false);

      console.log("Client Session", session?.user?.auth);
      console.log("OTP is valid");
      router.push("/PatientHistory");
    } else {
      console.log("Invalid OTP");
    }
  };

  return (
    <div className="">
      <header className="my-20">
        <h1 className="text-center font-extrabold text-sky-700 tracking-tight text-6xl">
          Patient Information
        </h1>
      </header>
      <div className="bg-white flex justify-center items-center h-auto border-m mt-10">
        <table>
          <tbody className="">
            <tr className="">
              <td className="text-md px-10 py-5 ">
                <label
                  className="block font-serif text-blueGray-600 text-xl font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Enter Patient's NID
                </label>
              </td>
              <td className="text-md px-10 py-5 ">
                <input
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  w-80 ease-linear transition-all duration-150"
                  onChange={(e) => {
                    setNID(e.target.value);
                  }}
                  type="text"
                  placeholder="NID no."
                  value={NID}
                />
              </td>
              <td className="text-md px-10 py-5 ">
                <button
                  className=" inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal bg-blue-500 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 "
                  onClick={MedicalHistory}
                >
                  Search
                </button>
              </td>
            </tr>
           
            {id ? (
              <tr className="">
                <td className="text-md px-10 py-5 ">
                  <label
                    className="block font-serif text-blueGray-600 text-xl font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Enter OTP
                  </label>
                </td>
                <td className="text-md px-10 py-5 ">
                  <input
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  w-80 ease-linear transition-all duration-150"
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                    type="text"
                    placeholder="OTP"
                    value={OTP}
                  />
                </td>
                <td className="text-md px-10 py-5 ">
                  <button
                    className="inline-block w-full rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal bg-blue-500 text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600"
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>


      {data ? ( 
       <div className="flex items-center justify-center">
        <Link href={'/ConsultationHistory'}>
       <button
           className="flex flex-col items-center justify-center w-500 h-500 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
       >
           <Image src={"/consulting.png"} alt="consulting" id="consulting" height={200} width={130} />

            Patient's Previous Record
       </button>
       </Link>
       <Link href={`/MedicalRecordEntry`}>
       <button
           className="flex flex-col items-center justify-center w-400 h-400 border border-blue-600 text-blue font-bold px-20 py-10 m-10 rounded-md hover:bg-blue-200"
       >
           <Image src={"/diagnostic.png"} alt="diagnosis" id="diagnosis" height={200} width={130} />

           New Diagnosis Reports 
       </button>
       </Link>
   </div>
  




     ) : null}

    </div>
  );
};

export default PatientHistory;
