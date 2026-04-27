# Profile Feature - Setup Checklist

## ✅ Prerequisites

Before testing the profile feature, ensure you have:

### Environment Variables

- [ ] `CLOUDINARY_CLOUD_NAME` - Set in `.env.local`
- [ ] `CLOUDINARY_API_KEY` - Set in `.env.local`
- [ ] `CLOUDINARY_API_SECRET` - Set in `.env.local`
- [ ] `JWT_SECRET` - Set in `.env.local`
- [ ] `MONGO_URI` - Set in `.env.local`

### Example `.env.local`

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_uri
```

## ✅ Files Created/Modified

### New Files Created:

- [ ] `src/app/api/user/profile/route.js` - GET/PUT profile endpoints
- [ ] `src/app/api/user/upload-profile-image/route.js` - Image upload endpoint
- [ ] `src/app/account/view-profile/page.js` - User view profile page
- [ ] `src/app/account/edit-profile/page.js` - User edit profile page
- [ ] `src/app/admin/view-profile/page.js` - Admin view profile page
- [ ] `src/app/admin/edit-profile/page.js` - Admin edit profile page
- [ ] `PROFILE_FEATURE_GUIDE.md` - Feature documentation
- [ ] `UI_UX_DESIGN.md` - UI/UX design documentation

### Files Modified:

- [ ] `src/models/User.js` - Added `profileImage` field
- [ ] `src/app/account/page.js` - Changed "My Profile" to link to view-profile
- [ ] `src/app/admin/page.js` - Changed "Admin Profile" to link to view-profile

## ✅ Testing Checklist

### User Profile Feature

#### Account Dashboard

- [ ] Navigate to `/account`
- [ ] See "My Profile" card in grid
- [ ] Card displays profile icon and description
- [ ] Click "View Profile" button

#### View Profile Page

- [ ] URL shows `/account/view-profile`
- [ ] Profile picture displays (avatar or image)
- [ ] User info is shown (email, username, NIC)
- [ ] "Back to Dashboard" link works
- [ ] "✏️ Edit Profile" button is visible

#### Edit Profile Page

- [ ] URL shows `/account/edit-profile`
- [ ] Profile picture preview is displayed
- [ ] "📷 Choose Image" button works
- [ ] Can select an image from device
- [ ] Selected image shows as preview
- [ ] "✓ Upload Image" button appears after selection
- [ ] Uploading image shows loading state
- [ ] Success notification appears after upload
- [ ] Form fields are editable:
  - [ ] Username field
  - [ ] Email field
  - [ ] NIC field (optional)
- [ ] "✓ Save Changes" button saves data
- [ ] Success message shows on save
- [ ] Redirects to view profile after save
- [ ] "Cancel" button returns to view profile
- [ ] Error handling for invalid inputs

### Admin Profile Feature

#### Admin Dashboard

- [ ] Navigate to `/admin`
- [ ] See "Admin Profile" card in Quick Actions
- [ ] Card displays profile icon and description
- [ ] Click "View Profile" button

#### Admin View Profile Page

- [ ] URL shows `/admin/view-profile`
- [ ] Profile picture displays with RED border (not blue)
- [ ] Admin badge shows (🔐 Admin)
- [ ] User info is shown
- [ ] "✏️ Edit Profile" button is visible

#### Admin Edit Profile Page

- [ ] URL shows `/admin/edit-profile`
- [ ] All buttons and borders are RED colored
- [ ] All functionality works same as user profile
- [ ] Heading shows "Edit Admin Profile"

### Image Upload Tests

- [ ] Can upload JPG images
- [ ] Can upload PNG images
- [ ] Can upload GIF images
- [ ] File size limit works (if applicable)
- [ ] Invalid file types are rejected
- [ ] Cloudinary folder structure created: `public-complaint/profiles/`

### Database Tests

- [ ] User profile image URL stored in MongoDB
- [ ] Profile data persists on page refresh
- [ ] NIC field updates correctly
- [ ] Email/username updates work
- [ ] Old profile picture URL is replaced

### Navigation Tests

- [ ] All back buttons work
- [ ] All links navigate correctly
- [ ] No broken links
- [ ] Mobile navigation works
- [ ] Redirect logic works

### Error Handling

- [ ] Network error handled
- [ ] Invalid file type shows error
- [ ] Missing image shows default avatar
- [ ] Form validation errors display
- [ ] Unauthorized access redirects to login

## ✅ Security Checklist

- [ ] JWT token verified on all endpoints
- [ ] Unauthorized users redirected to login
- [ ] Users can only edit their own profile
- [ ] Admins can only edit their own profile
- [ ] Image URL is from Cloudinary (secure CDN)
- [ ] Passwords not exposed in responses
- [ ] CORS headers configured if needed

## ✅ Performance Checklist

- [ ] Image upload completes in reasonable time
- [ ] Page loads without lag
- [ ] Image preview loads quickly
- [ ] No memory leaks on file selection
- [ ] Responsive on slow network
- [ ] Cloudinary caching enabled

## ✅ Responsiveness Checklist

#### Mobile (iPhone/Android)

- [ ] All elements visible without horizontal scroll
- [ ] Buttons are touch-friendly size
- [ ] Text is readable
- [ ] Image upload picker works
- [ ] Form is easy to fill

#### Tablet

- [ ] Layout adapts to screen size
- [ ] Components properly spaced
- [ ] All features accessible

#### Desktop

- [ ] Optimal layout width
- [ ] Hover effects work
- [ ] All interactions smooth

## ✅ Browser Compatibility

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All environment variables are set
- [ ] Cloudinary credentials are valid
- [ ] Database migration completed (if needed)
- [ ] Test image uploads work
- [ ] URLs are correct (no localhost)
- [ ] Error handling doesn't leak sensitive info
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting considered
- [ ] Backup created before changes

## 📋 Testing Commands

### Start Development Server

```bash
npm run dev
```

### Test User Profile

1. Register a new user
2. Login with the user
3. Navigate to `/account`
4. Click "My Profile"
5. Follow View → Edit flow

### Test Admin Profile

1. Login as admin user
2. Navigate to `/admin`
3. Click "Admin Profile"
4. Follow View → Edit flow

### Test Image Upload

```
1. Go to edit profile
2. Click "Choose Image"
3. Select an image file
4. Click "Upload Image"
5. Check Cloudinary dashboard for image
```

## 🆘 Troubleshooting

### Image Upload Fails

- Check Cloudinary credentials in .env.local
- Verify CLOUDINARY_CLOUD_NAME is correct
- Check if API key/secret are valid
- Look at browser console for error details

### Profile Data Not Saving

- Verify JWT token is valid
- Check MongoDB connection
- Ensure User model updates are applied
- Check API response in network tab

### Page Shows Loading Spinner Forever

- Check network tab for failed requests
- Verify authentication endpoint works
- Check JWT token expiration
- See browser console for errors

### Images Not Showing

- Check Cloudinary URL is valid
- Verify image upload completed (check 200 response)
- Check if Cloudinary account is active
- Try clearing browser cache

### Styling Issues

- Verify Tailwind CSS is working
- Check if recent CSS changes broke layout
- Inspect element for conflicting styles
- Clear Next.js cache: `rm -rf .next`

## 📞 Support

For issues:

1. Check browser console for errors
2. Check network tab for failed requests
3. Check .env.local file configuration
4. Look at server logs for backend errors
5. Verify database connection

---

**Last Updated**: April 27, 2026
**Version**: 1.0
**Status**: Ready for Testing ✅
