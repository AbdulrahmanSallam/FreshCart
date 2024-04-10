import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(Products: Product[], text: string): Product[] {
    return Products.filter((product) => {
      return product.title.toLowerCase().includes(text.toLowerCase());
    });
  }
}
