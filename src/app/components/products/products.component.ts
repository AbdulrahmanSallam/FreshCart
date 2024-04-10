import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { LimitTextPipe } from 'src/app/core/pipes/limit-text.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LimitTextPipe,
    FormsModule,
    SearchPipe,
    NgxPaginationModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    //  products
    this._ProductsService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.page = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err: HttpErrorResponse) => {
        console.log('products', err);
      },
    });
    this._WishlistService.getWishListItems().subscribe({
      next: (res) => {
        this.wishlistItems = res.data.map((item: Product) => {
          return item.id;
        });
      },
    });
  }
  // prop
  search: string = '';
  products: Product[] = [];
  wishlistItems: string[] = [];
  pageSize: number = 0;
  page: number = 0;
  total: number = 0;
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
  pageChanged(event: any) {
    this._ProductsService.getProducts(event).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.page = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err: HttpErrorResponse) => {
        console.log('products', err);
      },
    });
  }
}
