import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProductDetails();
  }

  //cimri sayfası
  getAllProductDetails() {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProductDetails(params['pId']).subscribe((data) => {
        this.product = data;
      });
    });
  }
}
