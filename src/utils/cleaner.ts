import { CleanOptions, CleanResult, MarkerBreakdown } from "../types";

export const HIDDEN_MARKERS = [
  { char: "\u200B", name: "Zero Width Space (ZWSP)", hex: "U+200B", category: "Zero-Width", desc: "Frequently used in stealth watermarking to encode tracking IDs." },
  { char: "\u200C", name: "Zero Width Non-Joiner (ZWNJ)", hex: "U+200C", category: "Zero-Width", desc: "Prevents ligatures; often abused to insert binary fingerprints." },
  { char: "\u200D", name: "Zero Width Joiner (ZWJ)", hex: "U+200D", category: "Zero-Width", desc: "Connects emojis/chars; used to hide trailing signatures." },
  { char: "\uFEFF", name: "Zero Width No-Break Space (BOM)", hex: "U+FEFF", category: "Zero-Width", desc: "Byte Order Mark; causes parser crashes and display glitches." },
  { char: "\u200E", name: "Left-to-Right Mark (LRM)", hex: "U+200E", category: "Directional", desc: "Forces text direction; can act as an invisible delimiter." },
  { char: "\u200F", name: "Right-to-Left Mark (RLM)", hex: "U+200F", category: "Directional", desc: "Forces text direction; utilized for hidden tracking markers." },
  { char: "\u202A", name: "Left-to-Right Embedding (LRE)", hex: "U+202A", category: "Directional", desc: "Directs text flow; can obscure sentence patterns." },
  { char: "\u202B", name: "Right-to-Left Embedding (RLE)", hex: "U+202B", category: "Directional", desc: "Directs text flow; used to insert layout distortions." },
  { char: "\u202C", name: "Pop Directional Formatting (PDF)", hex: "U+202C", category: "Directional", desc: "Terminates bi-directional overrides." },
  { char: "\u202D", name: "Left-to-Right Override (LRO)", hex: "U+202D", category: "Directional", desc: "Forces absolute LTR rendering to mask character positions." },
  { char: "\u202E", name: "Right-to-Left Override (RLO)", hex: "U+202E", category: "Directional", desc: "Forces absolute RTL rendering; can spoof file types/content." },
  { char: "\u2060", name: "Word Joiner (WJ)", hex: "U+2060", category: "Invisible", desc: "Prevents word wrap; serves as an invisible spacing anchor." },
  { char: "\u2061", name: "Function Application", hex: "U+2061", category: "Invisible", desc: "Invisible mathematical formatting symbol." },
  { char: "\u2062", name: "Invisible Times", hex: "U+2062", category: "Invisible", desc: "Invisible mathematical multiplication operator." },
  { char: "\u2063", name: "Invisible Separator", hex: "U+2063", category: "Invisible", desc: "Standard invisible formatting delimiter." },
  { char: "\u2064", name: "Invisible Plus", hex: "U+2064", category: "Invisible", desc: "Invisible mathematical addition operator." },
  { char: "\u180E", name: "Mongolian Vowel Separator", hex: "U+180E", category: "Invisible", desc: "Invisible separator used to slip tracking payloads past filters." },
  { char: "\u3164", name: "Hangul Filler", hex: "U+3164", category: "Invisible", desc: "Completely blank space character used to spoof empty entries." },
  { char: "\uFFA0", name: "Halfwidth Hangul Filler", hex: "U+FFA0", category: "Invisible", desc: "Half-width blank block spacing filler." },
  { char: "\u00AD", name: "Soft Hyphen (SHY)", hex: "U+00AD", category: "Invisible", desc: "Invisible boundary hyphen; used by AI text generators to tag words." }
];

export const HOMOGLYPHS_MAP: Record<string, string> = {
  "\u0430": "a", // Cyrillic small 'а'
  "\u0435": "e", // Cyrillic small 'е'
  "\u043E": "o", // Cyrillic small 'о'
  "\u0440": "p", // Cyrillic small 'р'
  "\u0441": "c", // Cyrillic small 'с'
  "\u0443": "y", // Cyrillic small 'у'
  "\u0445": "x", // Cyrillic small 'х'
  "\u0456": "i", // Cyrillic small 'і'
  "\u0410": "A", // Cyrillic capital 'А'
  "\u0412": "B", // Cyrillic capital 'В'
  "\u0415": "E", // Cyrillic capital 'Е'
  "\u041A": "K", // Cyrillic capital 'К'
  "\u041C": "M", // Cyrillic capital 'М'
  "\u041D": "H", // Cyrillic capital 'Н'
  "\u041E": "O", // Cyrillic capital 'О'
  "\u0420": "P", // Cyrillic capital 'Р'
  "\u0421": "C", // Cyrillic capital 'С'
  "\u0422": "T", // Cyrillic capital 'Т'
  "\u0425": "X", // Cyrillic capital 'Х'
  "\u0405": "S"  // Cyrillic capital 'Ѕ'
};

export function cleanText(text: string, options: CleanOptions): CleanResult {
  const startTime = performance.now();
  
  const originalBytes = new TextEncoder().encode(text).length;
  
  // Track counts
  const markerCounts: Record<string, number> = {};
  for (const marker of HIDDEN_MARKERS) {
    markerCounts[marker.char] = 0;
  }
  let homoglyphsNormalizedCount = 0;
  
  // Scan & Analyze input text
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char in markerCounts) {
      markerCounts[char]++;
    } else if (options.normalizeHomoglyphs && char in HOMOGLYPHS_MAP) {
      homoglyphsNormalizedCount++;
    }
  }

  // Build temporary arrays/strings for actual cleaning
  let processedText = "";
  
  for (const char of text) {
    // Check if it's a hidden marker we want to remove
    const isZeroWidth = ["\u200B", "\u200C", "\u200D", "\uFEFF"].includes(char);
    const isDirectional = ["\u200E", "\u200F", "\u202A", "\u202B", "\u202C", "\u202D", "\u202E"].includes(char);
    const isInvisible = ["\u2060", "\u2061", "\u2062", "\u2063", "\u2064", "\u180E", "\u3164", "\uFFA0", "\u00AD"].includes(char);

    const shouldRemove = 
      (options.removeZeroWidth && isZeroWidth) ||
      (options.removeHiddenFormat && (isDirectional || isInvisible));

    if (shouldRemove) {
      continue;
    }

    // Apply homoglyph translation if enabled
    if (options.normalizeHomoglyphs && char in HOMOGLYPHS_MAP) {
      processedText += HOMOGLYPHS_MAP[char];
    } else {
      processedText += char;
    }
  }

  // Apply expert normalization if selected
  let expertNormalizationBreakdown: MarkerBreakdown[] = [];
  if (options.expertNormalization) {
    // Count occurrences of things we are going to remove
    const headingCount = (processedText.match(/^#+\s+/gm) || []).length;
    const htmlTagCount = (processedText.match(/<\/?[^>]+(>|$)/g) || []).length;
    const boldItalicCount = (processedText.match(/(\*\*|\*|__|_|~~|`)/g) || []).length / 2;
    const linkCount = (processedText.match(/\[([^\]\n]+)\]\([^)\n]+\)/g) || []).length;
    
    // Count AI phrases
    let aiPhrasesCount = 0;
    const aiPhrases = [
      /\bIn conclusion\s*,?/gi,
      /\bIt is important to remember that\s*/gi,
      /\bWe must also keep in mind that\s*/gi,
      /\bIt is worth noting that\s*/gi,
      /\bIt is crucial to note that\s*/gi,
      /\bMoreover\s*,?/gi,
      /\bFurthermore\s*,?/gi,
      /\bAdditionally\s*,?/gi,
      /\bIn order to\s*/gi,
      /\bAt the end of the day\s*,?/gi,
      /\bNeedless to say\s*,?/gi,
      /\bIt goes without saying that\s*/gi,
      /\bIn today's fast-paced digital era\s*,?/gi,
      /\bIn the modern digital landscape\s*,?/gi,
      /\bIn today's fast-paced world\s*,?/gi,
      /\bLast but not least\s*,?/gi,
      /\bFirst and foremost\s*,?/gi,
      /\bTo put it simply\s*,?/gi,
      /\bOn the other hand\s*,?/gi,
      /\bWith that being said\s*,?/gi,
      /\bThat being said\s*,?/gi,
      /\bConsequently\s*,?/gi,
      /\bIn a world where\s*/gi,
      /\bA testament to\s*/gi,
      /\bDelve into\s*/gi,
      /\bNot only does it\s*/gi
    ];
    for (const regex of aiPhrases) {
      aiPhrasesCount += (processedText.match(regex) || []).length;
    }

    processedText = performExpertNormalization(processedText);

    if (headingCount > 0) {
      expertNormalizationBreakdown.push({
        label: "Markdown Headings Cleaned",
        count: headingCount,
        description: "Removed structural headings (#, ##, ###) while preserving their underlying text contents."
      });
    }
    if (htmlTagCount > 0) {
      expertNormalizationBreakdown.push({
        label: "HTML Tags Stripped",
        count: htmlTagCount,
        description: "Cleaned embedded HTML markup or tag residues to output pure plain text."
      });
    }
    if (boldItalicCount > 0) {
      expertNormalizationBreakdown.push({
        label: "Rich Formatting Stripped",
        count: Math.round(boldItalicCount),
        description: "Removed markdown bold, italic, strikethrough, and inline code formatting containers."
      });
    }
    if (linkCount > 0) {
      expertNormalizationBreakdown.push({
        label: "Markdown Links Sanitized",
        count: linkCount,
        description: "Stripped target URLs and anchors, leaving only the readable anchor text."
      });
    }
    if (aiPhrasesCount > 0) {
      expertNormalizationBreakdown.push({
        label: "Robotic AI Phrases Humanized",
        count: aiPhrasesCount,
        description: "Replaced repetitive, robotic phrases with elegant, natural human phrasing."
      });
    }
  }

  // Format whitespace rules: trim trailing, normalize double spaces
  let lines = processedText.split(/\r?\n/);
  
  if (options.trimTrailing) {
    lines = lines.map(line => line.trimEnd());
  }
  
  if (options.normalizeWhitespace) {
    lines = lines.map(line => line.replace(/ {2,}/g, " "));
  }
  
  processedText = lines.join("\n");

  // Calculate stats
  let totalRemoved = 0;
  const breakdown: MarkerBreakdown[] = [];

  // 1. Add zero-width and hidden markers to breakdown if they were removed
  for (const marker of HIDDEN_MARKERS) {
    const count = markerCounts[marker.char] || 0;
    const isZeroWidth = ["\u200B", "\u200C", "\u200D", "\uFEFF"].includes(marker.char);
    const isDirectional = ["\u200E", "\u200F", "\u202A", "\u202B", "\u202C", "\u202D", "\u202E"].includes(marker.char);
    const isInvisible = ["\u2060", "\u2061", "\u2062", "\u2063", "\u2064", "\u180E", "\u3164", "\uFFA0", "\u00AD"].includes(marker.char);

    const wasActive = 
      (options.removeZeroWidth && isZeroWidth) ||
      (options.removeHiddenFormat && (isDirectional || isInvisible));

    if (count > 0 && wasActive) {
      totalRemoved += count;
      breakdown.push({
        label: `${marker.name} (${marker.hex})`,
        count,
        description: marker.desc
      });
    }
  }

  // 2. Add homoglyphs to breakdown if normalized
  if (options.normalizeHomoglyphs && homoglyphsNormalizedCount > 0) {
    totalRemoved += homoglyphsNormalizedCount;
    breakdown.push({
      label: "Cyrillic-to-Latin Homoglyphs",
      count: homoglyphsNormalizedCount,
      description: "Characters visually identical to Latin keys but carrying distinct Cyrillic Unicode code points, often used to bypass scanners."
    });
  }

  // 3. Add expert normalization breakdown items
  for (const item of expertNormalizationBreakdown) {
    totalRemoved += item.count;
    breakdown.push(item);
  }

  const cleanedBytes = new TextEncoder().encode(processedText).length;
  const endTime = performance.now();
  const processingTimeMs = parseFloat((endTime - startTime).toFixed(2));

  return {
    originalText: text,
    cleanedText: processedText,
    totalRemoved,
    breakdown,
    processingTimeMs,
    originalBytes,
    cleanedBytes
  };
}

export function performExpertNormalization(text: string): string {
  if (!text) return "";

  // 1. Remove HTML tags
  let cleaned = text.replace(/<\/?[^>]+(>|$)/g, "");

  // 2. Remove headings (#, ##, ###) while preserving lines
  cleaned = cleaned.replace(/^#+\s+/gm, "");

  // 3. Remove code blocks and preserve their content
  // Triple backticks
  cleaned = cleaned.replace(/```[a-zA-Z0-9-]*\n?([\s\S]*?)```/g, "$1");
  // Inline code (single backticks)
  cleaned = cleaned.replace(/`([^`\n]+)`/g, "$1");

  // 4. Remove bold, italic, strikethrough, underline markdown wrappers
  // Bold: **text** or __text__
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");
  cleaned = cleaned.replace(/__([^_]+)__/g, "$1");
  // Italic: *text* or _text_
  cleaned = cleaned.replace(/\*([^*]+)\*/g, "$1");
  cleaned = cleaned.replace(/_([^_]+)_/g, "$1");
  // Strikethrough: ~~text~~
  cleaned = cleaned.replace(/~~([^~]+)~~/g, "$1");

  // 5. Remove markdown links while keeping the link text
  // Link: [text](url) -> text
  cleaned = cleaned.replace(/\[([^\]\n]+)\]\([^)\n]+\)/g, "$1");

  // 6. Rewrite robotic AI phrases to natural human writing
  // Case-insensitive replacements of phrases with natural alternatives
  const aiPhrases = [
    { regex: /\bIn conclusion\s*,?/gi, replacement: "Overall," },
    { regex: /\bIt is important to remember that\s*/gi, replacement: "Remember that " },
    { regex: /\bWe must also keep in mind that\s*/gi, replacement: "Keep in mind that " },
    { regex: /\bIt is worth noting that\s*/gi, replacement: "Note that " },
    { regex: /\bIt is crucial to note that\s*/gi, replacement: "Note that " },
    { regex: /\bMoreover\s*,?/gi, replacement: "In addition," },
    { regex: /\bFurthermore\s*,?/gi, replacement: "Also," },
    { regex: /\bAdditionally\s*,?/gi, replacement: "Also," },
    { regex: /\bIn order to\s*/gi, replacement: "To " },
    { regex: /\bAt the end of the day\s*,?/gi, replacement: "Ultimately," },
    { regex: /\bNeedless to say\s*,?/gi, replacement: "Naturally," },
    { regex: /\bIt goes without saying that\s*/gi, replacement: "Clearly," },
    { regex: /\bIn today's fast-paced digital era\s*,?/gi, replacement: "Today," },
    { regex: /\bIn the modern digital landscape\s*,?/gi, replacement: "Today," },
    { regex: /\bIn today's fast-paced world\s*,?/gi, replacement: "Today," },
    { regex: /\bLast but not least\s*,?/gi, replacement: "Finally," },
    { regex: /\bFirst and foremost\s*,?/gi, replacement: "First," },
    { regex: /\bTo put it simply\s*,?/gi, replacement: "Simply put," },
    { regex: /\bOn the other hand\s*,?/gi, replacement: "However," },
    { regex: /\bWith that being said\s*,?/gi, replacement: "Nonetheless," },
    { regex: /\bThat being said\s*,?/gi, replacement: "Nonetheless," },
    { regex: /\bConsequently\s*,?/gi, replacement: "As a result," },
    { regex: /\bIn a world where\s*/gi, replacement: "Where " },
    { regex: /\bA testament to\s*/gi, replacement: "A sign of " },
    { regex: /\bDelve into\s*/gi, replacement: "explore" },
    { regex: /\bNot only does it\s*/gi, replacement: "It " },
  ];

  for (const { regex, replacement } of aiPhrases) {
    cleaned = cleaned.replace(regex, replacement);
  }

  // 7. Fix grammar and punctuation spacing issues
  // Spaces before punctuation
  cleaned = cleaned.replace(/\s+([.,;:!?])/g, "$1");
  // Missing spaces after punctuation
  cleaned = cleaned.replace(/([.,;:!?])([a-zA-Z])/g, "$1 $2");
  // Double punctuation marks (like duplicate commas or periods, but preserving ellipses ...)
  cleaned = cleaned.replace(/([^.])\.{2}(?!\.)/g, "$1.");
  cleaned = cleaned.replace(/,{2,}/g, ",");
  cleaned = cleaned.replace(/\?{2,}/g, "?");
  cleaned = cleaned.replace(/!{2,}/g, "!");

  // 8. Fix spacing: consecutive spaces
  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");

  // 9. Unnecessary blank lines
  // Split into lines to clean them individually and merge/filter blank lines
  let lines = cleaned.split(/\r?\n/);
  
  // Trim spaces on each line
  lines = lines.map(line => line.trim());

  // Filter out excessive consecutive blank lines (max 1 empty line in between)
  const nonExcessiveLines: string[] = [];
  let prevIsEmpty = false;
  for (const line of lines) {
    if (line === "") {
      if (!prevIsEmpty) {
        nonExcessiveLines.push("");
        prevIsEmpty = true;
      }
    } else {
      nonExcessiveLines.push(line);
      prevIsEmpty = false;
    }
  }
  lines = nonExcessiveLines;

  // 10. Merge short paragraphs when appropriate
  // Let's iterate and merge consecutive short paragraphs/lines (e.g., less than 60 chars)
  // which do not represent list items (don't start with digits, bullets, or dashes)
  const mergedLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];

    if (
      line && 
      nextLine && 
      line.length < 60 && 
      nextLine.length < 120 && 
      !/^[•\-\*\d]/.test(line) && 
      !/^[•\-\*\d]/.test(nextLine)
    ) {
      // Merge them together!
      mergedLines.push(line + " " + nextLine);
      i++; // skip next line since it's merged
    } else {
      mergedLines.push(line);
    }
  }

  return mergedLines.join("\n").trim();
}
