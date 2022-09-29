import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockService } from '../services/apiServices';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
     private apiServices:MockService) {


   }
productDetail:any
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.apiServices.getProductDetail(params.id).subscribe((res)=>{
        console.log("ress", res)
        this.productDetail = res;
        console.log(this.productDetail)
    })      
      console.log(params)
    })
  }

}
