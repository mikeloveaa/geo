
import React, { useState } from 'react';
import ManagementTable from './ManagementTable';
import Modal from './Modal';
import { Save, Info, Sparkles, MessageSquarePlus, Trash2 } from 'lucide-react';

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  systemInstruction: string;
  userPrompt: string;
  updatedAt: string;
}

const PromptManager: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Partial<PromptTemplate>>({});
  const [prompts, setPrompts] = useState<PromptTemplate[]>([
    {
      id: '1',
      name: 'GEO 权威专家模版',
      category: 'GEO优化',
      systemInstruction: '你是一位资深的 GEO (生成引擎优化) 专家。你的目标是创作不仅能吸引人类读者，且极其容易被 AI 搜索引擎 (如 Perplexity, ChatGPT Search) 收录和引用的内容。',
      userPrompt: '为关键词 {keyword} 撰写一篇深度、具有权威性的文章。要求包含数据支持、专家视角和清晰的 H 标签结构。',
      updatedAt: '2025-01-28 10:00'
    },
    {
      id: '2',
      name: '小红书种草文案',
      category: '社媒引流',
      systemInstruction: '你是一位拥有百万粉丝的小红书博主，擅长撰写高点击、高互动的种草笔记。',
      userPrompt: '针对 {keyword} 撰写一篇种草笔记。要求：标题炸裂、表情丰富、结尾带标签、语气亲切。',
      updatedAt: '2025-01-27 15:30'
    }
  ]);

  const handleEdit = (prompt: PromptTemplate) => {
    setEditingPrompt({ ...prompt });
    setIsEditorOpen(true);
  };

  const handleAdd = () => {
    setEditingPrompt({
      name: '',
      category: 'GEO优化',
      systemInstruction: '',
      userPrompt: '针对关键词 {keyword} 撰写内容。',
    });
    setIsEditorOpen(true);
  };

  const handleDelete = (prompt: PromptTemplate) => {
    if (window.confirm(`确定要删除模板 "${prompt.name}" 吗？`)) {
      setPrompts(prev => prev.filter(p => p.id !== prompt.id));
    }
  };

  const handleSave = () => {
    if (!editingPrompt.name || !editingPrompt.systemInstruction) {
      alert("请填写模板名称和系统指令");
      return;
    }

    const now = new Date().toLocaleString();

    if (editingPrompt.id) {
      // Update existing
      setPrompts(prev => prev.map(p => 
        p.id === editingPrompt.id 
          ? { ...p, ...editingPrompt, updatedAt: now } as PromptTemplate
          : p
      ));
    } else {
      // Create new
      const newPrompt: PromptTemplate = {
        id: Math.random().toString(36).substr(2, 9),
        name: editingPrompt.name || '',
        category: editingPrompt.category || '通用',
        systemInstruction: editingPrompt.systemInstruction || '',
        userPrompt: editingPrompt.userPrompt || '',
        updatedAt: now,
      };
      setPrompts(prev => [newPrompt, ...prev]);
    }
    
    setIsEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">提示词模板管理</h2>
          <p className="text-sm text-slate-500">定制化各种创作场景的 AI 提示词指令</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center space-x-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all"
        >
          <MessageSquarePlus size={18} />
          <span>创建新模板</span>
        </button>
      </div>

      <ManagementTable 
        title="模板列表"
        data={prompts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: '模板名称', render: (val) => <span className="font-bold text-slate-700">{val}</span> },
          { key: 'category', label: '分类', render: (val) => (
            <span className="px-2 py-1 bg-violet-50 text-violet-600 rounded text-[10px] font-bold">{val}</span>
          )},
          { key: 'updatedAt', label: '最后更新' }
        ]}
      />

      <Modal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        title={editingPrompt.id ? "编辑提示词模板" : "创建提示词模板"}
        width="max-w-4xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">模板名称</label>
              <input 
                type="text" 
                value={editingPrompt.name || ''}
                onChange={(e) => setEditingPrompt({...editingPrompt, name: e.target.value})}
                placeholder="例如：GEO核心专家"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">模板分类</label>
              <select 
                value={editingPrompt.category || 'GEO优化'}
                onChange={(e) => setEditingPrompt({...editingPrompt, category: e.target.value})}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none transition-all"
              >
                <option>GEO优化</option>
                <option>社媒引流</option>
                <option>新闻快讯</option>
                <option>通用</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600">System Instruction (角色设定)</label>
              <div className="flex items-center text-[10px] text-violet-500 space-x-1">
                <Sparkles size={12} />
                <span>AI 专家建议</span>
              </div>
            </div>
            <textarea 
              value={editingPrompt.systemInstruction || ''}
              onChange={(e) => setEditingPrompt({...editingPrompt, systemInstruction: e.target.value})}
              placeholder="在此输入 AI 的身份设定，例如：你是一位拥有 20 年经验的建筑工程师..."
              className="w-full h-32 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 outline-none resize-none leading-relaxed transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">User Prompt (用户指令模版)</label>
            <textarea 
              value={editingPrompt.userPrompt || ''}
              onChange={(e) => setEditingPrompt({...editingPrompt, userPrompt: e.target.value})}
              placeholder="使用 {keyword} 作为关键词变量，例如：为 {keyword} 撰写一篇科普文章..."
              className="w-full h-24 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 outline-none resize-none transition-all"
            />
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="flex items-center space-x-2 text-slate-500 font-bold text-xs mb-2">
              <Info size={14} />
              <span>变量说明</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              在 User Prompt 中使用 <code className="bg-white px-1 rounded border text-violet-600 font-bold">{'{keyword}'}</code> 标签，系统在执行任务时会自动将其替换为真实的关键词。
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => setIsEditorOpen(false)}
              className="px-6 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              取消
            </button>
            <button 
              onClick={handleSave}
              className="px-8 py-2 bg-violet-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-violet-200 hover:bg-violet-700 flex items-center space-x-2 transition-all"
            >
              <Save size={16} />
              <span>保存模板</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptManager;
