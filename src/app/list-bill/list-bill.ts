import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-bill',
  imports: [CurrencyPipe, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './list-bill.html',
  styleUrl: './list-bill.scss'
})
export class ListBill implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);

  public dataSource: Array<any> = [];

  displayedColumns: string[] = ['orderNumber', 'dateBill', 'details', 'services', 'actions'];
  ngOnInit(): void {
    this.firestoreService.getCollection('bills')
      .subscribe(
        {
          next: (data: Array<any>) => {
            this.dataSource = data;
            this.dataSource.sort((a, b) => b.orderNumber - a.orderNumber);
            console.log(this.dataSource);
          }
        });
  }

  getTotal(services: Array<any>): number {
    let total = 0;
    services.forEach(service => {
      total += service.price * service.qty;
    });
    return total;
  }
}
