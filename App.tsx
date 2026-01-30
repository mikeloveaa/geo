
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentCreator from './components/ContentCreator';
import KeywordTool from './components/KeywordTool';
import SimpleSearchPage from './components/SimpleSearchPage';
import ManagementTable from './components/ManagementTable';
import AdvancedCollection from './components/AdvancedCollection';
import PromptManager from './components/PromptManager';
import AccountManagement from './components/AccountManagement';
import ViralReplicator from './components/ViralReplicator';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import { Search, Bell, User, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const mockRecords = [
    { id: 1, name: '9-16', platform: '百家号', account: '大模型9大智能体', category: 'GEO-1', title: '揭秘GEO赚钱教程：轻松掌握，开启你的财富增长之旅！', status: '完成', time: '2025-01-28 14:30' },
    { id: 2, name: '9-14', platform: '公众号', account: 'AI大模型企业智能机器人源头', category: 'GEO-9-5', title: '注意！geo优化策略的这些要点你必须知道！', status: '完成', time: '2025-01-27 10:15' },
    { id: 3, name: '9-14', platform: '公众号', account: '石炎科技设备', category: 'GEO-9-5', title: '揭秘！geo优化工具价格大比拼，让你轻松选择最适合的那款！', status: '完成', time: '2025-01-26 18:00' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'creator':
        return <ContentCreator />;
      case 'viral-replicator':
        return <ViralReplicator />;
      case 'prompts':
        return <PromptManager />;
      case 'manual-tools':
        return <KeywordTool />;
      case 'ai-distill':
        return <SimpleSearchPage title="AI 蒸馏拓词" placeholder="请输入关键词" buttonLabel="蒸馏 (3点数)" />;
      case 'keyword-index':
        return <AdvancedCollection />;
      case 'accounts':
        return <AccountManagement />;
      case 'content-tasks':
        return (
          <ManagementTable 
            title="投喂内容任务" 
            onAdd={() => setIsTaskModalOpen(true)}
            data={mockRecords}
            columns={[
              { key: 'id', label: '序号' },
              { key: 'name', label: '任务名' },
              { key: 'platform', label: '投喂自媒体', render: (val) => (
                <span className="px-2 py-1 bg-slate-100 text-[10px] rounded font-bold text-slate-500">{val}</span>
              )},
              { key: 'account', label: '投喂账号' },
              { key: 'category', label: '文章分类' },
              { key: 'title', label: '文章标题' },
              { key: 'status', label: '状态', render: (val) => (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-emerald-600">{val}</span>
                </div>
              )},
              { key: 'time', label: '发布时间' }
            ]}
          />
        );
      case 'feed-records':
        return (
          <ManagementTable 
            title="投喂记录" 
            data={mockRecords}
            columns={[
              { key: 'id', label: '序号' },
              { key: 'name', label: '任务名' },
              { key: 'platform', label: '投喂自媒体' },
              { key: 'account', label: '投喂账号' },
              { key: 'title', label: '文章标题' },
              { key: 'time', label: '发布时间' }
            ]}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <h2 className="text-xl font-bold text-slate-700">正在开发中...</h2>
            <p className="text-slate-500">该功能模块即将上线，敬请期待。</p>
            <button onClick={() => setActiveTab('dashboard')} className="bg-violet-600 text-white px-6 py-2 rounded-xl font-medium">返回控制台</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        <header className="flex justify-between items-center mb-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white sticky top-4 z-40 shadow-sm">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="搜索任务 or 功能..." className="w-full bg-slate-50/50 border-none rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-sm" />
            </div>
          </div>

          <div className="flex items-center space-x-6 ml-8">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-700">李经理</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">超级管理员</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
      </main>

      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="添加任务">
        <TaskForm onClose={() => setIsTaskModalOpen(false)} onSubmit={(d) => console.log(d)} />
      </Modal>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-violet-500/40 hover:scale-110 transition-transform z-50 group">
        <Sparkles size={24} />
      </button>
    </div>
  );
};

export default App;
