import {Article} from "./Article";

export class Shopping {
  private articles : Article[];
  public name : string;

  constructor(articles : Article[]){
    this.articles = articles;
  }

  public get_articles() : Article[]{
    return this.articles;
  }

  public length() : number {
    return this.articles.length;
  }

}
