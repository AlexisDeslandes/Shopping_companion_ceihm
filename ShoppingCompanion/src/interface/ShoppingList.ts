import {Shopping} from "./Shopping";

export class ShoppingList {
  shopping: Shopping[] = [];
  shopping_filtered: Shopping[] = [];

  public constructor(shopping: Shopping[]) {
    this.shopping = shopping;
    this.shopping_filtered = JSON.parse(JSON.stringify(shopping));
  }

  public filter(searchString: string): void {
    this.shopping_filtered = this.shopping
      .filter(elem => elem.name.toLowerCase().includes(searchString.toLowerCase()));
  }
}
