import { Component } from '@angular/core';
//import { ProductsListComponent } from "./components/products-list/products-list.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProductCategoryMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anglurar-ecommerce';
}
