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

    // Get pagination parameters from query string
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '10', 10));
    const skip = (page - 1) * limit;

    // Get total count and paginated users
    const total = await User.countDocuments({ role: "citizen" });
    const users = await User.find({ role: "citizen" })
      .select("username email nic role createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!users || users.length === 0) {
      return NextResponse.json({
        message: "No users found",
        users: [],
        total: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      });
    }

    return NextResponse.json({
      message: "Users fetched successfully",
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
