
import React, { useState } from 'react';
import { generateGeoArticle } from '../services/geminiService';
import { Sparkles, Send, Loader2, Copy, Check, ChevronLeft } from 'lucide-react';

const ContentCreator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('Deepseek');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setResult('');
    try {
      const article = await generateGeoArticle(keyword, platform, length);
      setResult(article);
    } catch (error) {
      alert("生成失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center space-x-2 text-slate-400 mb-2">
        <ChevronLeft size={16} />
        <span className="text-sm">返回工作台</span>
      </div>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">AI 智能 GEO 创作</h2>
            <p className="text-slate-500">基于全球主流大模型生成的搜索友好型内容</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">核心关键词</label>
            <input 
              type="text" 
              placeholder="例如: 如何优化移动端SEO"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">目标优化平台</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Deepseek (通用全能)</option>
              <option>KIMI (长文本解析)</option>
              <option>豆包 (生活百科)</option>
              <option>Perplexity (即时搜索)</option>
              <option>小红书 (种草文案)</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700">创作长度</label>
            <div className="flex space-x-4">
              {['short', 'medium', 'long'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l as any)}
                  className={`flex-1 py-2 rounded-xl border font-medium transition-all ${
                    length === l 
                    ? 'bg-violet-600 text-white border-violet-600 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {l === 'short' ? '短文 (500字)' : l === 'medium' ? '标准 (1000字)' : '长文 (2000字+)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !keyword}
          className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-200 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>立即开始创作</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-800">创作结果预览</h3>
            <div className="flex space-x-2">
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-2"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                <span className="text-sm">{copied ? '已复制' : '复制代码'}</span>
              </button>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors">
                发布至全平台
              </button>
            </div>
          </div>
          <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-200 max-h-[600px] overflow-y-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentCreator;
