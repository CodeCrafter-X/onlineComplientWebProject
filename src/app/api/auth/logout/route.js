import { NextResponse } from "next/server";
import * as cookie from "cookie";



export async function POST(){
    try {
        const headers = new Headers();
        headers.append(
            "set-cookie",
            cookie.serialize("token", "",{
                path:"/",
                maxAge: -1
            })
        )

        return NextResponse.json(
            {message: "Logout successful"},
            {status: 200, headers}  );



    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}