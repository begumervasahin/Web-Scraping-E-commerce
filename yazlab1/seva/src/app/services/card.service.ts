import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public cardItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }


   getProducts() {
    return this.productList.asObservable();
  }

   //Sepete Ekle
   addToCard(product: any) {
    this.cardItemList.push(product);
    this.productList.next(this.cardItemList);
    this.getTotalPrice();
    console.log(this.cardItemList);
  }

  //Toplam Fiyat
  getTotalPrice():number {
    let grandTotal = 0;
    this.cardItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

   //Ürünü Sil
   removeCardItem(product: any) {
    this.cardItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cardItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cardItemList)//sepetin  silindikten sonra sıfırlanması
  }

    //Tüm Ürünleri Sil
    removeAllCard() {
      this.cardItemList = [];
      this.productList.next(this.cardItemList);
    }
}
