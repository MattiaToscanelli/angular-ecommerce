import { Router, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import OktaAuth from '@okta/okta-auth-js';
import { Injector } from '@angular/core';

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
    const router = injector.get(Router);

    router.navigate(['/login']);
}

export const routes: Routes = [    
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: 'login', component: LoginComponent },    
    { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToLoginPage} },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'search/:keyword', component: ProductsListComponent },
    { path: 'category/:id', component: ProductsListComponent },
    { path: 'category', component: ProductsListComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'cart-details', component: CartDetailsComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
