import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-bill',
  imports: [MatTableModule, MatDividerModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './bill.html',
  styleUrl: './bill.scss'
})
export class Bill implements OnInit, OnDestroy {

  private data!: any;

  private dataService = inject(DataService);
  private router = inject(Router);

  //TODO: Cambiar orderNumber por un ID autogenerado en firebase
  public orderNumber: string = '13';
  public date: string = '';

  public name!: string;
  public phone!: string;
  public bicycle!: string;
  public brand!: string;
  public color!: string;

  public observations: string = 'Ninguna'

  public orderDetails!: any;

  displayedColumns = ['service', 'brand', 'price', 'qty', 'total'];

  ngOnInit(): void {
    this.data = this.dataService.getData().subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          this.name = res.name,
            this.phone = res.phone,
            this.bicycle = res.bicycle,
            this.brand = res.brand,
            this.color = res.color,
            this.observations = res.observations,
            this.orderDetails = res.services;
        } else {
          this.router.navigate(['/new-order']);
        }
      }
    })

    let newDate = new Date();
    this.date = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }

  ngOnDestroy(): void {
    console.log(this.dataService)
    if (this.dataService) {
      this.data.unsubscribe();
    }
  }

  public print(): void {
    window.print();
  }

  public editOrder(): void {
    console.log('Editar orden de compra: ' + this.orderNumber)
  }
}