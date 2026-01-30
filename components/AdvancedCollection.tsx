
import React, { useState } from 'react';
import { RefreshCw, Save, Send, Eye, Copy, Info } from 'lucide-react';

const AdvancedCollection: React.FC = () => {
  const [config, setConfig] = useState({
    A: '', B: '', C: '', D: '', E: '', F: ''
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/50 p-4 border-l-4 border-blue-500 rounded-r-xl">
        <p className="text-xs text-blue-700 leading-relaxed">
          配置以下搭配，在查询收录时，会<span className="font-bold underline">节约查询费用</span>、并<span className="font-bold underline">报表附带截图</span>
          <br />攻略：如需查询固定的长尾词，把长尾词一行一个复制到C区，其他区域不要填即可
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: 'A', label: 'A 前缀/地区', color: 'bg-red-500' },
          { id: 'B', label: 'B 前缀/形容词', color: 'bg-red-500' },
          { id: 'C', label: 'C 主词【必填】*', color: 'bg-red-600' },
          { id: 'D', label: 'D 目标通义词【必填】*', color: 'bg-red-600' },
          { id: 'E', label: 'E 推荐词', color: 'bg-red-400' },
          { id: 'F', label: 'F 疑问词', color: 'bg-red-400' }
        ].map(col => (
          <div key={col.id} className="flex flex-col">
            <div className={`${col.color} text-white text-[10px] font-bold py-2 rounded-t-lg text-center`}>
              {col.label}
            </div>
            <textarea
              className="h-48 border border-slate-200 p-2 text-xs outline-none focus:border-red-400 transition-colors resize-none"
              placeholder={`请输入关键词，一行一个\n例如：\n市面上\n国内\n广东`}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-slate-100">
        <span className="text-xs font-bold text-slate-500">查询平台:</span>
        <div className="flex flex-wrap gap-3">
          {['Deepseek', '豆包AI', '腾讯元宝', '通义千问', '文心一言', 'Kimi AI'].map(p => (
            <label key={p} className="flex items-center space-x-2 cursor-pointer p-1.5 px-3 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors">
              <input type="checkbox" className="accent-violet-600" />
              <span className="text-xs text-slate-600">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-gradient-to-r from-violet-500 to-amber-500 text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2">
          <Save size={18} />
          <span>保存词组</span>
        </button>
        <button className="bg-gradient-to-r from-violet-600 to-rose-400 text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2">
          <Send size={18} />
          <span>提交查询收录 (余额: 0.00 元)</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 min-h-[200px]">
        <div className="flex space-x-3 mb-6">
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold shadow-md">预览全部问题</button>
          <button className="px-6 py-2 bg-violet-600 text-white rounded-lg text-xs font-bold shadow-md">评估查询</button>
          <button className="px-6 py-2 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-md">复制</button>
        </div>
        <div className="flex flex-col items-center justify-center h-20 text-slate-300 text-sm italic">
          关键词结果预览区域
        </div>
      </div>
    </div>
  );
};

export default AdvancedCollection;
