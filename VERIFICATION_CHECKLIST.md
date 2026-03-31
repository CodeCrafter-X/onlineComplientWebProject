# Authentication Implementation Verification Checklist

## Pre-Implementation Checklist

- [ ] `.env.local` file created with `JWT_SECRET` variable
- [ ] `MongoDB` connection string configured in `.env.local`
- [ ] Development server restarted after adding `.env.local`
- [ ] All existing user accounts have valid email and password

---

## File Creation Verification

Verify these files were created in your project:

### Core Files

- [ ] `src/middleware.js` - Main Next.js middleware
- [ ] `src/lib/auth.js` - Auth utilities library
- [ ] `src/app/lib/api-auth.js` - API authentication helpers

### Documentation Files

- [ ] `AUTHENTICATION_MIDDLEWARE.md` - Complete implementation guide
- [ ] `API_ROUTES_CHECKLIST.md` - API routes to update list
- [ ] `SETUP_SUMMARY.md` - Setup summary and reference
- [ ] `QUICK_REFERENCE.md` - Quick reference guide (this file)
- [ ] `.env.local.example` - Environment template

---

## Middleware Testing

### Test 1: Public Routes Remain Accessible

- [ ] Navigate to `http://localhost:3000/` - Should load ✓
- [ ] Navigate to `http://localhost:3000/auth/login` - Should load ✓
- [ ] Navigate to `http://localhost:3000/auth/register` - Should load ✓

**Expected Result**: All pages load without redirecting to login

---

### Test 2: Protected Routes Require Login

- [ ] Open new incognito/private browser window
- [ ] Navigate to `http://localhost:3000/account`
- [ ] Should redirect to `http://localhost:3000/auth/login?redirect=/account` ✓
- [ ] Navigate to `http://localhost:3000/complaint/create`
- [ ] Should redirect to login with redirect parameter ✓

**Expected Result**: Unauthenticated users always redirected to login

---

### Test 3: Login Success Redirects Back

- [ ] From incognito window, go to `http://localhost:3000/complaint/create`
- [ ] Get redirected to login page
- [ ] Log in with your test account
- [ ] Should automatically redirect to `/complaint/create` ✓

**Expected Result**: After login, user returns to originally requested page

---

### Test 4: Token is Set in Cookies

- [ ] Log in successfully
- [ ] Open DevTools (F12)
- [ ] Go to Applications → Cookies → localhost:3000
- [ ] Look for cookie named `token` ✓
- [ ] Cookie should have `HttpOnly` flag ✓

**Expected Result**: Token cookie exists and is secure

---

### Test 5: Admin Routes Block Non-Admin Users

- [ ] Log in with a **citizen** account
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Should redirect to `http://localhost:3000/?error=unauthorized` ✓

**Expected Result**: Non-admin users cannot access admin panel

---

### Test 6: Admin Routes Allow Admin Users

- [ ] Log in with an **admin** account (role: "admin" in database)
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Should load admin panel ✓

**Expected Result**: Admin users can access admin panel

---

### Test 7: Token Expiration

- [ ] Log in successfully
- [ ] Open DevTools → Console
- [ ] Run this to see token expiration:

```javascript
// Get the token expiration
const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

// In a real test, you'd decode it, but we can't easily do that in console
// Just verify the token exists
console.log(token ? "Token exists" : "No token");
```

- [ ] After 1 day, token should expire automatically

**Expected Result**: Token expires after 1 day

---

## API Testing

### Test 8: Protected API Without Token

```bash
# Open terminal/PowerShell and run:
curl -X GET http://localhost:3000/api/complaint/my

# Expected Response:
# {"message":"Unauthorized - No token provided"}
```

- [ ] Gets 401 error ✓
- [ ] Proper error message returned ✓

---

### Test 9: Protected API With Valid Token

```bash
# First, log in via browser and get the token from cookies
# Then test (replace TOKEN with actual token):

curl -X GET http://localhost:3000/api/complaint/my \
  -H "Cookie: token=YOUR_TOKEN_HERE"

# Expected Response:
# [list of user's complaints] or {"message":"Success"}
```

- [ ] Gets 200 success ✓
- [ ] Returns complaint data ✓

---

### Test 10: Admin-Only API Without Admin Role

```bash
# Use a citizen user's token:

curl -X GET http://localhost:3000/api/complaint/getAll \
  -H "Cookie: token=CITIZEN_TOKEN"

# Expected Response:
# {"message":"Forbidden - Admin access required"}
```

- [ ] Gets 403 forbidden error ✓
- [ ] Proper error message ✓

---

### Test 11: Admin-Only API With Admin Role

```bash
# Use an admin user's token:

curl -X GET http://localhost:3000/api/complaint/getAll \
  -H "Cookie: token=ADMIN_TOKEN"

# Expected Response:
# [list of all complaints]
```

- [ ] Gets 200 success ✓
- [ ] Returns all complaints ✓

---

## Logout Testing

### Test 12: Logout Clears Session

- [ ] While logged in, look for logout button
- [ ] Click logout
- [ ] Check if token cookie is removed from DevTools ✓
- [ ] Try to navigate to protected page
- [ ] Should redirect to login ✓

**Expected Result**: User is completely logged out

---

## Multi-User Testing

### Test 13: Multiple Users Can Login

- [ ] Have multiple test accounts ready
- [ ] Log in as User A
- [ ] Verify see User A's data
- [ ] Log in as User B (in different browser tab with incognito)
- [ ] Verify see User B's data
- [ ] Both can access simultaneously ✓

**Expected Result**: Each user sees only their own data

---

### Test 14: Complaint Ownership

- [ ] Log in as User A
- [ ] File a complaint
- [ ] Log in as User B
- [ ] User B should NOT see User A's complaints in `/complaint/my` ✓
- [ ] Only User A can see their own complaints

**Expected Result**: Users only see their own complaints

---

## Security Testing

### Test 15: Token Tampering Detection

- [ ] Get a valid token from login
- [ ] Manually modify it (change 1 character)
- [ ] Try to use it: `curl -X GET ... -H "Cookie: token=MODIFIED_TOKEN"`
- [ ] Should get 401 error ✓

**Expected Result**: Invalid tokens are rejected

---

### Test 16: Token Theft Prevention

- [ ] Check DevTools → Application → Cookies
- [ ] Verify token cookie has:
  - [ ] `HttpOnly` flag ✓ (prevents XSS attacks)
  - [ ] `Secure` flag (for production with HTTPS)
  - [ ] `SameSite: Lax` ✓ (prevents CSRF attacks)

**Expected Result**: Token is securely stored

---

### Test 17: Role Verification

- [ ] In MongoDB, manually change a user's role
- [ ] They should still be logged in with old role
- [ ] Wait for token to naturally expire OR force logout
- [ ] On next login, new role should be active ✓

**Expected Result**: Role changes take effect after re-login

---

## Error Handling Testing

### Test 18: Invalid Credentials

- [ ] Try to login with wrong email/password
- [ ] Should get appropriate error message ✓
- [ ] Should NOT be logged in afterward ✓

**Expected Result**: Failed login attempts don't create session

---

### Test 19: Missing Environment Variables

- [ ] Temporarily comment out `JWT_SECRET` in `.env.local`
- [ ] Try to login
- [ ] Should fail with error ✓
- [ ] Restore `JWT_SECRET`

**Expected Result**: App properly handles missing config

---

## Documentation Verification

- [ ] Read `AUTHENTICATION_MIDDLEWARE.md` - Everything makes sense ✓
- [ ] Reference examples in `QUICK_REFERENCE.md` - Can copy/paste and understand ✓
- [ ] Follow checklist in `API_ROUTES_CHECKLIST.md` - Clear instructions ✓
- [ ] Review `SETUP_SUMMARY.md` - Good overview ✓

---

## API Routes Update Progress

Track your progress updating API routes (see `API_ROUTES_CHECKLIST.md`):

### Admin Routes

- [ ] `GET /api/complaint/getAll` - ✅ Already protected
- [ ] Other admin endpoints - If any

### User Routes

- [ ] `GET /api/complaint/my` - Updated with `checkAuth`
- [ ] `PUT /api/complaint/[id]` - Updated with `checkAuth`
- [ ] `GET /api/complaint/[id]` - Updated with `checkAuth`
- [ ] `POST /api/complaint/[id]/status-update` - Updated
- [ ] Other user endpoints - As needed

### Public Routes

- [ ] Leave as-is, no auth needed

---

## Final Checklist

### Setup Complete ✅

- [ ] Middleware files created
- [ ] Environment variables configured
- [ ] Dev server restarted
- [ ] Public routes accessible
- [ ] Protected routes redirect to login
- [ ] Admin routes check permission
- [ ] Token stored in secure cookie
- [ ] Login/logout works correctly

### Security Verified ✅

- [ ] Invalid tokens rejected
- [ ] Token tampering detected
- [ ] HttpOnly cookie set
- [ ] Role-based access working
- [ ] Users see only their data

### Documentation Ready ✅

- [ ] All guide files reviewed
- [ ] Examples understood
- [ ] API checklist started
- [ ] Environment template used

### Testing Complete ✅

- [ ] All 19 tests passed
- [ ] No security issues found
- [ ] Authentication working as expected
- [ ] Ready for API route updates

---

## Next Steps After Verification

1. **Update Remaining API Routes**
   - Follow `API_ROUTES_CHECKLIST.md`
   - Add authentication to all routes

2. **Add Logout Button**
   - Create logout component
   - Clear token cookie on logout
   - Redirect to home page

3. **Create `/api/auth/me` Endpoint**
   - Return current user info
   - Use in components to check auth status

4. **Add User Feedback**
   - Show login message after redirect
   - Display logout confirmation
   - Show authorization errors clearly

5. **Production Hardening**
   - Set `secure: true` in cookie (requires HTTPS)
   - Implement rate limiting on login
   - Add CSRF protection if needed
   - Log authentication events

---

## Troubleshooting Verification Issues

| Issue                       | Possible Cause          | Solution                           |
| --------------------------- | ----------------------- | ---------------------------------- |
| Routes not redirecting      | Middleware not active   | Restart dev server                 |
| Token issues                | JWT_SECRET mismatch     | Verify .env.local JWT_SECRET       |
| Admin can't access `/admin` | Role not set correctly  | Check user.role in MongoDB         |
| API returns 401             | Token not in cookies    | Check cookie Headers in DevTools   |
| Redirects to wrong page     | Redirect parameter lost | Check URL encoding                 |
| Token not persisting        | Cookie settings wrong   | Verify httpOnly and sameSite flags |

---

## Support Resources

Stuck on something? Check these files in order:

1. `QUICK_REFERENCE.md` - Quick answers
2. `SETUP_SUMMARY.md` - Overview and common issues
3. `AUTHENTICATION_MIDDLEWARE.md` - Detailed examples
4. `API_ROUTES_CHECKLIST.md` - Step-by-step instructions

Good luck! 🚀
