/**
 * =====================================================
 * UNDERGROUND FAB — Gallery Image Data
 * =====================================================
 *
 * TO ADD A NEW IMAGE:
 * 1. Drop your image file into the /images/gallery/ folder
 * 2. Add an entry below with:
 *    - src: path to the image (e.g. "images/gallery/my-photo.jpg")
 *    - title: short title for the image
 *    - description: brief description (shown on hover)
 *    - category: one of "battery-racks", "custom", or "process"
 * 3. Save this file and refresh the page.
 *
 * SUPPORTED FORMATS: .jpg, .jpeg, .png, .webp
 * RECOMMENDED SIZE: 1200px wide minimum for best quality
 * =====================================================
 */

const galleryImages = [
  {
    src: "images/gallery/IMG_2616.jpg",
    title: "M18 Battery Rack",
    description: "6-slot M18 rack loaded with HD12.0 batteries",
    category: "battery-racks"
  },
  {
    src: "images/gallery/IMG_2614.jpg",
    title: "M18 Battery Rack — Detail",
    description: "CNC plasma-cut slots with Underground Fab branding",
    category: "battery-racks"
  },
  {
    src: "images/gallery/IMG_2613.jpg",
    title: "M12 Battery Rack",
    description: "Wall-mounted M12 rack holding a mix of battery sizes",
    category: "battery-racks"
  }
];
