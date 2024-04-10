import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { CB } from 'src/app/core/interfaces/c-b';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private _CategoriesService: CategoriesService) {}
  // properties
  categories: CB[] = [];
  subcategories: CB[] = [];
  SubcategoryReady: boolean = false;
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  getSubategories(categoryId: string): void {
    this._CategoriesService.getSubgategory(categoryId).subscribe({
      next: (res: any) => {
        this.subcategories = res.data;
        this.SubcategoryReady = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
