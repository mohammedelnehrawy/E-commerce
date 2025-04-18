

import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, CurrencyPipe, NgClass, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
})
export class ProductsComponent implements OnInit {
  private readonly proService = inject(ProServiceService);
  private readonly wishlistService = inject(WishlistService);

  Products: WritableSignal<Iproducts[]> = signal([]);
  text: string = '';

  likedProductIds: Set<string> = new Set();

  ngOnInit(): void {
    this.getProData();
  }

  getProData(): void {
    this.proService.getAllProducts().subscribe({
      next: (res) => {
        this.Products.set(res.data);
      },
      error: () => {},
    });
  }

  addToCart(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.wishlistService.addItemToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.wishlistService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: () => {},
    });
  }

  addToList(id: string): void {
    this.wishlistService.addItemToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
    });
  }

  toggleLike(productId: string): void {
    if (this.likedProductIds.has(productId)) {
      this.likedProductIds.delete(productId);
    } else {
      this.likedProductIds.add(productId);
    }
  }

  isLiked(productId: string): boolean {
    return this.likedProductIds.has(productId);
  }

  onHeartClick(productId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleLike(productId);
    this.addToList(productId);
  }
}
  