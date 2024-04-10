import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartData } from 'src/app/core/interfaces/cart-data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private _CartService: CartService,
    private _Router: Router,
    private _Renderer2: Renderer2
  ) {}
  // properties
  cartData: CartData = {} as CartData;

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res: any) => {
        this.cartData = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeProduct(productId: string): void {
    this._CartService.removeProduct(productId).subscribe({
      next: (res: any) => {
        this.cartData = res;
        this._CartService.cartItemsCount.next(res.numOfCartItems);
        if (this.cartData.data.products.length < 1) {
          this._Router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        console.log('error', err);
      },
    });
  }

  updateProductQuantity(
    productId: string,
    count: number,
    btn1: HTMLButtonElement,
    btn2: HTMLButtonElement
  ): void {
    this._Renderer2.setAttribute(btn1, 'disabled', 'true');
    this._Renderer2.setAttribute(btn2, 'disabled', 'true');
    if (count > 0) {
      this._CartService.updateProductQuantity(productId, count).subscribe({
        next: (res: any) => {
          this.cartData = res;
          this._Renderer2.removeAttribute(btn1, 'disabled');
          this._Renderer2.removeAttribute(btn2, 'disabled');
        },
        error: (err: any) => {
          console.log(err);
          this._Renderer2.removeAttribute(btn1, 'disabled');
          this._Renderer2.removeAttribute(btn2, 'disabled');
        },
      });
    } else {
      this.removeProduct(productId);
    }
  }

  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res: any) => {
        this._Router.navigate(['/home']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
