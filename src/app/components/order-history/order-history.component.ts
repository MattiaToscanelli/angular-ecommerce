import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;
  dataLoaded: boolean = false;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    scroll(0,0);
    this.handleOrderHistory();
  }


  handleOrderHistory() {
    this.dataLoaded = false;
  
    const email = this.storage.getItem('userEmail');
  
    this.orderHistoryService.getOrderHistory(email!).subscribe({
      next: response => {
        this.orderHistoryList = response._embedded.orders;
        console.log('Order History:', this.orderHistoryList);
        this.dataLoaded = true;
      },
      error: err => {
        console.error('Error fetching order history', err);
        this.dataLoaded = true; 
      }
    });
  }

  scroll(arg0: number,arg1: number) {
    window.scroll(arg0,arg1);
  }
  
}
