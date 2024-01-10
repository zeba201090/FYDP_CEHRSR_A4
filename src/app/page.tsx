"use client" ;

import Image from 'next/image'
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";


export default function Home() {
  const auth = useAuth();
  return <> 
           <h1>Public Home Page</h1>
                {auth ? (
                   <p>logged in</p>
                ) : (
                  <Link href="/login">Login</Link>
                )}
  </>
}
