import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params: any) => {
        let productId: any = params.get('id');
        this.productId = productId;
      },
    });
    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (response: any) => {
        this.productInfo = response.data;
        console.log(response);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  // prop
  productInfo: Product = {} as Product;
  productId: string = ``;
  wishlistItems: string[] = [];
  // carousal
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  addToCart(productId: string): void {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: any) => {
        this._ToastrService.success(response.message);
      },
      error: (err: HttpErrorResponse) => {
        this._ToastrService.error(err.message);
      },
    });
  }
  addToWishlist(ProductId: string): void {
    this._WishlistService.addToWishList(ProductId).subscribe({
      next: (res: any) => {
        if (res.status == 'success') {
          this.wishlistItems = res.data;
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
