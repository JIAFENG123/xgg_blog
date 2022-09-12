export interface ArticelData {
  article_id?: number | string;
  tags: string[] | number[];
  title: string;
  sammaryPic: string;
  summary: string;
  content: string;
  category: string;
  categorys: string;
  createdAt?:string
}

export interface ArticleRes{
  count: number
  currentPage:number
  data: ArticelData[]
}


export interface Summary{
  articleCount:number
  tagCount: number
  categoryCount:number
}

export interface Cate {
  id: number;
  name: string;
  parent_id: number | string;
  count: number;
  children: Cate[];
}

export interface CategoryGroup {
  id: number;
  count: number;
}