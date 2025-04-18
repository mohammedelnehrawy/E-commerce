import { CartService } from './../../core/services/cart.service';
import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin = input<boolean>(true);

  private readonly cartService = inject(CartService);
  countNumber:Signal<number> = computed( ()=> this.cartService.cartNumber());

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });

    
  }

  readonly authService = inject(AuthService);
}
