import { Product } from 'src/app/models/product';
import { CardService } from './../../services/card.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  
  totalLength: any;
  page: number = 1;
 pageNumber: number = 20;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    //CategoryId'ye göre Products getirme
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsCategoryId(params['categoryId']);
      } else {
        //Tüm Products
        this.getProducts();
      
        this.totalLength = params.length;
      }
    });
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      //Adet ve Toplam kısmı
      this.products.forEach((a) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  
  getProductsCategoryId(categoryId: number) {
    this.productService
      .getAllProductsCategoryId(categoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }

  //Daha fazla göster
  inc() {
    if (this.pageNumber < this.products.length) {
      this.pageNumber = this.pageNumber + 3;
    }
  }

  //Daha az göster
  des() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 3;
    }
  }

  //ürün Sil
  clearCard(p: Product) {
    this.productService.getClearProduct(p).subscribe((a) => {
      let index = this.products.indexOf(p);
      this.products.splice(index, 1);
      this.toastrService.error('Ürün başarılı bir şekilde silindi.');
    });
  }

  //Sepete Ekle
  addToCard(p: Product) {
    this.cardService.addToCard(p);
    this.toastrService.success('Ürün sepete eklendi.');
  }
}

