import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../../utils';
import { getToken } from "next-auth/jwt";


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {

    const session = await getToken ({req, secret: process.env.NEXTAUTH_URL});
    if(!session){
        const requestedPage= req.page.name;
        return NextResponse.redirect(`/auth/login?P=${requestedPage}`)
    }
    return NextResponse.next();
    //Autorización Next Auth

    /*const { token = '' } = req.cookies;

    // return new Response('No autorizado', {
    //     status: 401
    // });

    try {
        await jwt.isValidToken( token );
        return NextResponse.next();

    } catch (error) {
        
        // return Response.redirect('/auth/login');
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    }*/

}


