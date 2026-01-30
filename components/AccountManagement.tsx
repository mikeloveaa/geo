
import React, { useState } from 'react';
import { 
  RefreshCcw, 
  Trash2, 
  Download, 
  LayoutGrid, 
  List, 
  Search, 
  ChevronDown, 
  Edit3, 
  User as UserIcon,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { DIST_PLATFORMS } from '../constants';

const AccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: '19212852891', avatar: '', platform: 'zhihu', status: true, ip: '', daily: '0 / 5', authStatus: '授权成功', time: '2026-01-06 11:23:18' },
    { id: 2, name: '2958484586', avatar: '', platform: 'qiye', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2026-01-06 11:21:25' },
    { id: 3, name: '19212852891', avatar: '', platform: 'baijia', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2026-01-06 11:19:55' },
    { id: 4, name: '19212852892', avatar: '', platform: 'toutiao', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2026-01-06 11:16:56' },
    { id: 5, name: '19212852891', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', platform: 'sohu', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2026-01-06 11:11:41' },
    { id: 6, name: '19212852891', avatar: '', platform: 'wangyi', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2026-01-06 11:09:35' },
    { id: 7, name: '4000761588', avatar: '', platform: 'sohu', status: true, ip: '', daily: '0 / 2', authStatus: '授权成功', time: '2025-12-10 17:35:02' },
    { id: 8, name: '4000761588', avatar: '', platform: 'wangyi', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2025-12-10 17:34:36' },
    { id: 9, name: 'AI大模型岗位智能体', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9', platform: 'bilibili', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2025-11-29 14:57:32' },
    { id: 10, name: 'AI GEO源码哥', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10', platform: 'red', status: true, ip: '', daily: '0 / 3', authStatus: '授权成功', time: '2025-11-29 14:51:06' },
  ]);

  const toggleStatus = (id: number) => {
    setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, status: !acc.status } : acc));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors">
            <RefreshCcw size={16} />
          </button>
          <button className="flex items-center space-x-1 px-3 py-2 bg-rose-400 text-white rounded text-xs font-bold hover:bg-rose-500 transition-colors shadow-sm">
            <Trash2 size={14} />
            <span>删除</span>
          </button>
          <button className="flex items-center space-x-1 px-4 py-2 bg-[#d13a68] text-white rounded text-xs font-bold hover:brightness-110 transition-all shadow-sm">
            <Download size={14} />
            <span>下载GEO助手授权码12+平台</span>
          </button>
          <span className="text-violet-700 font-bold ml-4 text-sm tracking-tight">
            设备授权码 【14357】
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-2 text-violet-600 bg-violet-50 rounded"><List size={16} /></button>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded flex items-center">
            <LayoutGrid size={16} />
            <ChevronDown size={12} />
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded">
            <Download size={16} className="rotate-180" />
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-100 rounded"><Search size={16} /></button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-700 uppercase">
              <th className="px-4 py-3 w-10 text-center"><input type="checkbox" className="rounded-sm border-slate-300" /></th>
              <th className="px-4 py-3 text-center">序号 <ChevronDown size={10} className="inline ml-1" /></th>
              <th className="px-4 py-3">账号名称</th>
              <th className="px-4 py-3 text-center">头像</th>
              <th className="px-4 py-3 text-center">自媒体</th>
              <th className="px-4 py-3 text-center">发布状态</th>
              <th className="px-4 py-3">代理IP</th>
              <th className="px-4 py-3 text-center">今日发布</th>
              <th className="px-4 py-3 text-center">状态</th>
              <th className="px-4 py-3 text-center">授权时间 <ChevronDown size={10} className="inline ml-1" /></th>
              <th className="px-4 py-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {accounts.map((acc) => {
              const platform = DIST_PLATFORMS.find(p => p.id === acc.platform);
              return (
                <tr key={acc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3 text-center"><input type="checkbox" className="rounded-sm border-slate-300" /></td>
                  <td className="px-4 py-3 text-center text-slate-500">{acc.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{acc.name}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 mx-auto overflow-hidden flex items-center justify-center">
                      {acc.avatar ? <img src={acc.avatar} alt="avatar" className="w-full h-full object-cover" /> : <UserIcon size={16} className="text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] text-white font-bold ${platform?.color || 'bg-slate-400'}`}>
                      {platform?.logo || '未知'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleStatus(acc.id)} className="focus:outline-none transition-colors">
                      {acc.status ? <ToggleRight className="text-emerald-500 w-8 h-8" /> : <ToggleLeft className="text-slate-300 w-8 h-8" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{acc.ip}</td>
                  <td className="px-4 py-3 text-center text-slate-600 font-medium">{acc.daily}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-emerald-600 font-bold">{acc.authStatus}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500">{acc.time}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 bg-slate-800 text-white rounded hover:bg-black transition-colors">
                        <Edit3 size={12} />
                      </button>
                      <button className="p-1.5 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center space-x-4">
          <span>显示第 1 到第 10 条记录，总共 39 条记录</span>
          <div className="flex items-center space-x-1">
            <span>每页显示</span>
            <select className="border border-slate-200 rounded px-1 py-0.5 outline-none">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <ChevronDown size={10} />
            <span>条记录</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 border border-slate-100 rounded text-slate-300 cursor-not-allowed">上一页</button>
          <button className="px-3 py-1 bg-violet-500 text-white rounded font-bold shadow-sm">1</button>
          <button className="px-3 py-1 hover:bg-slate-50 border border-slate-100 rounded">2</button>
          <button className="px-3 py-1 hover:bg-slate-50 border border-slate-100 rounded">3</button>
          <button className="px-3 py-1 hover:bg-slate-50 border border-slate-100 rounded">4</button>
          <button className="px-3 py-1 hover:bg-slate-50 border border-slate-100 rounded">下一页</button>
          <input type="text" className="w-8 border border-slate-200 rounded px-1 py-1 text-center outline-none" placeholder="" />
          <button className="px-3 py-1 bg-violet-100 text-violet-700 rounded font-bold hover:bg-violet-200">跳转</button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
