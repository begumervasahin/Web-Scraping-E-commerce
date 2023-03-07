import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from './../../services/card.service';
import { ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  ProductMdl: Product[];
  categories: Category[] = [];
  categoryId: ''; //Seçiniz kısmı görünmesi için.
  public products: Product[] = [];
  totalLength: any;
  page: number = 1;
  pageNumber: number = 3;
  filterText = '';
  cardService: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProductAddForm();
    this.getByCategoryId();
  }

  //Form ekranı
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsCategoryId(params['categoryId']);
      } else {
        //Tüm Ürünleri getirir
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

  //ekleme,
  addProduct() {
    if (this.productAddForm.valid) {
      let ProductMdl = Object.assign({}, this.productAddForm.value);
      this.productService.addAllProduct(ProductMdl).subscribe(
        (data) => {
          this.toastrService.success('Ürün  başarıyla eklendi...');
          this.router.navigate(['/products']);
          console.log(data);
        },
        (err) => {
          console.log(err.error.message);
        }
      );
    } else {
      this.toastrService.error('Eksik bilgi');
    }
  }

 
  getByCategoryId() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
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

  //Product Sil
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

