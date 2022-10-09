import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../common/models/Product';
import { ProductService } from '../services/productService';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../app.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  indexTab: number = 0;
  error: null | string = null;
  isFetchedData: boolean = false;

  private subjectInput = new Subject<string>();

  private subjectCategory = new Subject<{
    indexTab: number;
    category: string;
  }>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isFetchedData = false;
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.isFetchedData = true;
        this.products = products;
      },
      (err) => {
        this.isFetchedData = true;
        this.error = err.message;
      }
    );

    // register input change

    this.subjectInput
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((textSearch: string) => {
        this.isFetchedData = false;
        this.productService.getProductByText(textSearch).subscribe(
          (products: Product[]) => {
            this.isFetchedData = true;
            this.products = products;
          },
          (err) => {
            this.isFetchedData = true;
            this.error = err.message;
          }
        );
      });

    // register click tab

    this.subjectCategory
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((data: { indexTab: number; category: string }) => {
        this.productService.getByCategory(data.category).subscribe(
          (products: Product[]) => {
            this.isFetchedData = true;
            this.products = products;
          },
          (err) => {
            this.isFetchedData = true;
            this.error = err.message;
          }
        );
      });
  }

  ngOnDestroy(): void {
    this.subjectInput.unsubscribe();
  }

  getProductByText(value: string | Event) {
    let actualText = '';
    if (typeof value === 'string') {
      actualText = value.trim();
    } else {
      const input = value.target as HTMLInputElement;
      actualText = input.value;
    }

    this.subjectInput.next(actualText);
  }

  getByCategory(search: string, indexTab: number) {
    this.indexTab = indexTab;
    this.isFetchedData = false;
    this.subjectCategory.next({
      category: search,
      indexTab,
    });
  }
}
