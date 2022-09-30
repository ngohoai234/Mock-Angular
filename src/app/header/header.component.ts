import { Component, OnInit } from '@angular/core';
import { MockService } from '../services/apiServices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.scss'],
})
export class HeaderComponent implements OnInit {
  listData: any = [];
  indexTab: number = 0;

  constructor(private apiServices: MockService) {}
  ngOnInit(): void {
    this.apiServices.getAllProducts().subscribe((res) => {
      this.listData = res;
    });
  }

  onSubmitForm(value: { search: string }) {
    this.apiServices.getSearchProducts(value.search).subscribe((res) => {
      this.listData = res;
    });
  }

  onSubmitFormVintage(search: string, indexTab: number) {
    this.indexTab = indexTab;
    this.apiServices.getSearchProductsVintage(search).subscribe((res) => {
      this.listData = res;
    });
  }
}
