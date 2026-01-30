
import React from 'react';
import { Search } from 'lucide-react';

interface SimpleSearchPageProps {
  title: string;
  placeholder: string;
  buttonLabel: string;
}

const SimpleSearchPage: React.FC<SimpleSearchPageProps> = ({ title, placeholder, buttonLabel }) => {
  return (
    <div className="flex flex-col items-center pt-20 space-y-12">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="w-full max-w-3xl flex bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 border border-slate-100">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full py-4 pl-12 pr-4 outline-none text-slate-600 rounded-xl"
          />
        </div>
        <button className="bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-700 transition-all flex items-center space-x-2">
          <span>{buttonLabel}</span>
        </button>
      </div>

      <div className="text-slate-400 text-sm">输入关键词开始查询</div>
    </div>
  );
};

export default SimpleSearchPage;
