export interface SitemapNode {
  path: string;
  title: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
  category: 'core' | 'tools' | 'resources' | 'legal' | 'blog';
  description: string;
}

export const sitemapData: SitemapNode[] = [
  // Core Pages
  { path: '/', title: 'Home - Dr Watermark', changefreq: 'daily', priority: 1.0, category: 'core', description: 'Clean text watermarks, zero-width spaces, and hidden Unicode trackers locally in your browser.' },
  { path: '/about', title: 'About Us - Dr Watermark', changefreq: 'monthly', priority: 0.8, category: 'core', description: 'Learn about Dr Watermark\'s mission to provide 100% private, client-side text sanitization and image editing utilities.' },
  { path: '/contact', title: 'Contact Support - Dr Watermark', changefreq: 'monthly', priority: 0.7, category: 'core', description: 'Get in touch with the Dr Watermark team for feedback, support, and custom business integrations.' },
  
  // Legal Pages
  { path: '/privacy', title: 'Privacy Policy - Dr Watermark', changefreq: 'monthly', priority: 0.5, category: 'legal', description: 'Our comprehensive privacy policy detailing our 100% serverless, private on-device processing architecture.' },
  { path: '/terms', title: 'Terms of Service - Dr Watermark', changefreq: 'monthly', priority: 0.5, category: 'legal', description: 'The standard terms of use, licensing agreements, and rules for utilizing the Dr Watermark website.' },
  { path: '/disclaimer', title: 'Legal Disclaimer - Dr Watermark', changefreq: 'monthly', priority: 0.5, category: 'legal', description: 'Important legal notices and disclaimers regarding proper, ethical, and authorized use of our tools.' },
  
  // Image Editing Tools
  { path: '/tools/visible-watermark-remover', title: 'Free Visible Watermark Remover Online', changefreq: 'weekly', priority: 0.9, category: 'tools', description: 'Instantly remove logos, stamps, dates, and watermarks from your owned images using advanced inpainting.' },
  { path: '/tools/watermark-detector', title: 'AI Watermark & Hidden Tracker Detector', changefreq: 'weekly', priority: 0.9, category: 'tools', description: 'Analyze text files and images to detect hidden zero-width trackers, cryptographic signatures, or digital watermarks.' },
  { path: '/tools/background-remover', title: 'AI Background Remover (HD Export)', changefreq: 'weekly', priority: 0.9, category: 'tools', description: 'Extract subjects and remove image backgrounds instantly in high definition. Fast, accurate, and automated.' },
  { path: '/tools/image-compressor', title: 'Smart Image Compressor (Lossless)', changefreq: 'weekly', priority: 0.9, category: 'tools', description: 'Reduce JPG, PNG, and WEBP file sizes up to 90% while maintaining stunning crisp image resolution.' },
  { path: '/tools/image-upscaler', title: 'Free AI Image Upscaler & Enhancer', changefreq: 'weekly', priority: 0.9, category: 'tools', description: 'Increase image resolution up to 4x, fix blurry photos, and restore fine textures with high-fidelity super-resolution.' },
  { path: '/tools/image-cropper', title: 'Online Image Cropper & Ratio Resizer', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Crop images to standard social media aspect ratios (16:9, 1:1, 4:5) instantly in your browser.' },
  { path: '/tools/resize-image', title: 'Bulk Image Resizer (Width & Height)', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Change image dimensions in pixels or percentages. Batch resize your images for fast loading.' },
  { path: '/tools/rotate-image', title: 'Instant Image Rotator & Flippers', changefreq: 'weekly', priority: 0.7, category: 'tools', description: 'Rotate images 90 degrees, 180 degrees, or flip horizontally/vertically without losing image metadata.' },
  { path: '/tools/png-to-jpg', title: 'Convert PNG to JPG Online (High Quality)', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Instantly convert PNG files to standard JPG format, adjust quality, and remove transparency backgrounds.' },
  { path: '/tools/jpg-to-png', title: 'Convert JPG to PNG Online (Alpha Support)', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Convert JPEG images to high-quality PNG format with transparent backgrounds in one single click.' },
  { path: '/tools/webp-converter', title: 'Next-Gen WEBP Converter (JPG, PNG, GIF)', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Convert any image format to highly-optimized, lightweight Google WEBP files for superior page speed performance.' },
  { path: '/tools/metadata-viewer', title: 'EXIF Image Metadata Viewer & Inspector', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Read and inspect hidden EXIF, IPTC, and XMP metadata including GPS coordinates and camera models.' },
  { path: '/tools/metadata-remover', title: 'Secure EXIF & Metadata Stripper', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Clean private details, camera specs, and GPS telemetry from your photos before publishing.' },
  { path: '/tools/blur-image', title: 'Selective Image Blur & Privacy Mask', changefreq: 'weekly', priority: 0.7, category: 'tools', description: 'Blur faces, license plates, or sensitive document text instantly in your browser.' },
  { path: '/tools/sharpen-image', title: 'Smart Image Sharpen & Detail Enhancer', changefreq: 'weekly', priority: 0.7, category: 'tools', description: 'Bring out hidden details, fix motion blurs, and enhance contrast of soft-focus images.' },
  { path: '/tools/color-picker', title: 'Precision Image Color Picker & Hex Code', changefreq: 'weekly', priority: 0.7, category: 'tools', description: 'Upload any photo and hover to extract clean HEX, RGB, or HSL color values instantly.' },
  { path: '/tools/image-optimizer', title: 'Google PageSpeed Image Optimizer', changefreq: 'weekly', priority: 0.8, category: 'tools', description: 'Prepare web assets by converting to webp, compressing file size, and setting optimum responsive aspect ratios.' },
  
  // Blog / Resource Hub
  { path: '/blog', title: 'Dr Watermark Blog - Editing Playbook & Guides', changefreq: 'daily', priority: 0.8, category: 'blog', description: 'Expert educational tutorials, copyright compliance strategies, design principles, and image editing secrets.' },
  { path: '/resources', title: 'Design & Media Resource Hub', changefreq: 'weekly', priority: 0.7, category: 'resources', description: 'Download clean vector assets, copyright cheat sheets, and digital publishing templates.' },
  { path: '/faq', title: 'Comprehensive FAQ Database - Dr Watermark', changefreq: 'weekly', priority: 0.7, category: 'resources', description: 'Answers to the 500 most frequently asked questions about watermarks, photo copyright, and image processing.' }
];

export const sitemapCategories = {
  core: 'Core Core Pages',
  tools: 'Interactive Image & Text Utilities',
  resources: 'Guides, Tutorials & FAQs',
  legal: 'Trust & Legal Compliance',
  blog: 'Content & SEO Blog Hub'
};
