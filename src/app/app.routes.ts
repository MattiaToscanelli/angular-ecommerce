import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';

export const routes: Routes = [
    { path: 'category/:id', component: ProductsListComponent },
    { path: 'category', component: ProductsListComponent },
    { path: 'products', component: ProductsListComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
