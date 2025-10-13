import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-bill',
  imports: [MatTableModule, MatDividerModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './bill.html',
  styleUrl: './bill.scss'
})
export class Bill implements OnInit {
  public orderNumber: string = '13';
  public date: string = '';

  public name: string = 'Juan Mendoza';
  public phone: string = '';
  public bicycle: string = 'Montaña';
  public brand: string = 'Specialyzed';
  public color: string = 'Rojo';

  public observations: string = ''

  public orderDetails = [{ //datasource
    description: 'Enrayado rueda delantera',
    brand: '',
    price: 10000,
    qty: 1
  }, {
    description: 'Pastillas de freno',
    brand: 'Shimano',
    price: 9500,
    qty: 2
  }, {
    description: 'Ajuste cambio',
    brand: '',
    price: 8000,
    qty: 1
  }, {
    description: 'Neumático aro 24',
    brand: 'Maxis',
    price: 10000,
    qty: 3
  },];

  displayedColumns = ['description', 'brand', 'price', 'qty', 'total'];

  ngOnInit(): void {
    let newDate = new Date('9/10/2025');
    this.date = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }

  public print() :void{
    window.print();
  }

  public editOrder():void{
    console.log('Editar orden de compra: ' + this.orderNumber )
  }
}