import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../common/models/Product';
import { ProductService } from '../services/productService';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  fetchedData: boolean = false;

  product: Product = {} as Product;

  renderRating(rating: number) {
    return new Array(Math.floor(rating)).fill(0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService
        .getProductById(params.id)
        .subscribe((response: Product) => {
          this.product = response;
          this.fetchedData = true;
        });
    });
  }
}
