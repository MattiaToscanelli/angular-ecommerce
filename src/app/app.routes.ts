import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [    
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'search/:keyword', component: ProductsListComponent },
    { path: 'category/:id', component: ProductsListComponent },
    { path: 'category', component: ProductsListComponent },
    { path: 'products', component: ProductsListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
