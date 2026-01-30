
import React from 'react';
import { Edit2, Trash2, Eye, RefreshCcw, Plus, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (val: any, item: any) => React.ReactNode;
}

interface ManagementTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  showSearch?: boolean;
}

const ManagementTable: React.FC<ManagementTableProps> = ({ 
  title, 
  columns, 
  data, 
  onAdd, 
  onEdit, 
  onDelete, 
  showSearch = true 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors">
            <RefreshCcw size={16} />
          </button>
          {onAdd && (
            <button 
              onClick={onAdd}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
            >
              <Plus size={16} />
              <span>添加新项</span>
            </button>
          )}
          <button className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="搜索..." 
                className="bg-slate-50 border-none rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-violet-500/20 outline-none w-48"
              />
            </div>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-600"><Eye size={18} /></button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
              {columns.map(col => (
                <th key={col.key} className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length > 0 ? data.map((item, idx) => (
              <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-sm text-slate-600">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    {onEdit && (
                      <button 
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(item)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  暂无记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <div>显示第 1 到 {data.length} 条记录，总共 {data.length} 条记录</div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50">上一页</button>
          <button className="px-3 py-1 rounded bg-violet-600 text-white">1</button>
          <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50">下一页</button>
        </div>
      </div>
    </div>
  );
};

export default ManagementTable;
