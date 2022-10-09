import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../common/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./../app.component.scss', './product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor() {}
  @Input() product: Product = {} as Product;

  ngOnInit(): void {}

  renderRating(rating: number) {
    return new Array(Math.floor(rating)).fill(0);
  }
}
