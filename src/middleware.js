


export { default } from 'next-auth/middleware'



export const config = {
  
  matcher: ['/dashboard', '/ViewConsent', '/other/:path*', '/help/:path*']
}