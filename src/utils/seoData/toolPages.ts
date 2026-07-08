export interface ToolSEOData {
  id: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  features: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
  internalLinks: string[];
  cta: string;
}

export const toolSEOData: ToolSEOData[] = [
  {
    id: 'visible-watermark-remover',
    name: 'Visible Watermark Remover',
    seoTitle: 'Free Online Visible Watermark Remover - Dr Watermark',
    metaDescription: 'Erase logos, stamps, copyright texts, and watermarks from your images instantly online. 100% automated AI inpainting. No signups required.',
    h1: 'Free Visible Watermark Remover Online',
    introduction: 'Dr Watermark\'s Visible Watermark Remover utilizes state-of-the-art neural networks to rebuild pixels behind superimposed copyright stamps, logos, text overlays, and dates. Whether you need to restore your own corrupted project file or clean up licensed media with permission, our automated inpainter delivers seamless, high-definition results in seconds.',
    features: [
      'Smart Content-Aware Inpainting: Rebuilds texture, contrast, and shading cleanly.',
      'No Quality Loss: Keeps original image dimensions and EXIF metadata.',
      'Completely Automated: Simply paint or click to eliminate unwanted markings.',
      'Multi-Format Support: Works with JPG, PNG, WEBP, and HEIC files.'
    ],
    steps: [
      'Upload your image to the visible watermark remover dashboard.',
      'Use our precision brush to highlight the watermark or text overlay.',
      'Click "Erase Watermark" to let the AI analyze and fill in the pixels.',
      'Download your pristine, clean high-definition asset!'
    ],
    faqs: [
      { q: 'Is removing watermarks from stock photos illegal?', a: 'Removing watermarks is legal if you own the copyright or have bought a proper license. Doing so without authorization to bypass payments violates DMCA guidelines.' },
      { q: 'Does this tool cause blurriness where the watermark was?', a: 'No, our advanced generative AI predicts and fills pixels with matching background details rather than smudging or blurring.' }
    ],
    internalLinks: ['/tools/image-upscaler', '/tools/webp-converter', '/about'],
    cta: 'Erase your first watermark instantly with Dr Watermark!'
  },
  {
    id: 'watermark-detector',
    name: 'Watermark Detector',
    seoTitle: 'AI Text Watermark & Hidden Tracker Detector - Dr Watermark',
    metaDescription: 'Audit text pasteboards for invisible zero-width space characters, unicode tracking tokens, and visual Cyrillic homoglyph spoofs instantly.',
    h1: 'AI Watermark & Hidden Tracker Detector',
    introduction: 'Ensure absolute data privacy and copy integrity before publishing. The Watermark Detector scans plain-text blocks in real-time, detecting and flagging invisible zero-width spacing markers (ZWSP, ZWNJ, ZWJ), byte order marks (BOM), and lookalike letters from other language sets (homoglyphs) used to silently track documents.',
    features: [
      'Real-Time Text Scanner: Instantly flags hidden characters.',
      'Character Position Highlights: Pinpoints exactly where trackers are embedded.',
      'Unicode Decoding: Explains exactly what type of character is hiding.',
      '100% Client-Side Private: No data is ever sent to our servers.'
    ],
    steps: [
      'Paste your draft copy or AI-generated output into the input box.',
      'View the real-time tracker counts at the top of the interface.',
      'Identify localized homoglyph letters highlighted in yellow.',
      'Click "Clean Text" to resolve and normalize character sets.'
    ],
    faqs: [
      { q: 'What are invisible zero-width spaces?', a: 'These are non-displaying characters (0 pixels wide) that can be arranged in custom sequences to act as binary tracking tokens in text.' },
      { q: 'Why are homoglyphs dangerous?', a: 'A homoglyph looks identical to a standard letter but acts as a different code, which breaks developer compilers and hurts search engine indexing.' }
    ],
    internalLinks: ['/', '/blog/detect-invisible-zerowidth-spaces-unicode-steganography'],
    cta: 'Scan your draft for tracking markers now!'
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    seoTitle: 'Free AI Background Remover (HD Transparent PNG) - Dr Watermark',
    metaDescription: 'Extract portrait subjects, objects, or products from backgrounds in one click. Perfect transparent PNG cutout output. Instant download.',
    h1: 'Free AI Background Remover',
    introduction: 'Dr Watermark\'s automated AI Background Remover isolates foreground subjects from complex backdrops in less than 5 seconds. Perfect for Amazon seller catalogs, professional headshots, and graphic design sticker creation, our tool cuts crisp edges, handles flyaway hairs, and exports in premium high-definition resolution.',
    features: [
      'Advanced Semantic Segmentation: Automatically distinguishes foreground from backdrop.',
      'Intelligent Hair Masking: Preserves fine details, fringes, and textures.',
      'Transparent PNG Output: Exports with precise alpha transparency channels.',
      'Studio Quality Backdrops: Swap colors or add custom backdrops.'
    ],
    steps: [
      'Upload your photography file (JPG, PNG, or WEBP).',
      'The AI model automatically removes the background in 1 click.',
      'Adjust or refine any tricky borders using our eraser brush.',
      'Save and download your transparent PNG file!'
    ],
    faqs: [
      { q: 'Can I remove backgrounds from bulk product lines?', a: 'Yes, our online background remover is optimized for rapid, high-speed processing.' },
      { q: 'What is the maximum output resolution?', a: 'Our tool supports high-definition output matching the original dimensions of your uploaded photo.' }
    ],
    internalLinks: ['/tools/image-compressor', '/tools/image-optimizer', '/tools/png-to-jpg'],
    cta: 'Erase backgrounds automatically now!'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    seoTitle: 'Smart Online Image Compressor (Lossless) - Dr Watermark',
    metaDescription: 'Reduce PNG, JPG, and WEBP image file sizes up to 90% without losing visual clarity. Boost PageSpeed and Core Web Vitals instantly.',
    h1: 'Smart Image Compressor',
    introduction: 'Do not compromise on quality for speed. Our lossless and smart lossy image compressor utilizes modern quantization algorithms to strip unneeded colors and pixels without any visible shift in image quality. Prepare light assets that load instantly on mobile networks.',
    features: [
      'Up to 90% Compression: Huge storage savings for web assets.',
      'Adjustable Compression levels: Choose between high quality or smallest file size.',
      'Batch Image Processing: Compress up to 50 files simultaneously.',
      'Core Web Vitals Boost: Increase search rankings by optimizing speed.'
    ],
    steps: [
      'Drag and drop your images into the compression canvas.',
      'Choose your preferred output format and quality parameters.',
      'Click "Compress Images" to scale file weights in seconds.',
      'Download your optimized ZIP package or separate files.'
    ],
    faqs: [
      { q: 'How does lossless image compression work?', a: 'It removes redundant meta tags and reorganizes image color tables so that file size drops without modifying any visible pixels.' },
      { q: 'Is WEBP smaller than JPG after compression?', a: 'Yes, WEBP files generally achieve 25-30% smaller sizes than JPEGs at similar quality levels.' }
    ],
    internalLinks: ['/tools/webp-converter', '/tools/image-optimizer'],
    cta: 'Optimize your web image file weights today!'
  },
  {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    seoTitle: 'Free AI Image Upscaler & Detail Enhancer - Dr Watermark',
    metaDescription: 'Increase image resolution up to 4x cleanly using AI. Fix blurry, low-resolution photographs and restore fine textures in one click.',
    h1: 'Free AI Image Upscaler',
    introduction: 'Turn blurry, low-resolution snapshots into crisp, high-definition printable files. Dr Watermark\'s AI Image Upscaler uses generative neural super-resolution to predict missing pixels, sharpen soft edges, reduce compression noise, and upscale graphics up to 400% cleanly.',
    features: [
      'Super-Resolution scaling: Scale images up to 2x or 4x without pixelation.',
      'Noise & Blur Reduction: Smooths out blocky compression and focuses camera blur.',
      'Anime & Vector Modes: Custom optimization profiles for vector graphics or photos.',
      'Print-Ready output: Prepares files for high-quality banner printing.'
    ],
    steps: [
      'Upload a blurry or small image (PNG, JPG, or WEBP).',
      'Select your scaling multiplier (2x or 4x) and processing profile.',
      'Click "Upscale Image" and watch the AI restore textures.',
      'Save your pristine, high-resolution graphic asset.'
    ],
    faqs: [
      { q: 'How does AI upscaling compare to standard scaling?', a: 'Standard scaling (like bicubic) stretches pixels causing blurriness, whereas AI upscaling generates new matching details.' },
      { q: 'Is there a limit on input file size?', a: 'To ensure fast on-device speed, we recommend input files below 10MB.' }
    ],
    internalLinks: ['/tools/visible-watermark-remover', '/tools/metadata-remover'],
    cta: 'Restore low-resolution photos to HD now!'
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    seoTitle: 'Easy Online Image Cropper & Ratio Resizer - Dr Watermark',
    metaDescription: 'Crop images to standard social media aspect ratios (16:9, 1:1, 4:5, 9:16) instantly in your web browser. Precise custom pixel adjustments.',
    h1: 'Online Image Cropper',
    introduction: 'Shape your images for perfect publication. Our interactive online image cropper allows you to crop photos with pixel-perfect precision. Use preset aspect ratios for Instagram posts, YouTube thumbnails, TikTok covers, or set custom dimensions instantly without losing original visual fidelity.',
    features: [
      'Interactive Canvas Controls: Smooth zoom and drag-to-crop handles.',
      'Social Media Aspect Ratio Presets: Fits Instagram, Pinterest, Facebook, and LinkedIn.',
      'Custom Dimension Constraints: Specify exact width and height in pixels.',
      'Lossless Output Exporting: Keeps visual depth during pixel cuts.'
    ],
    steps: [
      'Choose or drop your file into the cropper.',
      'Select a preset ratio (e.g., 16:9 for YouTube) or customize the boundaries.',
      'Drag, rotate, and zoom the image to center the focal point.',
      'Click "Crop and Download" to export the cropped asset.'
    ],
    faqs: [
      { q: 'Will cropping an image reduce its resolution?', a: 'Cropping removes outer pixels, so the final dimensions are smaller, but it maintains the original clarity of the remaining area.' },
      { q: 'Can I crop PNGs with transparency?', a: 'Yes, our cropper retains alpha channels and transparency output cleanly.' }
    ],
    internalLinks: ['/tools/resize-image', '/tools/rotate-image'],
    cta: 'Crop your image to the perfect aspect ratio now!'
  }
];

export function getFullToolsList(): { id: string; name: string; slug: string; description: string }[] {
  return [
    { id: 'visible-watermark-remover', name: 'Visible Watermark Remover', slug: 'visible-watermark-remover', description: 'Erase watermarks, logos, dates, and overlay stamps using AI inpainting.' },
    { id: 'watermark-detector', name: 'Watermark Detector', slug: 'watermark-detector', description: 'Analyze text draft files to find zero-width tracking characters and spoofed letters.' },
    { id: 'background-remover', name: 'Background Remover', slug: 'background-remover', description: 'Erase backgrounds instantly and export high-definition transparent PNG assets.' },
    { id: 'image-compressor', name: 'Image Compressor', slug: 'image-compressor', description: 'Losslessly reduce file weights of JPG, PNG, and WEBP for website speed.' },
    { id: 'image-upscaler', name: 'Image Upscaler', slug: 'image-upscaler', description: 'Increase image resolution up to 4x while sharpening details.' },
    { id: 'image-cropper', name: 'Image Cropper', slug: 'image-cropper', description: 'Crop photographs to social media ratios cleanly.' },
    { id: 'resize-image', name: 'Resize Image', slug: 'resize-image', description: 'Scale width and height dimensions in pixels or percentages.' },
    { id: 'rotate-image', name: 'Rotate Image', slug: 'rotate-image', description: 'Rotate 90 degrees or flip horizontally/vertically in 1 click.' },
    { id: 'flip-image', name: 'Flip Image', slug: 'flip-image', description: 'Invert images horizontally or vertically.' },
    { id: 'png-to-jpg', name: 'PNG to JPG', slug: 'png-to-jpg', description: 'Convert PNG images to standard high-quality JPG format.' },
    { id: 'jpg-to-png', name: 'JPG to PNG', slug: 'jpg-to-png', description: 'Convert JPEG assets to transparent background PNG format.' },
    { id: 'webp-converter', name: 'WEBP Converter', slug: 'webp-converter', description: 'Convert files to Google WEBP format for optimal page speeds.' },
    { id: 'metadata-viewer', name: 'Image Metadata Viewer', slug: 'metadata-viewer', description: 'Inspect hidden camera EXIF, GPS locations, and IPTC credits.' },
    { id: 'metadata-remover', name: 'Metadata Remover', slug: 'metadata-remover', description: 'Strip privacy EXIF data and camera specifications cleanly.' },
    { id: 'blur-image', name: 'Blur Image', slug: 'blur-image', description: 'Selectively blur faces, texts, or plates on photos.' },
    { id: 'sharpen-image', name: 'Sharpen Image', slug: 'sharpen-image', description: 'Sharpen soft edges and fix camera motions on images.' },
    { id: 'color-picker', name: 'Color Picker', slug: 'color-picker', description: 'Extract exact HEX and RGB colors from photos instantly.' },
    { id: 'image-optimizer', name: 'Image Optimizer', slug: 'image-optimizer', description: 'Process web assets for Google PageSpeed compliance.' }
  ];
}
