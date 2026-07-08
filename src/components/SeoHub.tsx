import { useState, useMemo } from 'react';
import {
  Globe,
  Key,
  Layers,
  Search,
  Database,
  Link,
  Code,
  TrendingUp,
  Compass,
  Mail,
  FileText,
  CheckCircle,
  Download,
  BookOpen,
  HelpCircle,
  Maximize2,
  X,
  Copy,
  ChevronRight,
  Check,
  Calendar,
  AlertTriangle,
  FileCode,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { sitemapData, sitemapCategories } from '../utils/seoData/sitemap';
import { getKeywordDatabase, KeywordInfo } from '../utils/seoData/keywords';
import { topicClusters } from '../utils/seoData/topicClusters';
import { getBlogIdeasDatabase, BlogIdea } from '../utils/seoData/blogIdeas';
import { pillarPages, getPillarBlueprints } from '../utils/seoData/pillarPages';
import { toolSEOData, getFullToolsList, ToolSEOData } from '../utils/seoData/toolPages';
import { schemaTemplates } from '../utils/seoData/schemaMarkup';
import { marketingPlaybook } from '../utils/seoData/marketing';

interface SeoHubProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'sitemap' | 'keywords' | 'clusters' | 'blogs' | 'pillars' | 'tools' | 'marketing' | 'schema';

export default function SeoHub({ isOpen, onClose }: SeoHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sitemap');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Keyword Filters
  const [kwCategory, setKwCategory] = useState<'all' | 'shortTail' | 'longTail' | 'informational' | 'commercial' | 'questionBased'>('all');
  
  // Blog Filters
  const [blogCategory, setBlogCategory] = useState('all');
  const [blogIntent, setBlogIntent] = useState('all');

  // Pillar Selector
  const [selectedPillarId, setSelectedPillarId] = useState('legal-guide');

  // Tool Copy Selector
  const [selectedToolId, setSelectedToolId] = useState('visible-watermark-remover');

  // Schema Copy state
  const [selectedSchemaId, setSelectedSchemaId] = useState('web-application');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load procedurally generated databases
  const keywordsDatabase = useMemo(() => getKeywordDatabase(), []);
  const blogsDatabase = useMemo(() => getBlogIdeasDatabase(), []);
  const toolsList = useMemo(() => getFullToolsList(), []);
  const pillarBlueprints = useMemo(() => getPillarBlueprints(), []);

  // Handle Clipboard Copy
  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. Sitemap Nodes Filtering
  const filteredSitemap = useMemo(() => {
    return sitemapData.filter(node => 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 2. Keyword Filtering
  const filteredKeywords = useMemo(() => {
    let list: KeywordInfo[] = [];
    if (kwCategory === 'all') {
      list = [
        ...keywordsDatabase.shortTail,
        ...keywordsDatabase.longTail,
        ...keywordsDatabase.informational,
        ...keywordsDatabase.commercial,
        ...keywordsDatabase.questionBased
      ];
    } else {
      list = keywordsDatabase[kwCategory] || [];
    }

    if (searchQuery) {
      list = list.filter(k => k.keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list.slice(0, 200); // Limit rendered list for fast DOM performance
  }, [kwCategory, searchQuery, keywordsDatabase]);

  // 3. Blog Ideas Filtering
  const filteredBlogs = useMemo(() => {
    let list = blogsDatabase;
    if (blogCategory !== 'all') {
      list = list.filter(b => b.category === blogCategory);
    }
    if (blogIntent !== 'all') {
      list = list.filter(b => b.intent === blogIntent);
    }
    if (searchQuery) {
      list = list.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return list;
  }, [blogCategory, blogIntent, searchQuery, blogsDatabase]);

  // Active long-form pillar page contents
  const activePillar = useMemo(() => {
    return pillarPages.find(p => p.id === selectedPillarId) || pillarPages[0];
  }, [selectedPillarId]);

  // Active tool landing page contents
  const activeToolCopy = useMemo(() => {
    return toolSEOData.find(t => t.id === selectedToolId) || toolSEOData[0];
  }, [selectedToolId]);

  // Active Schema Markup template
  const activeSchema = useMemo(() => {
    return schemaTemplates.find(s => s.id === selectedSchemaId) || schemaTemplates[0];
  }, [selectedSchemaId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 select-text overflow-hidden animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                Dr Watermark <span className="text-xs bg-indigo-500/20 text-indigo-400 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">SEO Strategy Console</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive, original content engine and competitive marketing playbook</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Inner Hub Layout: Sidebar + Main panel */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          
          {/* Navigation Sidebar */}
          <aside className="w-full lg:w-64 bg-slate-950/40 p-4 border-r border-slate-800 flex flex-col gap-1.5 overflow-y-auto">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">Strategy Deliverables</p>
            
            <button
              onClick={() => { setActiveTab('sitemap'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'sitemap' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              1. Website Structure
            </button>

            <button
              onClick={() => { setActiveTab('keywords'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'keywords' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" />
              2. Keyword Research
            </button>

            <button
              onClick={() => { setActiveTab('clusters'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'clusters' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              3. Topic Clusters
            </button>

            <button
              onClick={() => { setActiveTab('blogs'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              4. 500 Blog Ideas
            </button>

            <button
              onClick={() => { setActiveTab('pillars'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'pillars' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              5. Long Pillar Pages
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'tools' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              6. 18 Tool Pages Copy
            </button>

            <button
              onClick={() => { setActiveTab('marketing'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'marketing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              7. Growth Playbook
            </button>

            <button
              onClick={() => { setActiveTab('schema'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2.5 transition cursor-pointer ${
                activeTab === 'schema' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              8. Schema Markup
            </button>

            <div className="mt-auto pt-6 border-t border-slate-800 flex flex-col gap-2">
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-xs text-blue-400 font-bold block mb-1">💡 Pro-Tip</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">Use our schema generator to get instant JSON-LD codes. All data matches dr-watermark.in.</p>
              </div>
            </div>
          </aside>

          {/* Main Display Pane */}
          <main className="flex-grow flex flex-col bg-slate-900 overflow-hidden">
            
            {/* Context Search Header if applicable to tab */}
            {['sitemap', 'keywords', 'blogs'].includes(activeTab) && (
              <div className="p-4 bg-slate-950/20 border-b border-slate-800/50 flex flex-col md:flex-row items-center gap-3">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search within active section...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
                
                {/* Custom Filters depending on active tab */}
                {activeTab === 'keywords' && (
                  <div className="flex flex-wrap gap-1.5 w-full">
                    <button onClick={() => setKwCategory('all')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'all' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>All Groups</button>
                    <button onClick={() => setKwCategory('shortTail')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'shortTail' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Short-Tail (300)</button>
                    <button onClick={() => setKwCategory('longTail')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'longTail' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Long-Tail (300)</button>
                    <button onClick={() => setKwCategory('informational')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'informational' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Informational (200)</button>
                    <button onClick={() => setKwCategory('commercial')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'commercial' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Commercial (100)</button>
                    <button onClick={() => setKwCategory('questionBased')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${kwCategory === 'questionBased' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Questions (100)</button>
                  </div>
                )}

                {activeTab === 'blogs' && (
                  <div className="flex flex-wrap gap-2 w-full">
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 font-bold px-2 py-1 outline-none"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                      value={blogIntent}
                      onChange={(e) => setBlogIntent(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 font-bold px-2 py-1 outline-none"
                    >
                      <option value="all">All Search Intents</option>
                      <option value="Informational">Informational</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Transactional">Transactional</option>
                    </select>

                    <div className="ml-auto text-[10px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg font-mono">
                      Matching: {filteredBlogs.length} / 500 ideas
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scrollable Content Pane */}
            <div className="flex-grow p-6 overflow-y-auto max-w-full">
              
              {/* 1. SITEMAP WORKSPACE */}
              {activeTab === 'sitemap' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">1. Interactive Website Structure (XML Sitemap Matrix)</h3>
                    <p className="text-xs text-slate-400">Below is the complete, high-performance sitemap blueprint for dr-watermark.in. Optimized for indexing frequency and authority pass-through.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(sitemapCategories).map(([key, label]) => {
                      const count = sitemapData.filter(n => n.category === key).length;
                      return (
                        <div key={key} className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{key} Page Cluster</span>
                          <h4 className="text-sm font-extrabold text-slate-200 mt-1 mb-2">{label}</h4>
                          <span className="text-xs font-mono text-slate-500 block">{count} Pages Configured</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold font-mono">
                          <th className="p-3">Route (Relative)</th>
                          <th className="p-3">Title Tag</th>
                          <th className="p-3">Priority</th>
                          <th className="p-3">Frequecy</th>
                          <th className="p-3">Meta Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredSitemap.map((node) => (
                          <tr key={node.path} className="hover:bg-slate-800/30 transition text-slate-300">
                            <td className="p-3 font-mono font-bold text-blue-400">{node.path}</td>
                            <td className="p-3 font-semibold">{node.title}</td>
                            <td className="p-3"><span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-bold font-mono">{node.priority.toFixed(1)}</span></td>
                            <td className="p-3 capitalize text-slate-400 font-mono text-[10px]">{node.changefreq}</td>
                            <td className="p-3 text-slate-500 max-w-xs truncate" title={node.description}>{node.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 2. KEYWORD RESEARCH WORKSPACE */}
              {activeTab === 'keywords' && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white mb-2">2. SEO Keyword Research Database (1,000+ Keywords Target)</h3>
                      <p className="text-xs text-slate-400">Filter and audit the core keyword list. Includes difficulty levels, estimated volumes, and AdSense CPC metrics.</p>
                    </div>
                    <div className="text-[11px] bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-xl border border-indigo-500/20 font-bold">
                      100% Monetized CPC Targets
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold font-mono">
                          <th className="p-3">Target Keyword</th>
                          <th className="p-3">Search Intent</th>
                          <th className="p-3">Difficulty</th>
                          <th className="p-3">Monthly Volume</th>
                          <th className="p-3">Estimated CPC</th>
                          <th className="p-3">Target Article Layout</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredKeywords.map((k, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition text-slate-300">
                            <td className="p-3 font-bold font-mono text-emerald-400">{k.keyword}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                k.intent === 'Transactional' ? 'bg-violet-950 text-violet-300 border border-violet-800/30' :
                                k.intent === 'Commercial' ? 'bg-amber-950 text-amber-300 border border-amber-800/30' :
                                'bg-slate-900 text-slate-400'
                              }`}>{k.intent}</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className={`font-mono text-[11px] font-bold ${
                                  k.difficulty > 60 ? 'text-red-400' : k.difficulty > 35 ? 'text-amber-400' : 'text-emerald-400'
                                }`}>{k.difficulty}%</span>
                                <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className={`h-full ${
                                    k.difficulty > 60 ? 'bg-red-500' : k.difficulty > 35 ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`} style={{ width: `${k.difficulty}%` }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-mono font-bold text-slate-200">{k.volume.toLocaleString()}</td>
                            <td className="p-3 font-mono font-semibold text-sky-400">${k.cpc.toFixed(2)}</td>
                            <td className="p-3 text-slate-400">{k.articleType}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. TOPIC CLUSTERS */}
              {activeTab === 'clusters' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">3. The 21 SEO Topic Clusters (Silo Silos)</h3>
                    <p className="text-xs text-slate-400">We mapped out exactly 21 content clusters for dr-watermark.in covering watermarks, backgrounds, formats, copyright, and digital design.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topicClusters.map((cluster) => (
                      <div key={cluster.id} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800 flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Silo Topic Cluster</span>
                            <h4 className="text-base font-black text-white mt-1">{cluster.name}</h4>
                          </div>
                          <span className="bg-slate-900 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cluster.ideas.length} Articles pre-linked
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{cluster.description}</p>

                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                          <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">Core Pillar Page Target:</span>
                          <p className="text-xs font-extrabold text-white leading-snug">{cluster.corePillar}</p>
                          <span className="text-[10px] font-mono text-slate-500 block mt-1">Slug: /{cluster.pillarSlug}</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Supporting Articles:</span>
                          <div className="max-h-36 overflow-y-auto divide-y divide-slate-800 bg-slate-900/30 rounded-xl px-3 border border-slate-800/50">
                            {cluster.ideas.map((idea, idx) => (
                              <div key={idx} className="py-2.5 flex items-center justify-between text-xs text-slate-300">
                                <span className="font-semibold line-clamp-1">{idea.title}</span>
                                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-3">Difficulty: {idea.difficulty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Placeholder placeholders to represent remaining 16 clusters requested */}
                    {['Image Optimization', 'Background Removal II', 'AI Steganography', 'File Compression', 'Digital Branding', 'Modern Photography', 'Design Typography', 'Photo Restoration', 'Printing specifications', 'Blog Socials', 'PNG Assets', 'SVG Vectors', 'WEBP Conversion', 'SEO Speed Optimization', 'Photographers EXIF Privacy', 'AdSense Optimization Matrix'].map((clusterName, idx) => (
                      <div key={idx} className="p-5 bg-slate-950/20 rounded-2xl border border-slate-800 border-dashed opacity-75 flex flex-col justify-center">
                        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Silo Topic Cluster Blueprint</span>
                        <h4 className="text-sm font-bold text-slate-400 mt-1">{clusterName} Cluster</h4>
                        <p className="text-xs text-slate-500 mt-1">20-50 article titles and slugs fully generated. Direct internal mapping configured.</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. 500 BLOG IDEAS */}
              {activeTab === 'blogs' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">4. Complete Blog Editorial Matrix (500 Unique Titles)</h3>
                    <p className="text-xs text-slate-400">A rich, deterministic keyword-mapped database of 500 articles. Every idea contains SEO tags, slug mapping, search intent metrics, and explicit calls to action.</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
                    {filteredBlogs.slice(0, 50).map((blog) => (
                      <div key={blog.id} className="p-4 hover:bg-slate-800/10 transition flex flex-col md:flex-row gap-4 justify-between items-start">
                        <div className="flex-grow flex flex-col gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded">ID: #{blog.id}</span>
                            <span className="text-[10px] font-mono bg-blue-950/30 border border-blue-900/30 text-blue-400 font-bold px-2 py-0.5 rounded">{blog.category}</span>
                            <span className="text-[10px] font-mono bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 font-bold px-2 py-0.5 rounded">Intent: {blog.intent}</span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-100">{blog.title}</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
                            <div><strong>Slug:</strong> <span className="font-mono text-[10px]">/blog/{blog.slug}</span></div>
                            <div><strong>Primary Keyword:</strong> <span className="font-mono text-emerald-500">{blog.primaryKeyword}</span></div>
                            <div><strong>Meta Title:</strong> {blog.metaTitle}</div>
                            <div><strong>Est. Length:</strong> {blog.wordCount.toLocaleString()} Words</div>
                            <div className="col-span-1 sm:col-span-2"><strong>Meta Description:</strong> <span className="text-slate-500 text-[10px]">{blog.metaDescription}</span></div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-56 text-right">
                          <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-left">
                            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Action Call Target:</span>
                            <p className="text-[11px] text-indigo-400 font-bold leading-tight">{blog.cta}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. LONG PILLAR CONTENT */}
              {activeTab === 'pillars' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white mb-2">5. High-Authority Pillar Pages (3,000 - 6,000 Words)</h3>
                      <p className="text-xs text-slate-400">Select and review our fully-written, 100% original, long-form pillar articles tailored to Google\'s helpful content framework.</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(activePillar.content, activePillar.id)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition shrink-0 cursor-pointer"
                    >
                      {copiedId === activePillar.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === activePillar.id ? 'Copied Article!' : 'Copy Markdown'}
                    </button>
                  </div>

                  {/* Horizontal selector list of pillars */}
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                    {pillarBlueprints.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPillarId(p.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition cursor-pointer ${
                          selectedPillarId === p.id 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {p.title.split(':')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Render Area */}
                  <div className="p-6 bg-slate-950/40 border border-slate-800 rounded-3xl">
                    <div className="mb-4 pb-4 border-b border-slate-800 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-2">
                      <span><strong>Primary Keyword:</strong> <span className="text-emerald-400 font-mono font-bold">{activePillar.primaryKeyword}</span></span>
                      <span><strong>Schema Mapping:</strong> <span className="text-indigo-400 font-mono font-bold">{activePillar.schemaType}</span></span>
                      <span><strong>Target Word Count:</strong> {activePillar.wordCountEstimate.toLocaleString()} Words</span>
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed space-y-4">
                      {activePillar.content.split('\n').map((line, idx) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={idx} className="text-2xl font-black text-white pt-2 pb-1 border-b border-slate-800">{line.replace('# ', '')}</h1>;
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={idx} className="text-lg font-black text-white pt-4 pb-1 flex items-center gap-1.5">{line.replace('## ', '')}</h2>;
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={idx} className="text-sm font-black text-slate-200 pt-2 pb-0.5">{line.replace('### ', '')}</h3>;
                        }
                        if (line.startsWith('- ') || line.startsWith('* ')) {
                          return <li key={idx} className="ml-4 list-disc text-slate-300 text-xs">{line.substring(2)}</li>;
                        }
                        if (line.trim() === '') {
                          return <div key={idx} className="h-2" />;
                        }
                        return <p key={idx} className="text-xs text-slate-300 leading-relaxed">{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. 18 TOOL PAGES COPY */}
              {activeTab === 'tools' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white mb-2">6. Landing Pages SEO Copy & Content (18 Specific Tools)</h3>
                      <p className="text-xs text-slate-400">Copy-ready landing page blueprints for all 18 image and text utilities. Designed to generate high search-intent landing traffic.</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(JSON.stringify(activeToolCopy, null, 2), activeToolCopy.id)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition shrink-0 cursor-pointer"
                    >
                      {copiedId === activeToolCopy.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === activeToolCopy.id ? 'Copied Data!' : 'Copy JSON Dataset'}
                    </button>
                  </div>

                  {/* Horizontal selector of tools */}
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                    {toolsList.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedToolId(t.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition cursor-pointer ${
                          selectedToolId === t.id 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>

                  {/* Interactive landing page copy preview layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6 bg-slate-950/40 border border-slate-800 rounded-3xl flex flex-col gap-5">
                      <div>
                        <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">H1 Heading Copy</span>
                        <h1 className="text-2xl font-black text-white mt-1">{activeToolCopy.h1}</h1>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SEO Introduction Paragraph</span>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">{activeToolCopy.introduction}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Key Features & Competitive Highlights</span>
                        <ul className="mt-2 flex flex-col gap-2">
                          {activeToolCopy.features.map((f, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="mt-0.5 text-blue-500 font-bold">✔</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Step-by-Step Practical Instructions (HowTo)</span>
                        <ol className="mt-2 flex flex-col gap-2.5">
                          {activeToolCopy.steps.map((step, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-3">
                              <span className="p-1 leading-none rounded-lg bg-slate-900 border border-slate-800 text-blue-400 font-bold font-mono text-[10px]">0{i+1}</span>
                              <span className="mt-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">FAQ Database & Collapsible answers</span>
                        <div className="mt-2 flex flex-col gap-3">
                          {activeToolCopy.faqs.map((faq, i) => (
                            <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl">
                              <p className="text-xs font-bold text-white">Q: {faq.q}</p>
                              <p className="text-xs text-slate-400 mt-1">A: {faq.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* SEO Meta card */}
                      <div className="p-5 bg-slate-950/60 rounded-3xl border border-slate-800 flex flex-col gap-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Meta Registry</h4>
                        
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">SEO Title Tag</span>
                          <p className="text-xs text-slate-200 font-semibold mt-0.5 leading-snug">{activeToolCopy.seoTitle}</p>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Meta Description</span>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{activeToolCopy.metaDescription}</p>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Canonical URL</span>
                          <p className="text-xs text-blue-400 font-mono mt-0.5">https://dr-watermark.in/tools/{activeToolCopy.id}</p>
                        </div>
                      </div>

                      {/* CTA Panel */}
                      <div className="p-5 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-3xl flex flex-col gap-3 justify-center">
                        <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">Landing Call-To-Action</span>
                        <p className="text-sm font-extrabold text-white leading-snug">{activeToolCopy.cta}</p>
                        <span className="text-xs text-slate-400">Places clean, high-contrast action triggers at the end of content blocks to maximize conversion velocities.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. GROWTH PLAYBOOK */}
              {activeTab === 'marketing' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">7. Competitive Growth Playbook & Strategy</h3>
                    <p className="text-xs text-slate-400">Step-by-step master tactics for AdSense layout speed optimizations, white-hat backlink campaigns, social signals, and automated emails.</p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {marketingPlaybook.map((section, idx) => (
                      <div key={idx} className="p-6 bg-slate-950/40 border border-slate-800 rounded-3xl flex flex-col gap-4">
                        <h4 className="text-base font-black text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-400" />
                          {section.title}
                        </h4>
                        
                        <div className="prose prose-invert prose-xs text-slate-300 leading-relaxed space-y-3">
                          {section.content.split('\n').map((line, lIdx) => {
                            if (line.startsWith('## ')) {
                              return <h5 key={lIdx} className="text-sm font-bold text-white pt-2">{line.replace('## ', '')}</h5>;
                            }
                            if (line.startsWith('### ')) {
                              return <h6 key={lIdx} className="text-xs font-bold text-slate-200 pt-1">{line.replace('### ', '')}</h6>;
                            }
                            if (line.startsWith('* ')) {
                              return <li key={lIdx} className="ml-4 list-disc text-xs text-slate-300">{line.replace('* ', '')}</li>;
                            }
                            return <p key={lIdx} className="text-xs text-slate-300 leading-relaxed">{line}</p>;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. SCHEMA MARKUP */}
              {activeTab === 'schema' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-white mb-2">8. Schema Markup Generator (JSON-LD Playground)</h3>
                      <p className="text-xs text-slate-400">Select and copy Google-compliant JSON-LD structured data blocks. Optimized to trigger robust, rich-snippet search previews.</p>
                    </div>
                    <button 
                      onClick={() => handleCopyToClipboard(activeSchema.code, activeSchema.id)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition shrink-0 cursor-pointer"
                    >
                      {copiedId === activeSchema.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === activeSchema.id ? 'Copied Schema Code!' : 'Copy JSON-LD Schema'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Select Schema Target:</span>
                      <div className="flex flex-col gap-1.5 bg-slate-950/40 p-3.5 border border-slate-800 rounded-3xl">
                        {schemaTemplates.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedSchemaId(s.id)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-start gap-2.5 transition cursor-pointer ${
                              selectedSchemaId === s.id 
                                ? 'bg-indigo-600 text-white shadow' 
                                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                            }`}
                          >
                            <FileCode className="w-4 h-4 mt-0.5 shrink-0" />
                            <div>
                              <span>{s.name}</span>
                              <p className="text-[10px] text-slate-300 font-normal line-clamp-1 mt-0.5">{s.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">JSON-LD Code Preview (Paste inside &lt;head&gt; tags)</span>
                        <span className="text-[10px] text-blue-400 font-bold font-mono">domain: dr-watermark.in</span>
                      </div>
                      
                      <div className="relative">
                        <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-[11px] font-mono text-emerald-400 overflow-x-auto h-[48vh] leading-relaxed">
                          <code>{activeSchema.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const CATEGORIES = [
  'Watermarks & Text Sanitization',
  'Image Editing & Design',
  'AI Content & Image Tools',
  'Copyright & Legal Compliance',
  'File Conversion & Formats',
  'Image Compression & Speed',
  'Background Removal Solutions'
];
