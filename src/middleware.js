import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("token")
    let url = req.url
    if(!verify && url.includes('/dashboard')){
        return NextResponse.redirect('http://localhost:3000/')
    }
}
// middleware.js

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export function middleware(req:NextRequest) {
//   const verify = req.cookies.get("token");
//   console.log(verify)
//   const url = req.nextUrl.clone();

//   if (!verify && url.pathname.startsWith('/dashboard')) {
//     // url.pathname = '/';

//     return NextResponse.rewrite(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// // Specify which routes should use the middleware
// export const config = {
//   matcher: ['/dashboard'],
// };
// import { NextResponse } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/dashboard',
// }