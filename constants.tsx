
import React from 'react';
import { 
  LayoutDashboard, 
  FileEdit, 
  BarChart3, 
  Settings, 
  Send, 
  Search,
  Globe,
  Database,
  Users,
  CheckCircle2,
  Clock,
  Hash,
  Wand2,
  ListFilter,
  MousePointer2,
  FileSearch,
  CloudUpload,
  MessageSquare,
  Copy
} from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'dashboard', label: '控制台', icon: <LayoutDashboard size={18} /> },
  { 
    id: 'ai-tools', 
    label: 'AI 工具', 
    icon: <Wand2 size={18} />,
    children: [
      { id: 'keyword-index', label: '关键词指数', icon: <Hash size={16} /> },
      { id: 'ai-distill', label: 'AI 蒸馏拓词', icon: <ListFilter size={16} /> },
      { id: 'manual-tools', label: '手动拓词工具', icon: <MousePointer2 size={16} /> },
    ]
  },
  { 
    id: 'creator-group', 
    label: 'AI 创作', 
    icon: <FileEdit size={18} />,
    children: [
      { id: 'creator', label: '创作内容', icon: <FileEdit size={16} /> },
      { id: 'viral-replicator', label: '爆款复刻', icon: <Copy size={16} /> },
      { id: 'prompts', label: '提示词模板', icon: <MessageSquare size={16} /> },
    ]
  },
  { 
    id: 'media-group', 
    label: '自媒体投喂', 
    icon: <CloudUpload size={18} />,
    children: [
      { id: 'content-tasks', label: '投喂内容任务', icon: <Clock size={16} /> },
      { id: 'accounts', label: '投喂账号', icon: <Users size={16} /> },
      { id: 'feed-records', label: '投喂记录', icon: <FileSearch size={16} /> },
    ]
  },
  { 
    id: 'seo-group', 
    label: 'AI 官网 SEO', 
    icon: <Globe size={18} />,
    children: [
      { id: 'site-mgmt', label: '站点管理', icon: <Database size={16} /> },
      { id: 'seo-tasks', label: 'SEO 发布任务', icon: <Send size={16} /> },
      { id: 'publish-records', label: '发布记录', icon: <CheckCircle2 size={16} /> },
    ]
  },
  { id: 'reports', label: 'AI 数据报表', icon: <BarChart3 size={18} /> },
  { id: 'settings', label: '设置', icon: <Settings size={18} /> },
];

export const DIST_PLATFORMS = [
  { id: 'zhihu', name: '知乎', logo: '知乎', color: 'bg-blue-600' },
  { id: 'qiye', name: '企鹅号', logo: '企鹅号', color: 'bg-emerald-500' },
  { id: 'baijia', name: '百家号', logo: '百家号', color: 'bg-sky-500' },
  { id: 'toutiao', name: '头条号', logo: '头条号', color: 'bg-orange-600' },
  { id: 'sohu', name: '搜狐', logo: '搜狐', color: 'bg-indigo-600' },
  { id: 'wangyi', name: '网易', logo: '网易', color: 'bg-green-500' },
  { id: 'bilibili', name: '哔哩专题', logo: '哔哩', color: 'bg-rose-400' },
  { id: 'red', name: '小红书', logo: '小红书', color: 'bg-orange-500' },
];
