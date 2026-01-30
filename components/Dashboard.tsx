
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatCard from './StatCard';
// Fix: Renaming PLATFORMS to DIST_PLATFORMS to match exported constants in constants.tsx
import { DIST_PLATFORMS } from '../constants';
// Added missing Users import from lucide-react
import { ExternalLink, Zap, Plus, Download, Users } from 'lucide-react';

const activityData = [
  { name: '01-24', count: 12 },
  { name: '01-25', count: 19 },
  { name: '01-26', count: 15 },
  { name: '01-27', count: 25 },
  { name: '01-28', count: 32 },
];

const indexData = [
  { name: 'Deepseek', value: 40, color: '#3b82f6' },
  { name: 'Kimi', value: 30, color: '#10b981' },
  { name: '豆包', value: 20, color: '#f59e0b' },
  { name: '其他', value: 10, color: '#94a3b8' },
];

const feedData = [
  { name: '01-24', feed: 45 },
  { name: '01-25', feed: 52 },
  { name: '01-26', feed: 38 },
  { name: '01-27', feed: 65 },
  { name: '01-28', feed: 48 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">运营概览</h2>
          <p className="text-slate-500">实时监控您的 GEO 优化表现和内容创作进度</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-slate-50 transition-colors">
            <Download size={18} />
            <span>导出报表</span>
          </button>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200">
            <Plus size={18} />
            <span>快速发布</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="AI 基础词" value="20" total="不限" color="bg-emerald-500" iconType="keyword" />
        <StatCard label="训练问题" value="242" total="不限" color="bg-blue-500" iconType="question" />
        <StatCard label="收录问题" value="56" color="bg-teal-500" iconType="indexed" />
        <StatCard label="创作数量" value="59" total="不限" color="bg-indigo-500" iconType="created" />
        <StatCard label="媒体投放" value="41" total="不限" color="bg-pink-500" iconType="media" />
        <StatCard label="投喂账号" value="39" total="98" color="bg-amber-500" iconType="account" />
      </div>

      {/* Platform Status Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-wider">主流大模型收录状态</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {/* Fix: Use DIST_PLATFORMS instead of non-existent PLATFORMS */}
          {DIST_PLATFORMS.map((p) => (
            <div key={p.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-violet-200 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500 transition-all">
                  {p.logo}
                </span>
                <ExternalLink size={12} className="text-slate-300 group-hover:text-violet-500" />
              </div>
              <p className="text-xs font-medium text-slate-500">{p.name}</p>
              <p className="text-lg font-bold text-slate-800">12 <span className="text-[10px] font-normal text-slate-400">收录</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">AI 创作趋势</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">收录比例</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={indexData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {indexData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
             {indexData.map(item => (
               <div key={item.name} className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                 <span className="text-xs text-slate-500">{item.name}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">投喂数据</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={feedData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="feed" stroke="#ec4899" strokeWidth={3} dot={{r: 4, fill: '#ec4899', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Tools Sidebar (Visible as row on mobile, col elsewhere) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
           {/* Placeholder for table or list */}
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800">最新创作列表</h3>
               <button className="text-violet-600 text-sm font-medium hover:underline">查看全部</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">文章标题</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">目标关键词</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">状态</th>
                      <th className="pb-4 font-bold text-slate-400 text-xs uppercase">发布平台</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 font-medium text-slate-700">如何利用 AI 进行 GEO 优化提升流量...</td>
                        <td className="py-4 text-slate-500 text-sm">GEO 优化策略</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium">已发布</span>
                        </td>
                        <td className="py-4 flex -space-x-2">
                           {[1,2,3].map(j => (
                             <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold">P{j}</div>
                           ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">快速导航</h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                 {label: '余额', sub: '0.00元', icon: <Zap className="text-amber-500" />},
                 {label: '蒸馏词', sub: '关键词库', icon: <Plus className="text-violet-500" />},
                 {label: 'AI 创作', sub: '大模型创作', icon: <Zap className="text-pink-500" />},
                 {label: '授权', sub: '平台授权', icon: <Users className="text-emerald-500" />},
               ].map((tool, idx) => (
                 <button key={idx} className="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-violet-50 transition-colors border border-transparent hover:border-violet-100">
                    <div className="mb-2">{tool.icon}</div>
                    <span className="text-xs font-bold text-slate-700">{tool.label}</span>
                    <span className="text-[10px] text-slate-400">{tool.sub}</span>
                 </button>
               ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl shadow-violet-200">
            <h3 className="font-bold text-lg mb-2">获取企业级 API</h3>
            <p className="text-violet-100 text-sm mb-4">升级至旗舰版，解锁独家 Deepseek 高并发接口及更多模型能力。</p>
            <button className="w-full bg-white text-violet-600 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-violet-50 transition-colors">
              立即升级
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
