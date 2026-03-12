# Image Requirements for Public Complaint Landing Page

This document lists all the images needed for the redesigned landing page. Please download/create these images and place them in the `/public/images/` directory.

## Required Images

### 1. Hero Section Image

- **Filename:** `hero-community-service.jpg`
- **Purpose:** Main hero image showing community service or government building
- **Dimensions:** 800x600px (responsive)
- **Suggested Content:** Community center, town hall, or civic service illustration
- **Where Used:** Right side of hero section (desktop only)

### 2. Service Category Images

#### Waste Management

- **Filename:** `service-waste-management.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Garbage collection, waste bins, recycling image
- **Aspect Ratio:** 3:2

#### Street Lighting

- **Filename:** `service-street-lights.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Street lights, lamp posts, road lighting at night
- **Aspect Ratio:** 3:2

#### Drainage Maintenance

- **Filename:** `service-drainage-maintenance.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Storm drains, water management, street drainage
- **Aspect Ratio:** 3:2

#### Road Maintenance

- **Filename:** `service-road-maintenance.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Road repair, pothole fixing, road construction
- **Aspect Ratio:** 3:2

#### Water Supply

- **Filename:** `service-water-supply.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Water pipes, water distribution, tap water
- **Aspect Ratio:** 3:2

#### General Support

- **Filename:** `service-general-support.jpg`
- **Dimensions:** 600x400px
- **Suggested Content:** Customer support, helpdesk, community assistance
- **Aspect Ratio:** 3:2

## Image Sources

### Free Image Websites

You can download images from these free resources:

1. **Unsplash** (unsplash.com)
   - High-quality free images
   - No attribution required
   - Search terms: "waste management", "street lights", "drainage", "road repair", "water supply", "customer support"

2. **Pexels** (pexels.com)
   - Free stock photos
   - No attribution required
   - Similar search capabilities

3. **Pixabay** (pixabay.com)
   - Large collection of free images
   - High resolution available
   - Good for civic/infrastructure images

4. **Shutterstock** (shutterstock.com) / **Getty Images** (gettyimages.com)
   - Premium options if budget allows
   - Professional quality images

5. **Google Images** (images.google.com)
   - Can filter by usage rights
   - Look for "Creative Commons" or "Free to use" licenses

## Installation Steps

1. Download all 7 images from your chosen source
2. Rename them exactly as specified in the filenames above
3. Create the `/public/images/` directory if it doesn't exist
4. Place all images in this directory

```
public/
  └── images/
      ├── hero-community-service.jpg
      ├── service-waste-management.jpg
      ├── service-street-lights.jpg
      ├── service-drainage-maintenance.jpg
      ├── service-road-maintenance.jpg
      ├── service-water-supply.jpg
      └── service-general-support.jpg
```

## Best Practices

- **File Format:** Use JPG for photographs, PNG for illustrations with transparency
- **Compression:** Optimize images for web (72 DPI, reduced file size)
- **Aspect Ratio:** Keep consistent 3:2 ratio for service images
- **Quality:** Use at least 1200x800px minimum for service images
- **Content:** Choose professional, relevant images that align with the service description

## Alternative: Using Placeholder Images

If you want to test the website before downloading real images, you can use temporary placeholder images:

- Placeholder Service Images: `https://via.placeholder.com/600x400/667eea/ffffff?text=Service+Name`
- Placeholder Hero Image: `https://via.placeholder.com/800x600/667eea/ffffff?text=Community+Service`

Replace these URLs in the code temporarily until real images are ready.

## Troubleshooting

If images don't appear:

1. Verify filenames match exactly (case-sensitive on some systems)
2. Ensure images are in the correct `/public/images/` directory
3. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
4. Check browser console for 404 errors
5. Restart the development server (`npm run dev`)
