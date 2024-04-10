import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BrandsService } from 'src/app/core/services/brands.service';
import { CB } from 'src/app/core/interfaces/c-b';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  constructor(private _BrandsService: BrandsService) {}
  allBrands: CB[] = [];
  brand: CB = {} as CB;
  brandDetailsReady: boolean = false;

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (response: any) => {
        this.allBrands = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  getSpecificBrand(productId: string): void {
    this._BrandsService.getSpecificBrand(productId).subscribe({
      next: (response: any) => {
        this.brand = response.data;
        this.brandDetailsReady = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
