import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule],
  templateUrl: './products-list-grid.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  dataLoaded: boolean = false;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.dataLoaded = false; // Fino a quando non carichiamo i dati
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!.trim();

    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
        this.dataLoaded = true; // Dati caricati
      },
      error => {
        console.error('Search error:', error);
        this.dataLoaded = true; // Dati caricati
      }
    );
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    this.currentCategoryId = hasCategoryId
      ? +this.route.snapshot.paramMap.get('id')!
      : 1;

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        this.dataLoaded = true; // Dati caricati
      },
      error => {
        console.error('Fetch error:', error);
        this.dataLoaded = true; // Dati caricati
      }
    );
  }
}
