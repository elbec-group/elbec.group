import { ComponentType } from 'react';

export type Locale = string;

export type MarkdownContent<T = any> = { react: ComponentType; attributes: T };

export type Project = {
  abstract: string;
  amount: number;
  currency_type: string;
  draft: boolean;
  funding_agency: string;
  id: string;
  image: string;
  members: string[];
  name: string;
  order: number;
  pi: string[];
  publication_date: string;
  reference: string;
  relevant_outputs: object[];
  running_from: string;
  slug: string;
}
