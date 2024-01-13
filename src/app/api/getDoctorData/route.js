import { db } from "@/libs/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const doctors = await db.Doctor.findMany();
        console.log(doctors);
        return NextResponse.json(doctors, { status: 200 });

    } catch (error) {
        console.error('Error fetching doctors:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
