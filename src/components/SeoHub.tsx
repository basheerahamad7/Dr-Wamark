import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  X,
  Copy,
  Check,
  ChevronRight,
  FileText,
  ArrowLeft,
  Sparkles,
  Shield,
  Key,
  EyeOff,
  Layers,
  Heart,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { pillarPages, getPillarBlueprints, PillarPage } from '../utils/seoData/pillarPages';

interface SeoHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'All Guides',
  'Copyright & Legal Compliance',
  'Watermarks & Text Sanitization',
  'Image Editing & Design',
  'AI Content & Image Tools',
  'Image Compression & Speed',
  'Background Removal Solutions',
  'File Conversion & Formats'
];

export default function SeoHub({ isOpen, onClose }: SeoHubProps) {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top of article when reading view opens
  useEffect(() => {
    if (activeArticleId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeArticleId]);

  // Load and enrich articles list
  const enrichedArticles = useMemo(() => {
    const blueprints = getPillarBlueprints();
    return pillarPages.map(page => {
      const meta = blueprints.find(b => b.id === page.id);
      return {
        ...page,
        category: meta ? meta.category : 'General',
        description: meta ? meta.description : page.metaDescription,
        readingTime: Math.max(3, Math.round(page.wordCountEstimate / 400))
      };
    });
  }, []);

  const handleSelectArticle = (id: string | null) => {
    setActiveArticleId(id);
    if (typeof window !== 'undefined') {
      if (id) {
        const art = enrichedArticles.find(a => a.id === id);
        if (art) {
          window.history.pushState(null, '', `/blog/${art.slug}`);
        }
      } else {
        window.history.pushState(null, '', '/blog');
      }
    }
  };

  // Sync state from URL pathname when SeoHub is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/blog/')) {
        const slug = path.substring(6);
        const art = enrichedArticles.find(a => a.slug === slug);
        if (art) {
          setActiveArticleId(art.id);
        } else {
          setActiveArticleId(null);
        }
      } else if (path === '/blog' || path === '/blog/') {
        setActiveArticleId(null);
      } else {
        window.history.pushState(null, '', '/blog');
      }
    }
  }, [isOpen, enrichedArticles]);

  // Filter articles by category and search query
  const filteredArticles = useMemo(() => {
    return enrichedArticles.filter(art => {
      const matchesCategory = selectedCategory === 'All Guides' || art.category === selectedCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [enrichedArticles, selectedCategory, searchQuery]);

  // Active reading article
  const activeArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return enrichedArticles.find(art => art.id === activeArticleId) || null;
  }, [activeArticleId, enrichedArticles]);

  // Featured article (always pick the legal-guide or text-watermarks to showcase at the top)
  const featuredArticle = useMemo(() => {
    return enrichedArticles.find(art => art.id === 'legal-guide') || enrichedArticles[0];
  }, [enrichedArticles]);

  // Copy article text to clipboard
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Icon mapping for categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Copyright & Legal Compliance':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Watermarks & Text Sanitization':
        return <EyeOff className="w-4 h-4 text-sky-400" />;
      case 'AI Content & Image Tools':
        return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'Image Compression & Speed':
        return <Layers className="w-4 h-4 text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  // Custom JSX renderer for Markdown formatted text
  const renderMarkdownToJSX = (content: string) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    const elements: React.ReactNode[] = [];

    const parseInlineStyles = (text: string) => {
      // Bold **text** parsing
      const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
      return parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-extrabold text-white">{part}</strong>;
        }
        // Inline code `code` parsing
        const subParts = part.split(/`([\s\S]*?)`/g);
        return subParts.map((subPart, j) => {
          if (j % 2 === 1) {
            return (
              <code key={j} className="px-1.5 py-0.5 rounded bg-slate-950 font-mono text-[11px] text-pink-400 border border-slate-800">
                {subPart}
              </code>
            );
          }
          return subPart;
        });
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle multi-line code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${i}`} className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto font-mono text-xs text-blue-300 my-4 leading-relaxed">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          );
          codeBlockLines = [];
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      // Handle horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-800" />);
        continue;
      }

      // Handle blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-blue-500 bg-slate-950/40 px-4 py-3 rounded-r-xl text-slate-300 italic my-4 text-xs leading-relaxed">
            {parseInlineStyles(line.replace('> ', ''))}
          </blockquote>
        );
        continue;
      }

      // Handle headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-black text-white mt-6 mb-4 tracking-tight border-b border-slate-800/60 pb-2">
            {line.replace('# ', '')}
          </h1>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-lg md:text-xl font-bold text-white mt-6 mb-3 tracking-tight flex items-center gap-2">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-sm md:text-base font-bold text-slate-200 mt-4 mb-2 tracking-tight">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      // Handle bullet lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={`li-${i}`} className="ml-5 list-disc text-slate-300 text-xs md:text-sm leading-relaxed mb-1">
            {parseInlineStyles(line.substring(2))}
          </li>
        );
        continue;
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        const cleanLine = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={`ol-${i}`} className="ml-5 list-decimal text-slate-300 text-xs md:text-sm leading-relaxed mb-1.5">
            {parseInlineStyles(cleanLine)}
          </li>
        );
        continue;
      }

      // Empty line spacer
      if (line.trim() === '') {
        elements.push(<div key={`space-${i}`} className="h-3" />);
        continue;
      }

      // Standard paragraphs
      elements.push(
        <p key={`p-${i}`} className="text-xs md:text-sm text-slate-300 leading-relaxed my-3">
          {parseInlineStyles(line)}
        </p>
      );
    }

    return elements;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 select-text overflow-hidden animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
                Dr Watermark <span className="text-xs bg-blue-500/10 text-blue-400 font-bold px-2 py-0.5 rounded-full border border-blue-500/20">Blog &amp; Knowledge Base</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Expert guides on digital privacy, copyright law, steganography, and image optimization.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Contextual Search */}
            {!activeArticleId && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs">
                    Clear
                  </button>
                )}
              </div>
            )}
            
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
              title="Close Hub"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Filter Sidebar */}
          {!activeArticleId && (
            <aside className="w-full lg:w-64 bg-slate-950/30 p-4 border-r border-slate-800/80 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto shrink-0 scrollbar-none">
              <p className="hidden lg:block text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Categories</p>
              
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </button>
              ))}

              <div className="hidden lg:flex mt-auto p-4 bg-gradient-to-br from-slate-950/60 to-slate-900 rounded-2xl border border-slate-800/80 flex-col gap-2">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">Privacy Focused</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All cleaning is computed on-device. Read our guides to learn about local encryption and client-side web integrity.
                </p>
              </div>
            </aside>
          )}

          {/* Main Display Pane */}
          <main ref={scrollContainerRef} className="flex-grow overflow-y-auto bg-slate-900/60 p-4 md:p-6 lg:p-8">
            
            {/* 1. READING VIEW */}
            {activeArticle ? (
              <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
                
                {/* Upper toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                  <button
                    onClick={() => handleSelectArticle(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Blog Hub
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyToClipboard(activeArticle.content)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied Article!' : 'Copy Markdown'}
                    </button>
                  </div>
                </div>

                {/* Article Header Metadata */}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap text-xs text-slate-400 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px]">
                      {activeArticle.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeArticle.readingTime} min read
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                      kw: {activeArticle.primaryKeyword}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800/50">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600">
                      DW
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Dr Watermark Editorial Team</p>
                      <p className="text-[10px] text-slate-400">Technical Writer & Privacy Advocate</p>
                    </div>
                  </div>
                </div>

                {/* Article Content Render Area */}
                <article className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300 leading-relaxed border-b border-slate-800/80 pb-8">
                  {renderMarkdownToJSX(activeArticle.content)}
                </article>

                {/* Call To Action Box */}
                <div className="p-6 bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-grow text-center md:text-left">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">Interactive Sanitization Tool</span>
                    <h4 className="text-base font-extrabold text-white">Detect &amp; Remove Unicode Steganography</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-lg">
                      Ready to check your payloads? Try our 100% secure, browser-based sanitizer tool to strip hidden zero-width trackers instantly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      // Smooth scroll to workspace
                      const elem = document.getElementById('workspace-section');
                      if (elem) {
                        elem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition shrink-0 shadow-lg shadow-blue-600/10 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Open Sanitizer Workspace
                  </button>
                </div>
              </div>
            ) : (
              // 2. BLOG INDEX / HOME PAGE
              <div className="flex flex-col gap-8">
                
                {/* Featured Post Header (Only when category is 'All Guides' and search query is empty) */}
                {selectedCategory === 'All Guides' && !searchQuery && (
                  <section className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-xl">
                    <div className="flex-grow flex flex-col gap-4">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-wider">
                          Featured Article
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          13 min read
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-2xl">
                        {featuredArticle.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleSelectArticle(featuredArticle.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          Read Article
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <span className="text-[11px] font-mono text-emerald-400">Target Keyword: &ldquo;{featuredArticle.primaryKeyword}&rdquo;</span>
                      </div>
                    </div>
                  </section>
                )}

                {/* Articles List / Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {selectedCategory} ({filteredArticles.length} Guides Available)
                    </h4>
                  </div>

                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {filteredArticles.map((art) => (
                        <article
                          key={art.id}
                          className="bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/60 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 group shadow-sm hover:shadow-md"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 font-bold text-[9px] uppercase">
                                {art.category}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                <Clock className="w-3 h-3" />
                                {art.readingTime} min read
                              </span>
                            </div>

                            <h5 className="text-sm md:text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 leading-snug">
                              {art.title}
                            </h5>

                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {art.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/40 flex items-center justify-between">
                            <button
                              onClick={() => handleSelectArticle(art.id)}
                              className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              Read Full Article
                              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                            <span className="text-[9px] font-mono text-slate-600 font-bold">#{art.id}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-950/20 border border-slate-800 border-dashed rounded-3xl">
                      <p className="text-sm text-slate-400">No articles found matching &ldquo;{searchQuery}&rdquo;</p>
                      <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All Guides'); }}
                        className="mt-3 text-xs font-bold text-blue-400 hover:text-blue-300"
                      >
                        Reset Search &amp; Category Filters
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
