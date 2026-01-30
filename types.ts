
export interface StatData {
  label: string;
  value: string | number;
  total?: string | number;
  unit?: string;
  color: string;
  icon: string;
}

export interface Platform {
  id: string;
  name: string;
  count: number;
  logo: string;
}

export interface Article {
  id: string;
  title: string;
  keyword: string;
  content: string;
  status: 'draft' | 'published' | 'optimizing';
  platforms: string[];
  createdAt: string;
}

export interface Keyword {
  id: string;
  term: string;
  volume: string;
  difficulty: number;
  lastUsed: string;
}
