import connectDB from "@/app/lib/mongodb";
import { verifyToken } from "@/app/lib/jwt"; 
import Complaint from "@/models/Complaint";

export async function GET(reqest) {
    try {
        await connectDB();
        const  token = reqest.cookies.get("token")?.value;
        if (!token) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const user = await verifyToken(token);
        console.log("Decoded user from token:", user);
     
      if(user == null || user.role !== "admin"  ){
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
      }

        const complaints = await Complaint.find();

        return new Response(JSON.stringify(complaints), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}