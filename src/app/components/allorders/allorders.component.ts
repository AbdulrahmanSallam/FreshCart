import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/core/services/cart.service';
import { LimitTextPipe } from 'src/app/core/pipes/limit-text.pipe';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, LimitTextPipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent {
  constructor(
    private _CartService: CartService,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this._AuthService.getUserInfo();
    this._CartService.getAllOrders(this._AuthService.userInfo.id).subscribe({
      next: (res: any) => {
        this.allOrders = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  // prop
  allOrders: any[] = [];
}
