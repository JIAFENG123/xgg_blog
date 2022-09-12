import { ArticelData } from "./article";

export interface ArchiveData {
  count: number;
  articleCount: number
  currentPage: number;
  data: Archive[]
}

export interface Archive{
    year:number,
    articles: ArticelData[];
}


export interface YearGroup{
  date:number
  count:number
}