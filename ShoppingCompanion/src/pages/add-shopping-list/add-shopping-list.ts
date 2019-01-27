import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Article} from "../../interface/Article";
import {Shopping} from "../../interface/Shopping";
import {ArticleProvider} from "../../providers/article/article";
import {ShoppingProvider} from "../../providers/shopping/shopping";
import {SaveShoppingListPage} from "../save-shopping-list/save-shopping-list";

/**
 * Generated class for the AddShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping-list',
  templateUrl: 'add-shopping-list.html',
})
export class AddShoppingListPage {


  @ViewChild("maListe") myList: ElementRef;
  @ViewChild("searchResult") searchResult: ElementRef;

  articles: Article[];
  my_articles: Article[] = [];
  articles_filtered: Article[];
  private search: string = "";

  constructor(public navCtrl: NavController, private article_provider: ArticleProvider,
              private shopping_provider: ShoppingProvider) {

  }

  async ionViewDidLoad() {
    const articles: Article[] = await this.article_provider.get();
    this.articles = articles.sort((a, b) => a.nom.localeCompare(b.nom));
    this.articles_filtered = JSON.parse(JSON.stringify(this.articles));
  }

  search_items(event): void {
    let item_name: string = event.target.value;
    item_name = item_name.toLowerCase();

    this.articles_filtered = this.articles
      .filter(article => article.nom.toLowerCase().includes(item_name));
  }

  add_to_list(article: Article): void {
    this.my_articles.unshift(article);
    this.articles.splice(Article.index_of(this.articles, article), 1);
    this.articles_filtered.splice(Article.index_of(this.articles_filtered, article), 1);
    this.make_my_list_appear();
    this.resetSearch();
  }

  remove_from_list(article: Article): void {
    const sort = (articles: Article[]) => {
      return articles.sort((a, b) => a.nom.localeCompare(b.nom));
    };
    this.my_articles.splice(Article.index_of(this.my_articles, article), 1);
    this.articles.push(article);
    this.articles_filtered.push(article);
    this.articles = sort(this.articles);
    this.articles_filtered = sort(this.articles_filtered);
  }

  async start_shopping(): Promise<void> {
    if (this.my_articles.length !== 0){
      const shopping: Shopping = new Shopping(this.my_articles);
      await this.navCtrl.push(SaveShoppingListPage, {shopping: shopping});
    }else{
      alert("Vous n'avez encore sélectionné aucun article");
    }
  }

  make_my_list_disapear() {
    this.myList.nativeElement.style.display = "None";
    this.searchResult.nativeElement.style.height = "50vh";
  }

  make_my_list_appear() {
    this.myList.nativeElement.style.display = "block";
    this.searchResult.nativeElement.style.height = "30vh";
  }

  resetSearch() {
    this.search = "";
    this.articles_filtered = JSON.parse(JSON.stringify(this.articles));
  }
}
