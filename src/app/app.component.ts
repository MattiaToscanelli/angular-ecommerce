import { Component } from '@angular/core';
//import { ProductsListComponent } from "./components/products-list/products-list.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { LoginStatusComponent } from "./components/login-status/login-status.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProductCategoryMenuComponent, CartStatusComponent, SearchComponent, LoginStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anglurar-ecommerce';

  scroll(arg0: number,arg1: number) {
    window.scroll(arg0,arg1);
  }
}
