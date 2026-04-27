# Profile Feature UI/UX Design

## 1️⃣ ACCOUNT DASHBOARD PAGE (/account)

```
╔════════════════════════════════════════════════════════════════╗
║                      USER DASHBOARD                            ║
║              ← Back to Home  |  ::: Menu                        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  ║
║  │   👤 My Profile  │  │  📋 My Complaints│  │ ➕ Create    │  ║
║  │                  │  │                  │  │ Complaint    │  ║
║  │ View and manage  │  │ Total: X         │  │              │  ║
║  │ account settings │  │                  │  │ File a new   │  ║
║  │                  │  │ [View Complaints]│  │ complaint    │  ║
║  │ [View Profile]   │  │                  │  │ [Create New] │  ║
║  └──────────────────┘  └──────────────────┘  └──────────────┘  ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

**Changes Made:**

- "My Profile" card now links to `/account/view-profile`
- Clicking it navigates to the View Profile page

---

## 2️⃣ VIEW PROFILE PAGE (/account/view-profile)

```
╔════════════════════════════════════════════════════════════════╗
║                      VIEW PROFILE                              ║
║  ← Back to Dashboard                                           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║                    ┌─────────────────┐                          ║
║                    │                 │                          ║
║                    │   [Profile Pic] │                          ║
║                    │   or [Avatar]   │                          ║
║                    │                 │                          ║
║                    └─────────────────┘                          ║
║                                                                  ║
║                  John Doe (Username) 👤                         ║
║                  john@example.com                               ║
║                  [👤 User Badge]                                ║
║                                                                  ║
├─────────────────────────────────────────────────────────────────┤
║  Email:        john@example.com                                 ║
║  NIC:          123456789 (or "Not provided")                    ║
├─────────────────────────────────────────────────────────────────┤
║                                                                  ║
║              [✏️ Edit Profile]  [Back to Dashboard]             ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

**Features:**

- Circular profile picture (128x128px)
- Fallback avatar with first letter
- User information display
- Edit Profile button
- Back navigation

---

## 3️⃣ EDIT PROFILE PAGE (/account/edit-profile)

```
╔════════════════════════════════════════════════════════════════╗
║                    EDIT PROFILE                                ║
║  ← Back to Profile                                             ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  📸 PROFILE PICTURE                                             ║
║  ┌─────────────────────────────────────────────────────────┐   ║
║  │                                                           │   ║
║  │  ┌──────────────┐                                        │   ║
║  │  │              │      [📷 Choose Image]                │   ║
║  │  │ [Profile Pic]│      [✓ Upload Image] (if selected)   │   ║
║  │  │              │                                        │   ║
║  │  └──────────────┘                                        │   ║
║  │                                                           │   ║
║  └─────────────────────────────────────────────────────────┘   ║
║                                                                  ║
├─────────────────────────────────────────────────────────────────┤
║                                                                  ║
║  PROFILE INFORMATION                                            ║
║                                                                  ║
║  Username:  [__________________________]                        ║
║             (E.g., john_doe)                                   ║
║                                                                  ║
║  Email:     [__________________________]                        ║
║             (E.g., john@example.com)                           ║
║                                                                  ║
║  NIC:       [__________________________] (Optional)             ║
║             (E.g., 123456789)                                  ║
║                                                                  ║
├─────────────────────────────────────────────────────────────────┤
║                                                                  ║
║  [✓ Save Changes]              [Cancel]                         ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

**Features:**

- Two-section layout: Picture + Info
- Image upload with file chooser
- Image preview
- Form fields for information
- Save and Cancel buttons
- Error/Success notifications

---

## 4️⃣ ADMIN DASHBOARD PAGE (/admin)

```
╔════════════════════════════════════════════════════════════════╗
║                   ADMIN DASHBOARD                              ║
║               Welcome back, Admin! | [Logout]                  ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Stats Grid:                                                   ║
║  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              ║
║  │ Total: 42    │ │ Pending: 15  │ │ Approved: 20 │              ║
║  └──────────────┘ └──────────────┘ └──────────────┘              ║
║  ┌──────────────┐                                               ║
║  │ Rejected: 7  │                                               ║
║  └──────────────┘                                               ║
║                                                                  ║
║  Quick Actions:                                                ║
║  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  ║
║  │ 🔐 Admin Profile │  │  Manage          │  │ 👥 Registered│  ║
║  │ Manage account   │  │  Complaints      │  │ Users        │  ║
║  │ settings         │  │ Review all 42    │  │ View all     │  ║
║  │                  │  │ complaints       │  │ citizens     │  ║
║  │ [View Profile] ✨│  │ [Manage]         │  │ [View Users] │  ║
║  └──────────────────┘  └──────────────────┘  └──────────────┘  ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

**Changes Made:**

- "Admin Profile" card now links to `/admin/view-profile`

---

## 5️⃣ ADMIN VIEW PROFILE PAGE (/admin/view-profile)

```
╔════════════════════════════════════════════════════════════════╗
║                   ADMIN VIEW PROFILE                           ║
║  ← Back to Dashboard                                           ║
╠════════════════════════════════════════════════════════════════╣
║                                                                  ║
║                    ┌─────────────────┐                          ║
║                    │                 │                          ║
║                    │   [Profile Pic] │  (Red border for admin)  ║
║                    │   or [Avatar]   │                          ║
║                    │                 │                          ║
║                    └─────────────────┘                          ║
║                                                                  ║
║                  Admin User Name 🔐                             ║
║                  admin@example.com                              ║
║                  [🔐 Admin Badge]                               ║
║                                                                  ║
├─────────────────────────────────────────────────────────────────┤
║  Email:        admin@example.com                                ║
║  NIC:          987654321 (or "Not provided")                    ║
├─────────────────────────────────────────────────────────────────┤
║                                                                  ║
║              [✏️ Edit Profile]  [Back to Dashboard]             ║
║                                                                  ║
╚════════════════════════════════════════════════════════════════╝
```

**Styling Difference:**

- Red accent color instead of blue
- Red profile picture border
- Red badges and buttons

---

## 6️⃣ ADMIN EDIT PROFILE PAGE (/admin/edit-profile)

```
Same layout as user edit profile, but with:
- Red accent colors instead of blue
- Red "Edit Admin Profile" heading
- Red buttons and borders
- All functionality identical to user version
```

---

## 🎨 COLOR SCHEME

### For Regular Users

- Primary: Blue (#2563EB)
- Hover: Blue (#1D4ED8)
- Background: Light gradient
- Buttons: Blue

### For Admins

- Primary: Red (#DC2626)
- Hover: Red (#B91C1C)
- Background: Light gradient
- Buttons: Red

---

## 📱 Responsive Design

### Mobile (< 640px)

- Single column layout
- Stacked cards
- Full-width buttons
- Smaller text
- Touch-friendly spacing

### Tablet (640px - 1024px)

- Two-column grid where applicable
- Medium-sized components
- Optimized spacing

### Desktop (> 1024px)

- Full layout with proper spacing
- Multi-column grids
- Hover effects visible
- Optimal font sizes

---

## ✨ Interactive Elements

### Image Upload Section

1. User clicks "📷 Choose Image"
2. File picker opens
3. Selected image shows preview
4. "✓ Upload Image" button appears
5. Cloudinary uploads image
6. Success notification shows
7. Profile is updated

### Form Submission

1. User edits fields
2. Form validation
3. Click "✓ Save Changes"
4. Saving indicator shows
5. Success/Error notification
6. Redirect to view profile (on success)

---

## 🎯 User Experience Flow

```
ENTRY: Dashboard
  ↓ [Click View Profile]
VIEW PROFILE: Display user info with edit button
  ↓ [Click Edit Profile]
EDIT PROFILE:
  ├─ Upload Picture (Optional)
  │  ├─ Choose file → Preview → Upload
  │  └─ Success notification
  ├─ Edit Information
  │  ├─ Update fields
  │  └─ Save changes
  └─ [Save] or [Cancel]
     ↓
  SUCCESS: Redirect to View Profile
  ERROR: Show error message, stay on edit page
```
