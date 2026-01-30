
import React, { useState } from 'react';
import { DIST_PLATFORMS } from '../constants';

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSubmit }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-4">
          <label className="w-24 text-right text-xs font-bold text-slate-600"><span className="text-red-500 mr-1">*</span> 任务名称:</label>
          <input type="text" placeholder="任务名称，随便吧" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 outline-none" />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-24 text-right text-xs font-bold text-slate-600"><span className="text-red-500 mr-1">*</span> 文章分类:</label>
          <select className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none">
            <option>GEO-1 (文章: 2)</option>
            <option>SEO核心 (文章: 12)</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-24 text-right text-xs font-bold text-slate-600">最大发布量:</label>
          <div className="flex-1 space-y-1">
            <input type="number" defaultValue={1} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none" />
            <p className="text-[10px] text-slate-400">任务达到这个数值就会暂停发布</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-24 text-right text-xs font-bold text-slate-600">文章去重:</label>
          <div className="flex space-x-4">
            {['不去重', '全部去重', '单平台去重'].map(opt => (
              <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                <input type="radio" name="dedup" className="accent-violet-600" defaultChecked={opt === '全部去重'} />
                <span className="text-xs text-slate-600 group-hover:text-violet-600">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-24 text-right text-xs font-bold text-slate-600">投喂平台:</label>
          <div className="flex-1 grid grid-cols-4 gap-2">
            {DIST_PLATFORMS.map(platform => (
              <button 
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center space-x-2 px-3 py-2 border rounded-lg text-xs transition-all ${
                  selectedPlatforms.includes(platform.id) 
                    ? 'border-violet-500 bg-violet-50 text-violet-700 font-bold' 
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                <span className="w-5 h-5 flex items-center justify-center bg-white rounded font-bold text-[10px]">{platform.logo}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-3 pt-4 border-t border-slate-100">
        <button className="px-8 py-2 bg-violet-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-violet-200 hover:bg-violet-700">确定</button>
        <button onClick={onClose} className="px-8 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold text-sm hover:bg-slate-200">重置</button>
      </div>
    </div>
  );
};

export default TaskForm;
