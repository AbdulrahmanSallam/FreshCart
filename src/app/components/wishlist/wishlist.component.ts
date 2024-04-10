import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LimitTextPipe } from 'src/app/core/pipes/limit-text.pipe';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LimitTextPipe, FormsModule, SearchPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
    private _Renderer2: Renderer2,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    //  products
    this._WishlistService.getWishListItems().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log('wishlist', err);
      },
    });
  }
  // prop
  search: string = '';
  products: Product[] = [];
  // meth
  addToCart(ProductId: string, btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._CartService.addProductToCart(ProductId).subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this._Renderer2.removeAttribute(btn, 'disabled');
          this._ToastrService.success(res.message);
          console.log(res);
          this._CartService.cartItemsCount.next(res.numOfCartItems);
        }
      },
      error: (err: HttpErrorResponse) => {
        this._Renderer2.removeAttribute(btn, 'disabled');
        console.log('addcart', err);
      },
    });
  }
  removeFromWishlist(ProductId: string): void {
    if (this.products.length > 0) {
      this._WishlistService.removeItem(ProductId).subscribe({
        next: (res: any) => {
          this.ngOnInit();
          if (res.status == 'success') {
            this._WishlistService.wishlistItemsCount.next(res.data.length);
            this._ToastrService.success(
              'Product removed successfully form  your wishlist'
            );
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log('addcart', err);
        },
      });
    } else {
      this._Router.navigate(['/home']);
    }
  }
}
