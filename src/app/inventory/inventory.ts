import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit {

  public dataSource!: any;

  constructor(
    private firestroe: Firestore
  ) { }

  ngOnInit(): void {
    this.getItems()
      .subscribe(
        {
          next: (data: Array<any>) => {
            data.sort((a, b) => a.sku - b.sku);
            this.dataSource = data;
          }
        });
  }

  getItems(): Observable<any> {
    const itemsCollection = collection(this.firestroe, 'products');
    return collectionData(itemsCollection, {}) as Observable<any>
  }

  public displayedColumms = ['SKU', 'name', 'stock', 'price', 'tvalue', 'actions'];

}
