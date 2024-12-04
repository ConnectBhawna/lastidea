export interface IndexerTag {
  name: string;
  value: string;
}

export interface Project {
  title: string;
  link: string;
  description: string;
  twitter?: string;
}

export interface IndexerOptions {
  process?: string;
  tags?: IndexerTag[];
}