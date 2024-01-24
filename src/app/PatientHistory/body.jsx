'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ConsultationHistory() {
  const router = useRouter();
  const params = useSearchParams();
  const id = { nid: params.get('nid') };
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState([]);
  let { data: session } = useSession();

  const EHRInfo = async (e) => {
    try {
      const response = await fetch('/api/EHRFetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const ehr = data?.cleaned_response;
      const consultation_date = ehr.map((item) => {
        console.log(item.data.json);
        return item.data.json;
      });
      if (consultation_date && consultation_date.length > 0) {
        const consultationsData = consultation_date.map((consultation) => ({
          date: consultation.date,
          hospital: consultation.hospital,
          doctor: consultation.doctorName,
        }));
        setConsultations(consultationsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const view_ehr = async (key, id) => {
    router.push(`/PatientHistory/ViewEHR?id=${id.nid}&key=${key}`);
  };

  useEffect(() => {
    EHRInfo();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold border-b-4 border-blue-500 mt-20 mb-5">
          Consultation History
        </h1>
        <div className="overflow-auto rounded-lg shadow mb-10">
          <table className="w-auto border">
            <thead className="bg-blue-200 border-b-2 border-blue-300">
              <tr className="border border-solid border-l-0 border-r-0">
                <th className="text-md px-10 py-5 border">Date</th>
                <th className="text-md px-10 py-5 border">Hospital</th>
                <th className="text-md px-10 py-5 border">Doctor</th>
                <th className="text-md px-10 py-5 border"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-md px-8 py-4 border">
                    <Loading />
                  </td>
                </tr>
              ) : (
                consultations.map((consultation, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="text-md px-8 py-4 border">{consultation.date}</td>
                    <td className="text-md px-8 py-4 border">{consultation.hospital}</td>
                    <td className="text-md px-8 py-4 border">{consultation.doctor}</td>
                    <td onClick={() => view_ehr(consultation.date, id)} className="text-md px-8 py-4 border">
                      <Link href={`/PatientHistory/ViewEHR?id=${id.nid}&key=${consultation.date}`}>
                        <button className="bg-blue-500 text-white rounded-full p-2 w-40 hover:bg-blue-700">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex mt-4">
          <Link href={'/dashboard'}>
            <button className="bg-blue-500 text-white px-4 py-2 mr-10 rounded">
              Back to Previous Page
            </button>
          </Link>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Summarized Report</button>
        </div>
      </main>
    </Suspense>
  );
}
