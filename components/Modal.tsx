
import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = 'max-w-2xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white w-full ${width} rounded-xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200`}>
        {/* Title Bar - Gradient Style */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 px-4 py-3 flex items-center justify-between text-white">
          <h3 className="font-bold text-sm tracking-wide">{title}</h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-white/10 rounded"><Minus size={14} /></button>
            <button className="p-1 hover:bg-white/10 rounded"><Square size={12} /></button>
            <button onClick={onClose} className="p-1 hover:bg-red-500 rounded transition-colors"><X size={14} /></button>
          </div>
        </div>
        
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
