

// import { RouterLink } from '@angular/router';
// import { CategoriesService } from './../../core/services/Categories/categories.service';
// import {
//   Component,
//   inject,
//   OnInit,
//   signal,
//   WritableSignal,
// } from '@angular/core';
// import { ProServiceService } from '../../core/services/products/pro-service.service';
// import { Iproducts } from '../../shared/interfaces/IProducts';
// import { Category } from '../../shared/interfaces/category';
// import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
// import { CurrencyPipe } from '@angular/common';
// import { SearchPipe } from '../../shared/pipes/search.pipe';
// import { FormsModule } from '@angular/forms';
// import { CartService } from '../../core/services/cart.service';
// import { ToastrService } from 'ngx-toastr';
// import { WishlistService } from '../../core/services/wishlist/wishlist.service';
// import { NgClass } from '@angular/common';

// @Component({
//   selector: 'app-home',
//   imports: [CarouselModule, RouterLink, FormsModule, CurrencyPipe,NgClass, SearchPipe],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss',
// })
// export class HomeComponent implements OnInit {
//   private readonly proService = inject(ProServiceService);
//   private readonly cateService = inject(CategoriesService);
//   private readonly cartService = inject(CartService);
//   private readonly toastrService = inject(ToastrService);
//   private readonly wishlistService = inject(WishlistService);

//   Products: WritableSignal<Iproducts[]> = signal([]);
//   Category: WritableSignal<Category[]> = signal([]);

//   likedProductIds: Set<string> = new Set();

//   toggleLike(productId: string): void {
//     if (this.likedProductIds.has(productId)) {
//       this.likedProductIds.delete(productId);
//     } else {
//       this.likedProductIds.add(productId);
//     }
//   }

//   isLiked(productId: string): boolean {
//     return this.likedProductIds.has(productId);
//   }

//   customMainSlider: OwlOptions = {
//     loop: true,
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: false,
//     dots: false,
//     autoplay: true,
//     autoplayHoverPause: true,
//     autoplayTimeout: 700,
//     navSpeed: 700,
//     navText: ['', ''],
//     items: 1,
//     nav: true,
//   };

//   customOptions: OwlOptions = {
//     loop: true,
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: false,
//     dots: true,
//     autoplay: true,
//     autoplayHoverPause: true,
//     autoplayTimeout: 1000,
//     navSpeed: 700,
//     navText: ['', ''],
//     responsive: {
//       0: {
//         items: 1,
//       },
//       400: {
//         items: 2,
//       },
//       740: {
//         items: 3,
//       },
//       940: {
//         items: 5,
//       },
//     },
//     nav: false,
//   };
//   Prod: any;
//   text: string = '';

//   ngOnInit(): void {
//     this.getProData();
//     this.getCategoryData();
//   }

//   getProData(): void {
//     this.proService.getAllProducts().subscribe({
//       next: (res) => {
//         this.Products.set(res.data);
//       },
//       error: (res) => {},
//     });
//   }
//   getCategoryData(): void {
//     this.cateService.getAllCateg().subscribe({
//       next: (res) => {
//         console.log(res.data);
//         this.Category.set(res.data);
//       },
//     });
//   }

//   addToCart(id: string, event: MouseEvent): void {
//     event.stopPropagation(); 
//     this.cartService.addProductToCart(id).subscribe({
//       next: (res) => {
//         if (res.status === 'success') {
//           this.toastrService.success(res.message, 'freshCart');
//           this.cartService.cartNumber.set(res.numOfCartItems);
//         }
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
  

//   addToList(id: string): void {
//     this.wishlistService.addItemToWishlist(id).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.wishlistService;
//       },
//       error: (res) => {},
//     });
//   }
// }



import { RouterLink } from '@angular/router';
import { CategoriesService } from './../../core/services/Categories/categories.service';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProServiceService } from '../../core/services/products/pro-service.service';
import { Iproducts } from '../../shared/interfaces/IProducts';
import { Category } from '../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgClass } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    FormsModule,
    CurrencyPipe,
    NgClass,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly proService = inject(ProServiceService);
  private readonly cateService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  Products: WritableSignal<Iproducts[]> = signal([]);
  Category: WritableSignal<Category[]> = signal([]);

  likedProductIds: Set<string> = new Set();

  toggleLike(productId: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.likedProductIds.has(productId)) {
      this.likedProductIds.delete(productId);
    } else {
      this.likedProductIds.add(productId);
    }
  }

  isLiked(productId: string): boolean {
    return this.likedProductIds.has(productId);
  }

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 700,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  Prod: any;
  text: string = '';

  ngOnInit(): void {
    this.getProData();
    this.getCategoryData();
  }

  getProData(): void {
    this.proService.getAllProducts().subscribe({
      next: (res) => {
        this.Products.set(res.data);
      },
      error: () => {},
    });
  }

  getCategoryData(): void {
    this.cateService.getAllCateg().subscribe({
      next: (res) => {
        this.Category.set(res.data);
      },
    });
  }

  addToCart(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'freshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
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
}
