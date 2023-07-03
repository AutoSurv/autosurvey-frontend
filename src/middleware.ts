export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/org/:path*"] //next 13.4.4 issue on unautorized req: dentifier 'NextResponse' has already been declared: #7650
}
