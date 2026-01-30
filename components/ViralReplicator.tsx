
import React, { useState } from 'react';
import ManagementTable from './ManagementTable';
import Modal from './Modal';
import { ChevronDown, Search } from 'lucide-react';

const ViralReplicator: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viralTasks, setViralTasks] = useState([]);

  const columns = [
    { key: 'id', label: '序号' },
    { key: 'category', label: '文章分类' },
    { key: 'link', label: '链接' },
    { key: 'title', label: '标题' },
    { key: 'rewriteTime', label: '改写时间' },
  ];

  const [formData, setFormData] = useState({
    link: '',
    imageSource: '',
    instruction: '1.14'
  });

  const handleSubmit = () => {
    // Logic to add a new viral replication task
    setIsAddModalOpen(false);
    alert('任务已提交');
  };

  return (
    <div className="space-y-6">
      <ManagementTable 
        title="爆款复刻任务"
        data={viralTasks}
        columns={columns}
        onAdd={() => setIsAddModalOpen(true)}
        onDelete={() => {}}
      />

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="添加"
        width="max-w-xl"
      >
        <div className="space-y-8 py-4">
          <div className="flex items-center space-x-4">
            <label className="w-32 text-right text-xs font-bold text-slate-600">
              <span className="text-rose-500 mr-1">*</span>文章链接:
            </label>
            <input 
              type="text" 
              placeholder="文章链接，格式：https://xxxx" 
              className="flex-1 px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-32 text-right text-xs font-bold text-slate-600">
              <span className="text-rose-500 mr-1">*</span>文章配图:
            </label>
            <div className="flex-1 relative">
              <select 
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm outline-none bg-indigo-50/50 appearance-none text-violet-700 font-medium"
                value={formData.imageSource}
                onChange={(e) => setFormData({...formData, imageSource: e.target.value})}
              >
                <option value="">选择图库</option>
                <option value="internal">系统默认库</option>
                <option value="custom">自定义上传</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <label className="w-32 text-right text-xs font-bold text-slate-600 mt-2">
              <span className="text-rose-500 mr-1">*</span>爆文改写指令:
            </label>
            <div className="flex-1 border border-slate-200 rounded overflow-hidden">
              <div className="relative">
                <div className="px-3 py-2 bg-violet-400 text-white text-sm flex items-center justify-between">
                  <span>选择指令</span>
                  <ChevronDown size={14} />
                </div>
                <div className="px-2 py-2 border-b border-slate-100 bg-white">
                  <div className="relative">
                    <input type="text" className="w-full px-3 py-1.5 border border-blue-400 rounded outline-none text-xs" />
                  </div>
                </div>
                <div className="bg-white max-h-40 overflow-y-auto divide-y divide-slate-50 text-xs">
                  {['1.14', '装修', 'GEO'].map(item => (
                    <button 
                      key={item}
                      onClick={() => setFormData({...formData, instruction: item})}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-800 hover:text-white transition-colors ${formData.instruction === item ? 'bg-slate-100 font-bold' : ''}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button 
              onClick={handleSubmit}
              className="px-8 py-2 bg-violet-500 text-white rounded text-sm font-bold shadow-lg shadow-violet-100 hover:bg-violet-600 transition-all active:scale-95"
            >
              归类文章
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViralReplicator;
