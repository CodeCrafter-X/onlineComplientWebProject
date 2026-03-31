import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import User from "@/models/User";
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  try {
    // Check if user is admin
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.isAuthorized) {
      return authCheck.response;
    }

    await connectDB();

    // Fetch all citizen users (not admin)
    const users = await User.find({ role: "citizen" }).select(
      "username email nic role createdAt updatedAt"
    );

    if (!users || users.length === 0) {
      return NextResponse.json({
        message: "No users found",
        users: [],
        total: 0,
      });
    }

    return NextResponse.json({
      message: "Users fetched successfully",
      users,
      total: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
