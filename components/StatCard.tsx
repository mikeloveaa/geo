
import React from 'react';
import { FileText, Search, ShieldCheck, Layers, Share2, UserCheck } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  total?: string | number;
  color: string;
  iconType: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, total, color, iconType }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'keyword': return <FileText className="text-white" />;
      case 'question': return <Search className="text-white" />;
      case 'indexed': return <ShieldCheck className="text-white" />;
      case 'created': return <Layers className="text-white" />;
      case 'media': return <Share2 className="text-white" />;
      case 'account': return <UserCheck className="text-white" />;
      default: return <FileText className="text-white" />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${color}`}>
        {getIcon()}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-slate-800">{value}</span>
          {total && (
            <span className="text-slate-400 text-sm font-normal">/ {total} 个</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
