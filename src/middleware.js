export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/Patient', '/ViewConsent', '/other/:path*', '/help/:path*']
}