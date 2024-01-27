"use client";
import React from "react";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


import { useState } from "react";

const Main = () => {

    const [isAppointClicked, setIsAppointClicked] = useState(false);

    const handleAppointClick = () => {
        setIsAppointClicked(true);
  };
  const handleDownloadPdf = () => {
    const element = document.getElementById('document');

    html2canvas(element).then((canvas) => {
      const pdf=new jsPDF('p','mm','a4',true);
            // const width=pdf.internal.pageSize.getWidth();
            // const height=pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('Appointment.pdf');
    });
  };
  
  const handleDownloadTicket = () => {
    const ticketUrl = 'http://localhost:3000/Hospital/Appointment'; // Replace with the actual URL of the ticket
    const anchor = document.createElement('a');
    anchor.href = ticketUrl;
    anchor.download = 'Appointment.pdf'; // Replace with the desired file name
    anchor.click();
  };



    return(
        <main id="document">
            <h1 className="text-3xl font-bold text-center border-b-4 border-blue-700 mt-20 mb-5 w-3/12 mx-auto">Book Doctor's Appointment
            </h1>
            
            
            


<div>
      
        <div  className="mx-auto flex flex-wrap mt-10 w-2/3">
          <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Patient's NID
                                </label>
                                <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Patient's Name (optional)
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue=""/>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Doctor ID
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                        Doctor's Name (optional)
                                    </label>
                                    <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                                </div>
                            </div>
          <div className="text-center justify-between mx-auto">
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleAppointClick}
            >
              Appoint
            </button>
          </div>
        </div>
      
      {isAppointClicked && (
        <div>
          
          <div className="mt-20 w-6/12 mx-auto">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-2xl font-bold">
                Serial Number #123456
              </h6>
              <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-md px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={handleDownloadPdf}>
                Download Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

</main>
    );
}

export default Main;