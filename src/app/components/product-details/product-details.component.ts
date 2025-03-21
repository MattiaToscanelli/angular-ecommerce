import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  dataLoaded: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    this.dataLoaded = false;
    // get the "id" param string. convert string to a number using the "+" symbol
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe({
      next: data => {
        this.product = data;
        this.dataLoaded = true; // Dati caricati
      },
      error: err => {
        console.error('Product error:', err);
        this.dataLoaded = true; // Dati caricati
      }
    });
  }

  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
  
}
