import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink, NgbPaginationModule],
  templateUrl: './products-list-grid.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 0;
  previousCategoryId: number = 0;
  searchMode: boolean = false;
  dataLoaded: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 12;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
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

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductPaginate(
      this.thePageNumber-1, 
      this.thePageSize, 
      theKeyword)
    .subscribe(
      this.processResult()
    );
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    this.currentCategoryId = hasCategoryId
      ? +this.route.snapshot.paramMap.get('id')!
      : 0;

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    if (this.currentCategoryId == 0) {
      this.productService.getAllProductListPaginate(
        this.thePageNumber - 1, 
        this.thePageSize)
      .subscribe(
        this.processResult()
      );
    } else {
      this.productService.getProductListPaginate(
        this.thePageNumber - 1, 
        this.thePageSize, 
        this.currentCategoryId)
      .subscribe(
        this.processResult(),
      );
    }
  }

  updatePageSize(theNewPageSize: string) {
    this.thePageSize = +theNewPageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return {
      next: (data: any) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
        this.dataLoaded = true; 
      },
      error: (err: any) => {
        console.error(err);
        this.dataLoaded = true; 
      }
    };
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

  scroll(arg0: number,arg1: number) {
    window.scroll(arg0,arg1);
  }
}
