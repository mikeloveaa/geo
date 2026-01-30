
import React, { useState } from 'react';
// Fix: Added Plus to the imported icons from lucide-react
import { Copy, Trash2, Info, CheckSquare, Square, Plus } from 'lucide-react';

const KeywordTool: React.FC = () => {
  const [columns, setColumns] = useState({
    A: '市面上\n行业内\n市场\n目前\n国内',
    B: '口碑好的\n比较好的\n靠谱的\n有实力的\n可信的',
    C: '洗地机', // Main required
    D: '品牌\n公司\n工厂\n厂家\n厂商\n生产厂家\n源头厂家\n批发厂家\n供应厂家\n供应商',
    E: '推荐\n排行\n推荐榜\n排行榜\n推荐榜单\n排行榜单\n推荐排行榜\n推荐排行\n推荐排行榜单\n口碑推荐',
    F: '哪家好\n哪家强\n哪家靠谱\n哪家权威\n哪个好\n哪家专业\n哪家可靠\n有哪些\n找哪家\n选哪家'
  });

  const patterns = ['C+D', 'A+C+D', 'B+C+D', 'A+B+C+D', 'C+D+E', 'C+D+F', 'A+C+D+E', 'B+C+D+E', 'A+B+C+D+E', 'A+B+C+D+F'];
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const togglePattern = (pattern: string) => {
    setSelectedPatterns(prev => 
      prev.includes(pattern) ? prev.filter(p => p !== pattern) : [...prev, pattern]
    );
  };

  const selectAllPatterns = () => setSelectedPatterns([...patterns]);
  const deselectAllPatterns = () => setSelectedPatterns([]);

  const generateKeywords = () => {
    if (selectedPatterns.length === 0) {
      alert("请至少选择一个组合方式");
      return;
    }

    const allGenerated = new Set<string>();

    selectedPatterns.forEach(pattern => {
      const parts = pattern.split('+');
      const lists = parts.map(p => 
        columns[p as keyof typeof columns]
          .split('\n')
          .map(s => s.trim())
          .filter(x => x.length > 0)
      );
      
      // If any required list is empty, this pattern generates nothing
      if (lists.some(list => list.length === 0)) return;

      // Cartesian product for this specific pattern
      let combined: string[] = [''];
      lists.forEach(list => {
        const next: string[] = [];
        combined.forEach(prefix => {
          list.forEach(item => {
            next.push(prefix + item);
          });
        });
        combined = next;
      });

      combined.forEach(k => allGenerated.add(k));
    });

    setResults(Array.from(allGenerated));
  };

  const copyToClipboard = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join('\n'));
    alert("已成功复制到剪贴板");
  };

  return (
    <div className="space-y-6">
      {/* Input Areas A-F */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { id: 'A', label: 'A 前缀 1', color: 'bg-indigo-500' },
          { id: 'B', label: 'B 前缀 2', color: 'bg-blue-500' },
          { id: 'C', label: 'C 主词 *', color: 'bg-violet-500' },
          { id: 'D', label: 'D 通义词', color: 'bg-emerald-500' },
          { id: 'E', label: 'E 推荐词', color: 'bg-indigo-500' },
          { id: 'F', label: 'F 疑问词', color: 'bg-blue-600' }
        ].map(col => (
          <div key={col.id} className="flex flex-col h-full group">
            <div className={`${col.color} text-white text-[11px] font-bold py-2.5 px-3 rounded-t-xl text-center shadow-sm`}>
              {col.label}
            </div>
            <textarea
              className="flex-1 min-h-[220px] border border-slate-200 border-t-0 rounded-b-xl p-3 text-[13px] leading-relaxed text-slate-600 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-400 outline-none resize-none transition-all scrollbar-thin scrollbar-thumb-slate-200"
              value={columns[col.id as keyof typeof columns]}
              onChange={(e) => setColumns({...columns, [col.id]: e.target.value})}
              placeholder="每行一个词"
            />
          </div>
        ))}
      </div>

      {/* Pattern Selection */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm border-t-4 border-t-violet-500">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
            <CheckSquare size={16} className="text-violet-500" />
            组合方式选择
          </h3>
          <div className="flex space-x-4">
            <button onClick={selectAllPatterns} className="text-[11px] font-bold text-violet-600 hover:text-violet-700 transition-colors">全选</button>
            <button onClick={deselectAllPatterns} className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">取消全选</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {patterns.map(pattern => (
            <button
              key={pattern}
              onClick={() => togglePattern(pattern)}
              className={`px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm transition-all border ${
                selectedPatterns.includes(pattern)
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-transparent scale-105'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-violet-200 hover:bg-slate-50'
              }`}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons & Results */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[350px] relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={generateKeywords}
              className="bg-cyan-400 text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-cyan-100 hover:brightness-105 active:scale-95 transition-all"
            >
              生成关键词
            </button>
            <button 
              onClick={copyToClipboard}
              disabled={results.length === 0}
              className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:shadow-none"
            >
              <Copy size={16} /> <span>复制结果</span>
            </button>
            <button 
              onClick={() => { setResults([]); deselectAllPatterns(); }}
              className="bg-rose-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-100 hover:brightness-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <Trash2 size={16} /> <span>清空所有</span>
            </button>
          </div>
          <div className="bg-cyan-50 text-cyan-600 border border-cyan-100 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {results.length} 条结果
          </div>
        </div>

        {results.length === 0 ? (
          <div className="absolute inset-0 top-24 flex flex-col items-center justify-center text-slate-300 space-y-4">
            <div className="p-4 rounded-full bg-slate-50">
              <Plus size={32} />
            </div>
            <p className="text-sm font-medium italic">请至少输入 C 区核心关键词并选择组合方式来生成关键词</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
            {results.map((res, i) => (
              <div 
                key={i} 
                className="bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-[11px] text-slate-600 truncate hover:border-violet-300 hover:bg-white transition-all cursor-default"
                title={res}
              >
                {res}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instruction Box */}
      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 border-l-4 border-l-blue-400">
        <h4 className="flex items-center space-x-2 text-blue-500 font-bold mb-4">
          <Info size={18} />
          <span>使用说明</span>
        </h4>
        <ul className="text-xs text-slate-400 space-y-3 list-disc pl-5 leading-loose">
          <li>在 <strong className="text-slate-500">ABCDEF</strong> 区域的文本框中输入关键词，每行一个关键词。</li>
          <li><strong className="text-violet-500 underline decoration-violet-200">C 区核心关键词是必需的</strong>，必须至少输入一个，否则组合将没有主语。</li>
          <li>在“组合方式选择”中，点击具体的按钮或使用“全选”来快速勾选生成的组合模式。</li>
          <li>点击“<span className="text-cyan-600 font-bold">生成关键词</span>”按钮，系统将根据选中的所有模式合并生成最终词库并自动去重。</li>
          <li>生成后可一键“复制结果”到剪贴板，方便在 SEO 工具或发布任务中使用。</li>
          <li>如有需要，点击“清空所有”重置所有输入及选项。</li>
        </ul>
      </div>
    </div>
  );
};

export default KeywordTool;
