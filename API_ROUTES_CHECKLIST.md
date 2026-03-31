# API Routes Authentication Checklist

## Routes to Update

### Admin-Only Routes

These routes should require admin authentication:

- [ ] `GET /api/complaint/getAll` - Get all complaints (admin only)
- [ ] `DELETE /api/complaint/[id]` - Delete complaints (if exists)
- [ ] `GET /api/admin/*` - Any admin endpoints

**Update Template for Admin Routes:**

```javascript
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  const authCheck = await checkAdminAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;

  // Your logic using authCheck.user
}
```

---

### User-Only Routes

These routes should verify user is authenticated:

- [ ] `POST /api/complaint/create` - File new complaint ✅ (Already protected)
- [ ] `GET /api/complaint/my` - Get user's complaints
- [ ] `PUT /api/complaint/[id]` - Update complaint
- [ ] `GET /api/complaint/[id]` - View complaint details
- [ ] `POST /api/complaint/[id]/status-update` - Update complaint status
- [ ] `POST /api/status-log` - Create status log
- [ ] `PUT /api/account/profile` - Update profile (if exists)

**Update Template for User Routes:**

```javascript
import { checkAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  const authCheck = await checkAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;

  const { userId, role } = authCheck.user;
  // Your logic here
}
```

---

### Public Routes

These routes should NOT require authentication:

- [ ] `POST /api/auth/login` - User login ✅
- [ ] `POST /api/auth/register` - User registration ✅
- [ ] `POST /api/auth/logout` - User logout ✅
- [ ] `POST /api/auth/forgot-password` - Reset password
- [ ] `POST /api/auth/verify-email` - Email verification
- [ ] `GET /api/test-db` - Database test
- [ ] `POST /api/token-check` - Token verification

---

## Quick Implementation Guide

### Step 1: Update Admin Routes

Open `src/app/api/complaint/getAll/route.js`:

Find this:

```javascript
const user = await verifyToken(token);

if (user == null || user.role !== "admin") {
  // unauthorized
}
```

Replace with:

```javascript
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  const authCheck = await checkAdminAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;

  // Rest of your code...
}
```

---

### Step 2: Update User Routes

For routes like `GET /api/complaint/my`:

```javascript
import { NextResponse } from "next/server";
import { checkAuth } from "@/app/lib/api-auth";
import connectDB from "@/app/lib/mongodb";
import Complaint from "@/models/Complaint";

export async function GET(request) {
  try {
    const authCheck = await checkAuth(request);
    if (!authCheck.isAuthorized) return authCheck.response;

    await connectDB();

    const { userId } = authCheck.user;

    // Get complaints for this user
    const complaints = await Complaint.find({ fileBy: userId });

    return NextResponse.json(complaints);
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 },
    );
  }
}
```

---

### Step 3: Protect Multi-Method Routes

For routes with both GET and POST:

```javascript
import { checkAuth, checkAdminAuth } from "@/app/lib/api-auth";

// Public GET (list complaints) - anyone can view
export async function GET(request) {
  // Your public logic
}

// Protected POST (create complaint) - authenticated users only
export async function POST(request) {
  const authCheck = await checkAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;
  // Your protected logic
}

// Admin PUT (update status) - admin only
export async function PUT(request) {
  const authCheck = await checkAdminAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;
  // Your admin logic
}
```

---

## Routes Already Protected ✅

Based on code review:

- ✅ `POST /api/complaint/create` - Has auth check
- ✅ `GET /api/complaint/getAll` - Has admin check

---

## Routes to Review & Implement

### High Priority (Security Critical)

1. **`GET /api/complaint/my`** - Should only get user's own complaints
   - Check if `fileBy` field in Complaint model matches `userId` from token
2. **`PUT /api/complaint/[id]`** - Should verify ownership
   - Check if complaint `fileBy` matches `userId` from token
   - Allow admins to update any complaint

3. **`GET /api/complaint/[id]`** - Display individual complaint
   - Only owner and admins can view details
   - Public can see basic info (if needed)

### Medium Priority

4. **`POST /api/complaint/[id]/status-update`** - Admin updates status
   - Admin only
   - Log status changes in StatusLog model

5. **`POST /api/status-log`** - Create status log entry
   - Admin or complaint owner

6. **Account/Profile routes** - User-only access
   - Only authenticated users
   - Users can only edit their own profile

---

## Testing Commands

After updating routes, test with:

### Test 1: Without Token (Should return 401)

```bash
curl -X GET http://localhost:3000/api/complaint/my
# Expected: 401 Unauthorized
```

### Test 2: With Invalid Token (Should return 401)

```bash
curl -X GET http://localhost:3000/api/complaint/my \
  -H "Cookie: token=invalid-token"
# Expected: 401 Unauthorized
```

### Test 3: With Valid Token (Should work)

```bash
# Login first to get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Then use the token from response
curl -X GET http://localhost:3000/api/complaint/my \
  -H "Cookie: token=YOUR_TOKEN_HERE"
# Expected: 200 with complaints
```

---

## Summary

- **Total Routes**: 15+
- **Already Protected**: 2 ✅
- **Need To Update**: 13
- **Estimated Time**: 30-45 minutes

Start with high priority routes to ensure security, then move to medium priority.
