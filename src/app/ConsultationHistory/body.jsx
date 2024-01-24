'use client';
import React, { Suspense } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from '../loading'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


    


export default function ConsultationHistory(){
    const router = useRouter();
    const ehr;
    const params = useSearchParams();
    const id ={nid:params.get('nid')} 
    console.log(id);
    let { data: session } = useSession();
    console.log("Session", session?.user?.auth);

    const [consultations, setConsultations] = useState([]);

    const EHRInfo=async(e)=>{
        try {
          const response = await fetch('/api/DoctorFetch',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id),
          });  
          if(response.ok){
              const data = await response.json();
              ehr=data?.cleaned_response;
              console.log('ehr',ehr);
              const consultation_date=ehr.map((item)=>{
                  return(item.data.json);
                }); 
                if (consultation_date && consultation_date.length > 0) {
                    const consultationsData = consultation_date.map(consultation => ({
                        date: consultation.date,
                        hospital: consultation.hospital,
                        doctor: consultation.doctorName,
                    }));
                    setConsultations(consultationsData);
                } 
            }
            else{
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const view_ehr=async(key,id)=>{
        router.push(`/ConsultationHistory/ViewEHR?id=${id.nid}&key=${key}`);
    } 

    const summary=async(e)=>{
        try{
          const response = await fetch('/api/SummaryApi',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ehr),
          });  
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        EHRInfo();
    },[])

    return (
        <Suspense fallback={<Loading/>}>
          <ConsultationHistoryTable consultations={consultations} viewEhr={view_ehr} id={id.nid} />
        </Suspense>
      );
      
}
