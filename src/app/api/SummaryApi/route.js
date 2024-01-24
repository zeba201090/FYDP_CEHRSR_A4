import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request){
    const res = await request.json();  
    const ehr=res;     
    console.log('res here', ehr);
    return Response.json({ehr});
}