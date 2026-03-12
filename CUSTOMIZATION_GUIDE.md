# Customization Guide

This guide explains how to customize the landing page to match your specific needs.

## Quick Customizations

### 1. Change Site Colors

**Primary Color (Blue)**
Find all instances of `from-blue-600` and `to-blue-700` and replace with your color classes:

```jsx
// Original
<div className="bg-gradient-to-br from-blue-600 to-blue-800">

// Change to purple
<div className="bg-gradient-to-br from-purple-600 to-purple-800">
```

Tailwind color options: `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `purple`, `pink`

### 2. Change Site Name

Search for `Pradeshiya Sabha` and replace with your organization name:

```jsx
<h1 className="text-lg md:text-lg font-bold text-gray-900 leading-tight">
  YOUR_ORG_NAME
</h1>
```

Also update:

- Subheading: `Addalachenai` → your location
- Footer copyright: Year and organization name

### 3. Update Contact Information

Find and replace:

```jsx
// Phone
+94 (0) XXX XXX XXXX → Your actual phone number

// Email
info@pradeshyasabha.lk → Your email address

// Address
Addalachenai, Sri Lanka → Your location

// Social Links
href="#" → Add actual URLs
```

### 4. Modify Service Categories

To edit the services section, find the services grid and modify items:

```jsx
<div className="group relative bg-white rounded-2xl ...">
  <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-500 ...">
    <img src="/images/service-waste-management.jpg" alt="Waste Management" ... />
  </div>
  <div className="p-6 md:p-8">
    <div className="mb-3">
      <span className="text-3xl">♻️</span> {/* Change emoji */}
    </div>
    <h3 className="text-xl md:text-2xl font-bold ...">Waste Management</h3> {/* Change title */}
    <p className="text-gray-600 ...">Service description here...</p> {/* Change description */}
  </div>
</div>
```

To add a 7th service, duplicate one card block and customize.

### 5. Change Hero Section Text

```jsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
  Your Voice Matters  {/* Change this */}
</h1>
<p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
  Report issues affecting your community and track their resolution in real-time.
  {/* Change this */}
</p>
```

### 6. Update Vision & Mission

```jsx
{
  /* Vision Card */
}
<p className="text-gray-700 leading-relaxed text-lg">
  To build a clean, green, and developed community...
  {/* Change your vision text here */}
</p>;

{
  /* Mission Card */
}
<p className="text-gray-700 leading-relaxed text-lg">
  To provide efficient services, protect the environment...
  {/* Change your mission text here */}
</p>;
```

### 7. Modify Core Values

Find the Core Values section and customize:

```jsx
{[
  { icon: '✓', title: 'Transparency', desc: 'Open and honest communication' },
  { icon: '💪', title: 'Accountability', desc: 'Responsible decision making' },
  { icon: '🤝', title: 'Participation', desc: 'Community involvement' },
  { icon: '🌱', title: 'Sustainability', desc: 'Long-term growth' }
].map((value, idx) => (
  // Update icon emoji and text here
))}
```

### 8. Change Step Names in "How to File"

```jsx
<h3 className="font-bold text-gray-900 mb-2 text-lg">Create Account</h3> {/* Change step name */}
<p className="text-gray-600">Register using your email or phone number...</p> {/* Change description */}
```

### 9. Update Section Titles

```jsx
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
  Our Vision & Mission {/* Change title */}
</h2>
<p className="text-gray-600 text-lg max-w-2xl mx-auto">
  Committed to transforming our community... {/* Change subtitle */}
</p>
```

## Advanced Customizations

### Change Responsive Breakpoints

Tailwind breakpoints in the code:

- `hidden md:block` - Hidden on mobile, visible on tablets and up
- `md:grid-cols-2` - 1 column on mobile, 2 on tablets and up
- `lg:grid-cols-5` - Adjust for desktop

Modify these to change layout behavior.

### Adjust Spacing

- `py-20` = padding vertical (5rem = 80px)
- `py-32` = padding vertical (8rem = 128px)
- `px-4` = padding horizontal mobile (1rem = 16px)
- `md:px-6` = padding horizontal tablet+ (1.5rem = 24px)

Adjust numbers to change spacing.

### Change Font Sizes

- `text-3xl` = Desktop header size
- `text-center` = Text alignment
- `font-bold` = Font weight (normal, semibold, bold)
- `leading-relaxed` = Line height

## Adding New Sections

To add a new section after Services:

```jsx
{
  /* Your New Section */
}
<section id="your-section-id" className="py-20 md:py-32 px-4 md:px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16">
      <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4 border border-blue-200">
        <p className="text-blue-600 text-sm font-semibold">Label</p>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Section Title
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Section subtitle or description
      </p>
    </div>

    {/* Your Content Here */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Add cards or content */}
    </div>
  </div>
</section>;
```

Don't forget to:

1. Add `id="your-section-id"` to the section
2. Update `navItems` array in the header
3. Add corresponding footer navigation link

## Color Palette Swap

To completely change the color scheme, create a color mapping:

**Current (Blue/Purple):**

- Primary: `blue-600`, `blue-700`
- Secondary: `purple-600`
- Accent: `green-600`, `yellow-600`, `red-600`

**Alternative (Teal/Cyan):**

- Replace `blue-600` → `teal-600`
- Replace `purple-600` → `cyan-600`
- Replace `green-600` → `emerald-600`

## Common Changes Reference

| What To Change    | How To Find                     | What To Replace        |
| ----------------- | ------------------------------- | ---------------------- |
| Organization Name | Search: "Pradeshiya Sabha"      | Your organization name |
| Phone Number      | Search: "+94 XXX XXX XXXX"      | Your phone number      |
| Email Address     | Search: "info@pradeshyasabha"   | Your email             |
| Color Scheme      | Search: "blue-600"              | Your color code        |
| Service Names     | Service cards section           | Your service names     |
| Section Titles    | Search: `<h2 className`         | Your titles            |
| Button Text       | Search: CTA button classes      | Your button text       |
| Images            | Update `/public/images/` folder | Download real images   |

## Testing Changes

After making changes:

1. **Syntax Check**: Look for red underlines in VS Code
2. **Visual Check**: Run `npm run dev` and check in browser
3. **Mobile Check**: Open DevTools (F12) and toggle device toolbar
4. **Links Check**: Click every navigation link
5. **Image Check**: Ensure all images load correctly

## Useful Tailwind Classes Reference

```
Sizing:        w-16, h-16 (width, height)
Spacing:       p-6, m-4, gap-8 (padding, margin, gaps)
Colors:        bg-blue-600, text-gray-900 (background, text colors)
Display:       flex, grid, hidden (layout control)
Responsive:    md:, lg:, xl: (mobile-first breakpoints)
Effects:       rounded-lg, shadow-lg (borders, shadows)
Text:          font-bold, text-center, leading-relaxed
Transitions:   transition-all, duration-300 (animations)
Gradients:     gradient-to-br, from-blue-600, to-blue-700
```

## Version Control

After customizing, consider:

1. Creating a new branch: `git checkout -b customization/your-changes`
2. Committing your changes: `git commit -m "Customize landing page"`
3. Pushing: `git push origin customization/your-changes`

## Need More Help?

### Resources

- Tailwind CSS Docs: https://tailwindcss.com/docs
- Next.js Docs: https://nextjs.org/docs
- React Documentation: https://react.dev

### Common Issues

**Images not showing?**

- Check filename matches exactly (case-sensitive)
- Verify image is in `/public/images/` directory
- Clear browser cache (Ctrl+Shift+Delete)

**Colors look different?**

- Check Tailwind config in `tailwind.config.js`
- Verify color class names (e.g., `blue-600` not `blue600`)

**Layout broken?**

- Check for missing closing tags
- Verify grid classes use proper syntax
- Look for console errors (F12 → Console tab)

**Navigation not working?**

- Verify section IDs match navigation references
- Check `scrollToSection()` function
- Ensure links point to correct pages

---

**Last Updated**: 2024
**Tailwind Version**: 4.x
**Next.js Version**: 16.x
