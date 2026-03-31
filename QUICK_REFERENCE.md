# Authentication Quick Reference

## Route Protection Map

```
┌─────────────────────────────────────────────────────────────┐
│           PUBLIC ROUTES (No Authentication)                   │
├─────────────────────────────────────────────────────────────┤
│ ✓ GET  /                  - Home page                        │
│ ✓ GET  /auth/login        - Login page                       │
│ ✓ POST /api/auth/login    - Login API                        │
│ ✓ GET  /auth/register     - Registration page                │
│ ✓ POST /api/auth/register - Register API                     │
│ ✓ GET  /auth/forgot-password - Password reset page           │
│ ✓ POST /api/auth/logout   - Logout API                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│     PROTECTED ROUTES (Login Required)                         │
├─────────────────────────────────────────────────────────────┤
│ 🔒 GET  /account          - User account page                │
│ 🔒 POST /api/account/*    - Account API endpoints            │
│ 🔒 GET  /complaint/create - Create complaint page            │
│ 🔒 POST /api/complaint/create - Create complaint API         │
│ 🔒 GET  /complaint/[id]   - View complaint page              │
│ 🔒 GET  /api/complaint/my - Get user's complaints            │
│ 🔒 PUT  /api/complaint/[id] - Update complaint               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│        ADMIN-ONLY ROUTES (Admin Role Required)                │
├─────────────────────────────────────────────────────────────┤
│ 👑 GET  /admin            - Admin panel                       │
│ 👑 GET  /admin/complaint  - View all complaints              │
│ 👑 GET  /admin/profile    - Admin profile                    │
│ 👑 GET  /admin/users      - Manage users                     │
│ 👑 GET  /api/complaint/getAll - Get all complaints API       │
│ 👑 PUT  /api/complaint/[id]/status-update - Update status    │
└─────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Diagram

```
                              ┌─────────────────┐
                              │  User Action    │
                              │  (Visit Route)  │
                              └────────┬────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
                    │   Middleware Intercepts Request     │
                    │   (src/middleware.js)               │
                    └──────────────────┬──────────────────┘
                                       │
                              ┌────────▼────────┐
                              │  Is Public      │
                              │  Route?         │
                              └──┬──────────┬───┘
                                 │ YES      │ NO
                        ┌────────▼──┐   ┌──▼──────────┐
                        │  Allow    │   │ Extract JWT │
                        │  Access   │   │ from Cookie │
                        └───────────┘   └──┬──────────┘
                                           │
                                    ┌──────▼──────┐
                                    │ Token Valid?│
                                    └──┬────────┬─┘
                                    NO │        │ YES
                            ┌─────────▼┐  ┌───▼────────┐
                            │Redirect  │  │Decode User │
                            │to Login  │  │(userId,    │
                            └──────────┘  │ role)      │
                                          └──┬────────┐
                                             │        │
                                     ┌──────▼──┐ ┌──▼────────┐
                                     │Is Admin │ │Is Auth    │
                                     │Route?   │ │Route?     │
                                     └──┬──┬───┘ └──┬───────┐
                                    YES │ NO      YES│ NO   │
                              ┌────────▼┐ │  ┌──────▼┐ │
                              │Is Admin?│ │  │Allow  │ │
                              └──┬───┬──┘ │  │Access │ │
                              YES│ NO│   │  └───────┘ │
                         ┌──────▼┐ │   │            │
                         │Allow  │ │   │  ┌────────▼──┐
                         │Access │ │   └─►│Redirect   │
                         └───────┘ │      │to Home    │
                                   │      │(?error=   │
                                   │      │unauthorized
                                   │      └────────────┘
                                   │
                            ┌──────▼────────┐
                            │ Redirect to   │
                            │ Login Page    │
                            └───────────────┘
```

---

## Token Structure

```javascript
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": "507f1f77bcf86cd799439011",  // MongoDB User ID
  "role": "admin" | "citizen",
  "iat": 1704067200,                      // Issued at time
  "exp": 1704153600                       // Expires (1 day later)
}

Signature:
HMACSHA256(base64(header) + "." + base64(payload), JWT_SECRET)
```

---

## API Response Examples

### ✅ Successful Authentication (Logged In)

```javascript
// Handler receives User Object:
{
  userId: "507f1f77bcf86cd799439011",
  role: "citizen"
}

// Response 200 OK with data
{
  message: "Success",
  data: { /* Your data */ }
}
```

### ❌ Missing Token (Not Logged In)

```
GET /api/complaint/my

Response 401 Unauthorized:
{
  message: "Unauthorized - No token provided"
}
```

### ❌ Invalid Token (Expired/Corrupted)

```
GET /api/complaint/my (with outdated token)

Response 401 Unauthorized:
{
  message: "Unauthorized - Invalid token"
}
```

### ❌ Admin-Only Route but User is Citizen

```
POST /api/complaint/getAll (with citizen token)

Response 403 Forbidden:
{
  message: "Forbidden - Admin access required"
}
```

---

## Helper Function Reference

### Check Authentication (API Routes)

```javascript
import { checkAuth } from "@/app/lib/api-auth";

const authCheck = await checkAuth(request);
if (!authCheck.isAuthorized) {
  return authCheck.response; // 401 error response
}

const { userId, role } = authCheck.user;
```

### Check Admin Only (API Routes)

```javascript
import { checkAdminAuth } from "@/app/lib/api-auth";

const authCheck = await checkAdminAuth(request);
if (!authCheck.isAuthorized) {
  return authCheck.response; // 401 or 403 error response
}

const { userId, role } = authCheck.user; // Guaranteed to be admin
```

### Validate Form Data (API Routes)

```javascript
import { validateRequestBody } from "@/app/lib/api-auth";

const body = await request.json();
const validation = validateRequestBody(body, ["title", "description"]);
if (!validation.isValid) {
  return validation.response; // 400 error with validation errors
}
```

---

## Environment Variables Required

```bash
# .env.local
JWT_SECRET=your-super-secret-min-32-characters-long-string
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

---

## Testing Quick Commands

### 1. Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 2. Test Protected Route (With Token)

```bash
curl -X GET http://localhost:3000/api/complaint/my \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

### 3. Test Protected Route (Without Token)

```bash
curl -X GET http://localhost:3000/api/complaint/my
# Should return: 401 Unauthorized
```

### 4. Test Admin Route (Citizen Token)

```bash
curl -X GET http://localhost:3000/api/complaint/getAll \
  -H "Cookie: token=CITIZEN_TOKEN"
# Should return: 403 Forbidden
```

### 5. Test Admin Route (Admin Token)

```bash
curl -X GET http://localhost:3000/api/complaint/getAll \
  -H "Cookie: token=ADMIN_TOKEN"
# Should return: 200 with complaints data
```

---

## Redirect Behaviors

| Scenario                             | Current Route       | Redirect To                              | Reason            |
| ------------------------------------ | ------------------- | ---------------------------------------- | ----------------- |
| No login, access `/admin`            | `/admin`            | `/auth/login?redirect=/admin`            | Not authenticated |
| Citizen, access `/admin`             | `/admin`            | `/?error=unauthorized`                   | Not authorized    |
| No login, access `/account`          | `/account`          | `/auth/login?redirect=/account`          | Not authenticated |
| No login, access `/complaint/create` | `/complaint/create` | `/auth/login?redirect=/complaint/create` | Not authenticated |
| Logged in, access `/auth/login`      | `/auth/login`       | Stays on page                            | Public route      |

---

## File Locations for Import

```javascript
// Auth utilities (use in API or server components)
import {
  checkAuth,
  checkAdminAuth,
  validateRequestBody,
} from "@/app/lib/api-auth";

// For other shared utilities
import { verifyToken, getAuthUser } from "@/lib/auth";

// JWT verification (existing)
import { verifyToken } from "@/app/lib/jwt";
```

---

## Common Error Codes

| Code | Meaning                              | Fix                                      |
| ---- | ------------------------------------ | ---------------------------------------- |
| 401  | Unauthorized (no/invalid token)      | Login again, check token expiration      |
| 403  | Forbidden (insufficient permissions) | User doesn't have required role          |
| 400  | Bad Request (validation error)       | Check required fields in request body    |
| 500  | Server Error                         | Check server logs and MongoDB connection |
