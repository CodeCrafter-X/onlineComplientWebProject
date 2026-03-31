# Authentication Middleware Guide

## Overview

This guide explains how to use the authentication middleware and utilities created for the public complaint application.

## Files Created

1. **`src/middleware.js`** - Main Next.js middleware for page-level protection
2. **`src/lib/auth.js`** - Shared auth utilities (import from any client/server component)
3. **`src/app/lib/api-auth.js`** - API route authentication helpers

## How It Works

### 1. Middleware Protection (src/middleware.js)

The middleware automatically protects routes based on authentication status:

**Protected Routes:**

- `/admin/*` - Only users with `role: "admin"`
- `/account/*` - Only authenticated users
- `/complaint/create` - Only authenticated users
- `/complaint/[id]` - Only authenticated users

**Public Routes:**

- `/` (Home)
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/verify-email`

**Redirect Behavior:**

- Unauthenticated users trying to access protected pages → redirected to `/auth/login?redirect=[original-path]`
- Non-admin users trying to access admin pages → redirected to `/?error=unauthorized`

---

## Usage in Different Contexts

### A. Using in Page Components (Client/Server Components)

#### Check if user is logged in:

```javascript
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check token by attempting to fetch user data
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me"); // Add this endpoint
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {/* Your account content */}
    </div>
  );
}
```

### B. Using in API Routes

#### Example 1: Require Authentication

```javascript
// src/app/api/complaint/create/route.js
import { NextResponse } from "next/server";
import { checkAuth, validateRequestBody } from "@/app/lib/api-auth";

export async function POST(request) {
  // Check if user is authenticated
  const authCheck = await checkAuth(request);
  if (!authCheck.isAuthorized) {
    return authCheck.response;
  }

  const user = authCheck.user;

  // Your route logic here
  // user.userId and user.role are available
  return NextResponse.json({ message: "Success" });
}
```

#### Example 2: Require Admin Access

```javascript
// src/app/api/admin/complaints/route.js
import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  // Check if user is admin
  const authCheck = await checkAdminAuth(request);
  if (!authCheck.isAuthorized) {
    return authCheck.response;
  }

  const user = authCheck.user; // Guaranteed to be admin

  // Your admin logic here
  return NextResponse.json({ message: "Admin access granted" });
}
```

#### Example 3: With Validation

```javascript
// src/app/api/complaint/update/route.js
import { NextResponse } from "next/server";
import { checkAuth, validateRequestBody } from "@/app/lib/api-auth";

export async function PUT(request) {
  // Check authentication
  const authCheck = await checkAuth(request);
  if (!authCheck.isAuthorized) {
    return authCheck.response;
  }

  const body = await request.json();

  // Validate required fields
  const validation = validateRequestBody(body, ["title", "description"]);
  if (!validation.isValid) {
    return validation.response;
  }

  const user = authCheck.user;
  // Process request...

  return NextResponse.json({ message: "Updated successfully" });
}
```

---

## Complete Examples

### Protected API Route: Get User's Complaints

```javascript
// src/app/api/complaint/my/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Complaint from "@/models/Complaint";
import { checkAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  try {
    await connectDB();

    // Verify user is authenticated
    const authCheck = await checkAuth(request);
    if (!authCheck.isAuthorized) {
      return authCheck.response;
    }

    const { userId } = authCheck.user;

    // Get only this user's complaints
    const complaints = await Complaint.find({ fileBy: userId });

    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
```

### Admin-Only API Route: Get All Complaints

```javascript
// src/app/api/admin/complaints/all/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Complaint from "@/models/Complaint";
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  try {
    await connectDB();

    // Verify user is admin
    const authCheck = await checkAdminAuth(request);
    if (!authCheck.isAuthorized) {
      return authCheck.response;
    }

    // Admin can get all complaints
    const complaints = await Complaint.find();

    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
```

---

## Testing

### Test Flow 1: Public User Accessing Complaint File Page

1. User visits `/complaint/create` without token
2. Middleware redirects to `/auth/login?redirect=/complaint/create`
3. User logs in successfully
4. User is redirected back to `/complaint/create`

### Test Flow 2: Admin Accessing Admin Panel

1. User with `role: "admin"` visits `/admin`
2. Middleware allows access ✅
3. User with `role: "citizen"` visits `/admin`
4. Middleware redirects to `/?error=unauthorized` ❌

### Test Flow 3: User Accessing Own Account

1. Authenticated user visits `/account`
2. Middleware allows access ✅
3. Unauthenticated user visits `/account`
4. Middleware redirects to `/auth/login?redirect=/account` ❌

---

## Environment Variables

Make sure your `.env.local` file has:

```
JWT_SECRET=your-secret-key-here
MONGODB_URI=your-mongodb-connection-string
```

---

## Important Notes

1. **Token Storage**: Tokens are stored in secure HTTP-only cookies
2. **Token Expiration**: Tokens expire in 1 day (set during login)
3. **Role-Based Access**: User role is embedded in the token as either "admin" or "citizen"
4. **Automatic Redirects**: Users are automatically redirected to login if their session expires

---

## Common Issues & Solutions

### Issue: Middleware keeps redirecting to login

**Solution**: Ensure `JWT_SECRET` environment variable is set correctly in `.env.local`

### Issue: Admin routes still accessible to citizens

**Solution**: Verify the user has `role: "admin"` in database, and restart the development server

### Issue: API calls returning 401

**Solution**: Ensure token cookie is being sent with requests (it should be automatic with fetch/axios)

---

## Next Steps

1. Apply the authentication helpers to all existing API routes
2. Create the `/api/auth/me` endpoint for checking current user
3. Add logout functionality to clear token cookie
4. Implement token refresh logic if needed
5. Add role-based UI elements (hide admin buttons from non-admins)
