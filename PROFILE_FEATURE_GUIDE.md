# Profile Picture Upload & Edit Profile Feature Guide

## 📋 Overview

This guide explains the new profile management system that allows users and admins to upload profile pictures and edit their profile information.

## 🎯 User Flow Diagram

```
User/Admin
    ↓
Account/Admin Dashboard
    ↓
Click "View Profile" button
    ↓
View Profile Page
├── Profile Picture (or initial avatar)
├── User Information
│   ├── Username
│   ├── Email
│   └── NIC
└── "Edit Profile" button
    ↓
Edit Profile Page
├── Upload/Change Profile Picture
│   ├── Choose Image
│   └── Upload Button (appears after selecting)
├── Edit Information Form
│   ├── Username
│   ├── Email
│   └── NIC
└── Save/Cancel buttons
```

## 🎨 UI Design Features

### Profile Picture Display

- **Circular Avatar** (128x128px)
- Default: First letter of username in gradient background
- Uploaded: Cloudinary image displayed
- Border color: Blue for users, Red for admins

### Design Colors

- **Users**: Blue (#2563EB) accent color
- **Admins**: Red (#DC2626) accent color

### Responsive Layout

- Mobile: Stacked layout
- Tablet: Partial grid
- Desktop: Full grid with sidebars

### Styling

- Clean, modern Tailwind CSS design
- Shadow effects for depth
- Hover states for interactivity
- Loading spinners
- Toast notifications for success/error

## 🔧 Technical Implementation

### API Endpoints

#### 1. Upload Profile Picture

```
POST /api/user/upload-profile-image
Content-Type: multipart/form-data

Body: form data with 'file' field
Response: { message, profileImage URL, user data }
```

#### 2. Get User Profile

```
GET /api/user/profile

Response: { user { id, username, email, nic, profileImage, role } }
```

#### 3. Update User Profile

```
PUT /api/user/profile
Content-Type: application/json

Body: { username, email, nic }
Response: { message, user data }
```

## 📁 File Structure

```
src/
├── app/
│   ├── account/
│   │   ├── view-profile/
│   │   │   └── page.js      (View user profile)
│   │   └── edit-profile/
│   │       └── page.js      (Edit user profile)
│   ├── admin/
│   │   ├── view-profile/
│   │   │   └── page.js      (View admin profile)
│   │   └── edit-profile/
│   │       └── page.js      (Edit admin profile)
│   ├── api/
│   │   └── user/
│   │       ├── profile/
│   │       │   └── route.js (GET/PUT endpoints)
│   │       └── upload-profile-image/
│   │           └── route.js (POST endpoint)
│   ├── account/
│   │   └── page.js          (Updated with view-profile link)
│   └── admin/
│       └── page.js          (Updated with view-profile link)
└── models/
    └── User.js              (Added profileImage field)
```

## 🔐 Authentication & Authorization

All profile endpoints require:

- Valid JWT token in cookies
- User must be authenticated
- Admins can only edit their own profile
- Users can only edit their own profile

## ✨ Features Included

✅ Upload profile picture via Cloudinary
✅ Image preview before upload
✅ Edit profile information (username, email, NIC)
✅ View complete profile details
✅ Support for both users and admins
✅ Error handling and validation
✅ Loading states
✅ Success notifications
✅ Responsive design
✅ Simple, intuitive UI

## 🚀 How to Use

### For Regular Users

1. Go to /account (User Dashboard)
2. Click "My Profile" card
3. On View Profile page, click "✏️ Edit Profile"
4. Upload a picture (optional) and edit information
5. Click "✓ Save Changes"

### For Admins

1. Go to /admin (Admin Dashboard)
2. Click "Admin Profile" card
3. On View Profile page, click "✏️ Edit Profile"
4. Upload a picture (optional) and edit information
5. Click "✓ Save Changes"

## 🔄 Navigation

```
User Account Page
    ↓
View Profile Page ← → Edit Profile Page
    ↓                       ↓
[Back to Dashboard]    [Back & Cancel buttons]

Admin Dashboard
    ↓
View Profile Page ← → Edit Profile Page
    ↓                       ↓
[Back to Dashboard]    [Back & Cancel buttons]
```

## 📝 Notes

- Images are stored in Cloudinary (requires CLOUDINARY\_\* environment variables)
- Profile images are public URLs stored in database
- All changes are saved immediately upon submit
- User is redirected to view profile after successful update
- Profile picture is optional - users can have text-based avatars

## 🛠️ Environment Variables Required

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongo_uri
```
