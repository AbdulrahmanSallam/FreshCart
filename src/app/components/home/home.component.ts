import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/core/interfaces/product';
import { CB } from 'src/app/core/interfaces/c-b';
import { ProductsService } from 'src/app/core/services/products.service';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { RouterLink } from '@angular/router';
import { LimitTextPipe } from 'src/app/core/pipes/limit-text.pipe';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    RouterLink,
    LimitTextPipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
    private _Renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    // categories
    this._CategoriesService.getCategories().subscribe({
      next: (response: any) => {
        this.gategories = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this._WishlistService.getWishListItems().subscribe({
      next: (res) => {
        this.wishlistItems = res.data.map((item: Product) => {
          return item.id;
        });
      },
    });
    //  products
    this._ProductsService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log('products', err);
      },
    });
  }
  // prop
  search: string = '';
  products: Product[] = [];
  gategories: CB[] = [];
  wishlistItems: string[] = [];
  // main carousal optionss
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navText: ['', ''],
    dots: true,
    navSpeed: 500,
    autoplay: true,
    items: 1,
    nav: false,
  };
  // categories carousal options
  CategoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navText: ['', ''],
    dots: false,
    navSpeed: 500,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
    },
    nav: true,
  };
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
  addToWishlist(ProductId: string): void {
    this._WishlistService.addToWishList(ProductId).subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.wishlistItems = res.data;
          this._WishlistService.wishlistItemsCount.next(res.data.length);
          this._ToastrService.success(
            'Product added successfully to your wishlist'
          );
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log('addcart', err);
      },
    });
  }
  removeFromWishlist(ProductId: string): void {
    this._WishlistService.removeItem(ProductId).subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.wishlistItems = res.data;
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
  }
  inWishlist(productId: string) {
    return this.wishlistItems.includes(productId);
  }
}
