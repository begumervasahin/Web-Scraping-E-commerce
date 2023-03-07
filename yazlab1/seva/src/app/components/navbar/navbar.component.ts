import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //Sepette kaç adet ürün olduğunu gösterir
  public totalItem: number = 0;
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    //Sepete kaç adet ürün eklendiğimi gösterir
    this.cardService.getProducts().subscribe((data) => {
      this.totalItem = data.length;
    });
  }
}
