import { CarouselModule } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { Icart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  cartDetails: Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {},
    });
  }

  removeItem(id: string): void {
    this.cartService.removeCartItem(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.toastrService.warning('itemRemoved successfully');
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.toastrService.success('Quantity isUpdated');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.cartDetails = {} as Icart;
          this.toastrService.error('freshCart is Empty');
          this.cartService.cartNumber.set(0);
          this.router.navigate(['/home']);

        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
