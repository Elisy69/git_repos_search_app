export interface RepoTypes {
  id: number;
  owner: { login: string; avatar_url: string; html_url: string };
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
}
