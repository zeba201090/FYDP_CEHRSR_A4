import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from '../loading';
import Link from 'next/link';
import { useSearchParams } from 'next/router';

export default function ConsultationHistory() {
    const router = useRouter();
    let { data: session } = useSession();
    console.log("Session", session?.user?.auth);

    if (session?.user?.auth == false) {
        router.push('/dashboard');
    }

    const params = useSearchParams();
    const id = { nid: params.get('nid') };
    console.log(id);

    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    const EHRInfo = async () => {
        try {
            const response = await fetch('/api/DoctorFetch', {
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
                return (item.data.json);
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
        catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const view_ehr = (key) => {
        router.push(`/ConsultationHistory/ViewEHR?id=${id.nid}&key=${key}`);
    }

    useEffect(() => {
        EHRInfo();
    }, [])

    return (
        <Suspense fallback={<Loading />}>
            <main className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold border-b-4 border-blue-500 mt-10 mb-5">Consultation History</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="overflow-auto rounded-lg shadow mb-10">
                        <table className="w-full md:w-auto border">
                            <thead className="bg-blue-200 border-b-2 border-blue-300">
                                <tr className="border border-solid border-l-0 border-r-0">
                                    <th className="text-md md:text-lg lg:text-xl px-4 md:px-10 py-4 border">Date</th>
                                    <th className="text-md md:text-lg lg:text-xl px-4 md:px-10 py-4 border">Hospital</th>
                                    <th className="text-md md:text-lg lg:text-xl px-4 md:px-10 py-4 border">Doctor</th>
                                    <th className="text-md md:text-lg lg:text-xl px-4 md:px-10 py-4 border"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultations.map((consultation, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="text-md md:text-lg lg:text-xl px-4 md:px-8 py-2 md:py-4 border">{consultation.date}</td>
                                        <td className="text-md md:text-lg lg:text-xl px-4 md:px-8 py-2 md:py-4 border">{consultation.hospital}</td>
                                        <td className="text-md md:text-lg lg:text-xl px-4 md:px-8 py-2 md:py-4 border">{consultation.doctor}</td>
                                        <td onClick={() => view_ehr(consultation.date)} className="text-md md:text-lg lg:text-xl px-4 md:px-8 py-2 md:py-4 border">
                                            <Link href={`/ConsultationHistory/ViewEHR?id=${id.nid}&key=${consultation.date}`}>
                                                <button className="bg-blue-500 text-white rounded-full p-2 md:p-3 lg:p-4 w-full md:w-40 hover:bg-blue-700">
                                                    View Details
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex flex-col md:flex-row mt-4">
                    <Link href={'/dashboard'}>
                        <button className="bg-blue-500 text-white px-4 py-2 mb-2 md:mb-0 md:mr-2 rounded">
                            Back to Previous Page
                        </button>
                    </Link>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Summarized Report
                    </button>
                </div>
            </main>
        </Suspense>
    )
}

