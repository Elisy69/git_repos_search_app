export interface RepoTypes {
  id: number;
  owner: { login: string; avatar_url: string };
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
}
