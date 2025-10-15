import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-inventory',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit {

  public dataSource!: any;

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.firestoreService.getItems('products')
      .subscribe(
        {
          next: (data: Array<any>) => {
            data.sort((a, b) => a.sku - b.sku);
            this.dataSource = data;
          }
        });
  }

  public displayedColumms = ['SKU', 'name', 'stock', 'price', 'tvalue', 'actions'];

}
