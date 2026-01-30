
import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['ai-tools', 'creator-group', 'media-group', 'seo-group']);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-200 overflow-y-auto z-50 transition-all">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8 px-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200">G</div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">GEO Genius</h1>
        </div>

        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-slate-400 hover:text-slate-600 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
                    </div>
                    {expandedGroups.includes(item.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  {expandedGroups.includes(item.id) && (
                    <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                      {item.children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => setActiveTab(child.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-200 text-sm ${
                            activeTab === child.id
                              ? 'bg-violet-50 text-violet-600 font-bold'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-violet-50 text-violet-600 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">系统状态</p>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>大模型接口正常</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
