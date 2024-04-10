import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this._WishlistService.getWishListItems().subscribe({
      next: (res) => {
        this.wishlistItemsCount = res.count;
      },
    });
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartItemsCount = res.numOfCartItems;
      },
    });
    this._AuthService.getUserInfo();
    this.userName = this._AuthService.userInfo.name;
    this._CartService.cartItemsCount.subscribe({
      next: (count) => {
        this.cartItemsCount = count;
      },
    });
    this._WishlistService.wishlistItemsCount.subscribe({
      next: (res: any) => {
        this.wishlistItemsCount = res;
      },
    });
  }
  // prop
  cartItemsCount: number = 0;
  wishlistItemsCount: number = 0;
  userName: string = '';
  @ViewChild('nav') nav!: ElementRef;
  @HostListener('window:scroll')
  onScroll() {
    if (scrollY > 100) {
      this._Renderer2.addClass(this.nav.nativeElement, 'px-4');
    } else {
      this._Renderer2.removeClass(this.nav.nativeElement, 'px-4');
    }
  }

  signout(): void {
    this._AuthService.signout();
  }
}
