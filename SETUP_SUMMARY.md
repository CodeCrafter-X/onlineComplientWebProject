# Authentication Middleware Setup - Complete Summary

## ✅ What Has Been Created

### 1. **Core Middleware Files**

#### `src/middleware.js`

- Automatic page-level authentication protection
- Redirects unauthenticated users to login
- Blocks non-admin users from `/admin` routes
- Protects `/account`, `/complaint/create`, and individual complaint pages
- Public routes remain accessible without login

#### `src/lib/auth.js`

- `verifyToken(token)` - Verifies JWT token and returns user data
- `getAuthUser(request)` - Gets authenticated user from request cookies
- Can be imported and used in any server component or API route

#### `src/app/lib/api-auth.js`

- `checkAuth(request)` - Middleware for protected API routes
- `checkAdminAuth(request)` - Middleware for admin-only API routes
- `validateRequestBody(body, fields)` - Validates required fields in requests
- Returns consistent response format with error handling

### 2. **Documentation Files**

#### `AUTHENTICATION_MIDDLEWARE.md`

- Complete guide on how authentication works
- Usage examples for page components and API routes
- Testing procedures and troubleshooting
- Code samples for different scenarios

#### `API_ROUTES_CHECKLIST.md`

- List of all API routes that need updating
- Priority levels (high/medium)
- Implementation templates
- Testing commands with curl

#### `.env.local.example`

- Template for environment variables
- Shows required configuration

---

## 🔒 How It Works

### Authentication Flow

```
User Action → Middleware Check → Token Verification → Role Check → Access Granted/Denied
     ↓              ↓                   ↓                    ↓              ↓
Visit Page   Check Token          Verify JWT          Check Role    Allow/Redirect
             in Cookie           with SECRET           (admin/user)
```

### Page Protection

```
Public Routes (No Protection)
├── /
├── /auth/login
├── /auth/register
├── /auth/forgot-password
└── /auth/verify-email

Protected Routes
├── /admin/* → Requires role: "admin"
├── /account/* → Requires authentication
├── /complaint/create → Requires authentication
└── /complaint/[id] → Requires authentication
```

### Token Information

Your JWT token contains:

```javascript
{
  userId: "user-mongo-id",
  role: "admin" | "citizen",
  exp: 1234567890,
  iat: 1234567890
}
```

---

## 🚀 Quick Start

### 1. Set Up Environment Variables

Create `.env.local` file (copy from `.env.local.example`):

```bash
JWT_SECRET=your-super-secret-key-min-32-chars
MONGODB_URI=your-mongodb-connection-string
```

### 2. Restart Your Development Server

```bash
npm run dev
```

The middleware is now active!

### 3. Test It Works

1. Go to `http://localhost:3000/complaint/create` without logging in
2. You should be redirected to `/auth/login`
3. Log in with any registered user
4. You'll be redirected back to `/complaint/create`

---

## 📋 Current Protection Status

### ✅ Already Protected Pages

- `/admin/*` - Requires admin role
- `/account/*` - Requires login
- `/complaint/create` - Requires login
- `/complaint/[id]` - Requires login

### ✅ Already Protected API Routes

- `POST /api/complaint/create` - Requires login
- `GET /api/complaint/getAll` - Requires admin role

### ⚠️ API Routes Needing Updates

See `API_ROUTES_CHECKLIST.md` for the full list and update instructions.

---

## 💡 Common Use Cases

### Check if User is Logged In (In Components)

```javascript
// Call API to check auth status
const checkUser = async () => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  return res.json();
};
```

### Protect an API Route

```javascript
// In your API route file
import { checkAuth } from "@/app/lib/api-auth";

export async function GET(request) {
  const authCheck = await checkAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;

  const { userId, role } = authCheck.user;
  // Your protected logic here
}
```

### Protect Admin API Route

```javascript
import { checkAdminAuth } from "@/app/lib/api-auth";

export async function POST(request) {
  const authCheck = await checkAdminAuth(request);
  if (!authCheck.isAuthorized) return authCheck.response;

  // Only admins can reach this code
}
```

---

## 🔧 Customization

### Change Protected Routes

Edit `src/middleware.js`:

```javascript
// Add more admin routes
if (pathname.startsWith("/admin")) { ... }

// Add user-only routes
if (pathname.startsWith("/staff")) { ... }
```

### Change Token Expiration

Edit login route (`src/app/api/auth/login/route.js`):

```javascript
const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }, // Change from "1d" to "7d"
);
```

### Add Custom Authorization Logic

Extend `src/app/lib/api-auth.js`:

```javascript
export async function checkComplaintOwner(request, complaintId, userId) {
  // Check if user owns this complaint
  const complaint = await Complaint.findById(complaintId);
  return complaint.fileBy.toString() === userId;
}
```

---

## 🐛 Troubleshooting

### Problem: "Unauthorized" on every request

**Solution**: Check that `JWT_SECRET` in `.env.local` matches the one used during login

### Problem: Middleware not redirecting

**Solution**: Restart dev server with `npm run dev`

### Problem: CORS errors with API calls

**Solution**: Cookies are sent automatically with same-origin requests. For cross-origin, configure CORS in your API routes

### Problem: Users stuck in redirect loop

**Solution**: Clear browser cookies and retry login

---

## 📚 Files Reference

```
src/
├── middleware.js              ← Main authentication middleware
├── lib/
│   └── auth.js                ← Auth utilities (import with @/lib/auth)
└── app/
    ├── api/
    │   ├── auth/
    │   │   ├── login/route.js    (Already protected)
    │   │   └── logout/route.js
    │   └── complaint/
    │       └── create/route.js    (Already protected)
    └── lib/
        └── api-auth.js            ← API authentication helpers

Documentation/
├── AUTHENTICATION_MIDDLEWARE.md  ← Complete usage guide
├── API_ROUTES_CHECKLIST.md      ← API update checklist
└── .env.local.example            ← Environment template
```

---

## ✨ Next Steps

1. **Create `.env.local`** from `.env.local.example`
2. **Restart dev server** to activate middleware
3. **Update API routes** using the checklist
4. **Test authentication** by visiting protected routes
5. **Add logout button** to clear token cookie
6. **Create `/api/auth/me`** endpoint for status checks

---

## 🔐 Security Checklist

- ✅ JWT verification with secret key
- ✅ HTTP-only cookies (protects from XSS)
- ✅ Role-based access control (RBAC)
- ✅ Automatic token expiration
- ✅ Route-level protection
- ✅ API-level protection

**Recommendations:**

- [ ] Keep JWT_SECRET strong and long (min 32 chars)
- [ ] Use HTTPS in production
- [ ] Implement token refresh logic for long sessions
- [ ] Add rate limiting to login endpoint
- [ ] Log unauthorized access attempts
- [ ] Implement CSRF protection if needed

---

## 📞 Support

For detailed implementation examples, see:

- `AUTHENTICATION_MIDDLEWARE.md` - Code examples and patterns
- `API_ROUTES_CHECKLIST.md` - Step-by-step route updates
