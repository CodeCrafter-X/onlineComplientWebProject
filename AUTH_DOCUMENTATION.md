# 🔐 Authentication System Documentation

## Overview

This document explains the complete authentication system for the Public Complaint Management application.

## 📁 Project Structure

### Auth Pages

- **`/auth/login`** - User login page
- **`/auth/register`** - User registration page
- **`/auth/forgot-password`** - Password reset request page
- **`/auth/verify-email`** - Email verification page

### Protected Pages

- **`/admin`** - Admin dashboard (Admin-only)
- **`/account`** - User account settings

### API Routes

- **`POST /api/auth/login`** - Authenticate user
- **`POST /api/auth/register`** - Create new user account
- **`POST /api/auth/logout`** - Logout user
- **`GET /api/token-check`** - Verify authentication token

---

## 🔑 Key Features

### 1. **JWT Token Authentication**

- Tokens are stored in HTTP-only cookies for security
- Token expires in 7 days (604800 seconds)
- JWT Secret stored in environment variables

### 2. **Role-Based Access Control**

- **Admin Role**: Full access to admin dashboard
- **Citizen Role**: Access to complaint management and account settings

### 3. **Password Security**

- Passwords are hashed using bcryptjs (10 salt rounds)
- Password validation on login
- Password reset functionality

### 4. **User Fields**

```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (hashed),
  nic: String (National ID),
  address: String,
  role: String ('citizen' | 'admin'),
  timestamps: Date
}
```

---

## 🚀 How to Use

### For Citizens (Users)

#### 1. **Register New Account**

- Navigate to `/auth/register`
- Fill in all required fields:
  - Full Name
  - Email Address
  - National ID (NIC)
  - Address (optional)
  - Password (min 6 characters)
- Click "Create Account"
- Redirect to login page

#### 2. **Login**

- Navigate to `/auth/login`
- Enter email and password
- Click "Sign In"
- Auto-redirects to home page (**`/`**)

#### 3. **Reset Forgotten Password**

- Click "Forgot password?" link on login page
- Enter your email
- Click "Send Reset Link"
- Follow instructions in email

#### 4. **Access Account Settings**

- Navigate to `/account`
- View profile information
- Edit profile (name, email)
- Change password
- Logout

### For Admins

#### 1. **Admin Registration** (Manually set role to 'admin' in database)

```javascript
// After registering from /auth/register, manually update role:
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

#### 2. **Admin Login**

- Navigate to `/auth/login`
- Enter admin credentials
- Auto-redirects to `/admin` dashboard

#### 3. **Admin Dashboard Features**

- Dashboard home with statistics
- View admin profile
- Manage all complaints
- Manage all users
- Full access to complaint management system

---

## 🔄 Authentication Flow

### Login Process

```
User Inputs Credentials
    ↓
POST /api/auth/login
    ↓
Verify Email & Password
    ↓
Generate JWT Token
    ↓
Set HTTP-only Cookie
    ↓
GET /api/token-check (client-side)
    ↓
Check User Role
    ↓
Redirect: Admin → /admin, Citizen → /
```

### Protected Page Access

```
User Navigates to Protected Route
    ↓
useEffect → GET /api/token-check
    ↓
Token Valid & Role Verified?
    ├─ YES: Display Page Content
    └─ NO: Redirect to /auth/login
```

---

## 🔗 API Endpoints

### POST /api/auth/login

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**

```json
{
  "message": "Login successful"
}
// Plus HTTP-only cookie with JWT
```

**Response (Error - 401/400):**

```json
{
  "message": "Invalid Username or Password"
}
```

---

### POST /api/auth/register

**Request:**

```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "secure123",
  "nic": "123456789",
  "address": "123 Main Street"
}
```

**Response (Success - 201):**

```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

---

### GET /api/token-check

**Response (Authenticated - 200):**

```json
{
  "message": "Token is valid",
  "isAuthenticated": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

**Response (Not Authenticated - 401):**

```json
{
  "message": "Invalid or expired token",
  "isAuthenticated": false
}
```

---

### POST /api/auth/logout

**Response (Success - 200):**

```json
{
  "message": "Logout successful"
}
```

---

## 🎨 UI Components

### Login Page Features

- ✅ Email & password input
- ✅ Show/hide password toggle
- ✅ "Forgot password?" link
- ✅ Register link
- ✅ Error messages
- ✅ Loading state
- ✅ Demo credentials display
- ✅ Beautiful gradient design

### Register Page Features

- ✅ Full name, email, NIC, address, password fields
- ✅ Password confirmation
- ✅ Password requirements validation
- ✅ Show/hide password toggle
- ✅ Success messages
- ✅ Links to login page
- ✅ Form validation

### Forgot Password Page

- ✅ Email input
- ✅ Send reset link
- ✅ Resend functionality with timer
- ✅ Success state display

### Verify Email Page

- ✅ 6-digit code input
- ✅ Auto-focus on next field
- ✅ Resend code with 60s timer
- ✅ Code validation

### Account Page

- ✅ Profile information display
- ✅ Edit profile mode
- ✅ Profile photo placeholder
- ✅ Quick action buttons
- ✅ Account information sidebar
- ✅ Logout button

---

## 🔒 Security Features

1. **HTTP-Only Cookies**
   - Prevents XSS attacks
   - Can't be accessed by JavaScript

2. **CSRF Protection**
   - Same-site cookie attribute
   - Verified JWT tokens

3. **Password Hashing**
   - bcryptjs with 10 salt rounds
   - Never stored in plain text

4. **Role-Based Access Control**
   - Admin-only routes protected
   - Token verification on each request

5. **Token Expiration**
   - JWT tokens expire in 7 days
   - Automatic logout on expiration

---

## 🧪 Testing Credentials

### Demo Citizen Account

- **Email:** user@example.com
- **Password:** password

### Demo Admin Account

- **Email:** admin@example.com
- **Password:** password

_Note: Create these accounts first by registering and then changing roles in database_

---

## 🛠️ Environment Variables Required

```env
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=your_mongodb_connection_string
```

---

## 📝 Common Issues & Solutions

### Issue: "Redirect to login on admin page"

**Solution:**

- Make sure token is set in cookies after login
- Check if `/api/token-check` returns correct response
- Verify JWT_SECRET environment variable is set

### Issue: "Password mismatch on register"

**Solution:**

- Confirm both password fields match exactly
- Check minimum 6 character requirement

### Issue: "Email already exists"

**Solution:**

- Use a different email address
- Email must be unique in database

### Issue: "Admin dashboard not accessible"

**Solution:**

- Ensure your user role is set to 'admin' in database
- If not, manually update: `db.users.updateOne({email: "your@email"}, {$set: {role: "admin"}})`

---

## 📚 Code Examples

### Client-Side: Protected Route

```javascript
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/token-check", {
        credentials: "include",
      });
      const data = await response.json();

      if (!data.isAuthenticated) {
        router.push("/auth/login");
      }
    };
    checkAuth();
  }, [router]);

  return <div>Protected Content</div>;
}
```

### Client-Side: Login

```javascript
const handleLogin = async (email, password) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (response.ok) {
    // Check role and redirect accordingly
    const checkRes = await fetch("/api/token-check", {
      credentials: "include",
    });
    const userData = await checkRes.json();
    router.push(userData.user.role === "admin" ? "/admin" : "/");
  }
};
```

---

## 📞 Support

For issues or questions about the authentication system, please check:

1. Console logs for error messages
2. Network tab for API responses
3. Browser cookies for token presence
4. Database for user records

---

**Last Updated:** March 2026
**Version:** 1.0.0
