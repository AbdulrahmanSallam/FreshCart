import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // get cart id from url
    this._ActivatedRoute.paramMap.subscribe({
      next: (params: any) => {
        this.cartId = params.get('id');
      },
    });
  }
  // properties
  cartId: string = '';
  msgError: string = '';
  // form
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });

  checkoutSubmit(): void {
    if (this.checkoutForm.valid) {
      this._CartService
        .checkoutSession(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (response) => {
            if ((response.status = 'success')) {
              window.open(response.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
