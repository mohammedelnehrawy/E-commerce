


import { IWishlist } from './../../shared/interfaces/i-wishlist';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  wishList: WritableSignal<IWishlist[]> = signal([]);

  ngOnInit(): void {
    this.getListData();
  }

  getListData(): void {
    this.wishlistService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.wishList.set(res.data);
      },
      error: (res) => {},
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'freshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (res) => {},
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeCartItem(id).subscribe({
      next: () => {

        this.wishList.set(this.wishList().filter(item => item._id !== id));
        this.toastrService.warning('Item removed successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
