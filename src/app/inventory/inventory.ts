import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-inventory',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory {

  public dataSource = [{
    sku: 'SKU-001',
    name: 'Monitor LED 27"',
    qty: 1,
    price: 189990,
  },
  {
    sku: 'SKU-002',
    name: 'Teclado mecánico RGB"',
    qty: 2,
    price: 75990,
  },
  {
    sku: 'SKU-003',
    name: 'Mouse inalámbrico"',
    qty: 2,
    price: 25990,
  }];

  public displayedColumms = ['SKU', 'name', 'stock', 'price', 'tvalue', 'actions'];

}
