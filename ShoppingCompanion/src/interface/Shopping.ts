import {Article} from "./Article";

export class Shopping {
  private articles : Article[];
  public name : string;

  constructor(articles : Article[]){
    this.articles = articles;
    this.articles.sort(this.articleCompare);
  }

  public get_articles() : Article[]{
    return this.articles;
  }

  public length() : number {
    return this.articles.length;
  }

  private articleCompare(a1, a2) {
      const sides = ["N", "O", "E", "S"];
      const aisle1 = a1.position.split(":")[0];
      const aisle2 = a2.position.split(":")[0];
      const side1 = a1.position.split(":")[1];
      const side2 = a2.position.split(":")[1];
      if (aisle1 < aisle2)
          return -1;
      else if (aisle2 < aisle1)
          return 1;
      else {
          if (sides.indexOf(side1) < sides.indexOf(side2))
              return -1;
          else if (sides.indexOf(side2) < sides.indexOf(side1))
              return 1;
          else
              return 0;
      }
  }

}
