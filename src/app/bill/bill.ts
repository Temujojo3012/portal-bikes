import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CurrencyPipe],
  templateUrl: './bill.html',
  styleUrl: './bill.scss'
})
export class Bill implements OnInit, OnDestroy {

  private data!: Subscription;

  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private firestoreService: FirestoreService = inject(FirestoreService);

  public orderData = {
    dateBill: '',
    orderNumber: 0,
    name: '',
    phone: '',
    email: '',
    bicycle: '',
    brand: '',
    color: '',
    observations: '',
    services: []
  }
  public date: string = '';

  public services!: any;

  displayedColumns = ['service', 'brand', 'price', 'qty', 'total'];

  ngOnInit(): void {
    this.firestoreService.getDoc('orders', 'counters').subscribe({
      next: (data) => {
        this.orderData.orderNumber = data.bill_number + 1;
      }
    })

    this.data = this.dataService.getData().subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          this.orderData.name = res.name;
          this.orderData.phone = res.phone;
          this.orderData.email = res.email ? res.email : 'No especificado';
          this.orderData.bicycle = res.bicycle ? res.bicycle : 'No especificado';
          this.orderData.brand = res.brand ? res.brand : 'No especificada';
          this.orderData.color = res.color ? res.color : 'No especificado';
          this.orderData.observations = res.observations ? res.observations : 'Sin observaciones';
          this.services = res.services;
        } else {
          this.router.navigate(['/new-order']);
        }
      }
    })

    let newDate = new Date();
    this.date = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }

  ngOnDestroy(): void {
    if (this.dataService) {
      this.data.unsubscribe();
    }
  }

  public print(): void {
    this.orderData = { ...this.orderData, services: this.services, dateBill: this.date };
    this.firestoreService.addDoc('bills', this.orderData);
    this.firestoreService.updateDoc('orders', 'counters', { bill_number: this.orderData.orderNumber });
    this.router.navigate(['new-order']);
    this.dataService.clearData();
    window.print();
  }

  public editOrder(): void {
    this.orderData = { ...this.orderData, services: this.services };
    this.dataService.sendData(this.orderData);
    this.router.navigate(['new-order']);
  }

  public getTotal(): number {
    let total = 0;
    this.services.forEach((service: any) => {
      total += service.price * service.qty;
    });
    return total | 0;
  }
}