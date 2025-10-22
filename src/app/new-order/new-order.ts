import { FirestoreService } from './../services/firestore.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from "@angular/material/table";
import { CurrencyPipe } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


export interface IServiceOption {
  service: string;
  brand: string;
  price: number;
  qty?: number;
}

export interface IOrder {
  name: string;
  email: string;
  phone?: string;
  bicycle?: string;
  brand?: string;
  color?: string;
  services: Array<IServiceOption>;
}
@Component({
  selector: 'app-new-order',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule,
    MatTable,
    CurrencyPipe
  ],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss'
})

export class NewOrder implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild(MatTable) table!: MatTable<any>;

  public displayedColumns: string[] = ['service', 'brand', 'price', 'qty', 'total', 'actions']

  public isMobile: boolean = false;

  public options!: Array<IServiceOption>;
  public filteredOptions!: Array<IServiceOption>;
  public selectedOptions: Array<IServiceOption> = [];
  public form!: FormGroup;
  public formProduct!: FormGroup;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 768;
  }

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;

    this.buildForm();
    this.getItems();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
      bicycle: '',
      brand: '',
      color: '',
      observations: ''
    });
    this.formProduct = this.formBuilder.group({
      service: '',
      brandProduct: { value: '', disabled: true },
      price: 0,
      qty: 0,
    });
  }

  public getItems(): void {
    this.firestoreService.getItems('products').subscribe(items => {
      this.options = items;
      this.filteredOptions = [...this.options];
    });
  }

  public filter(): void {
    const value = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(option => option.service.toLowerCase().includes(value));
  }

  public selectedOption(): IServiceOption | undefined {
    if (!this.options) {
      return undefined;
    }
    let option = this.options.find(option => option.service === this.formProduct.value.service);
    return option;
  }

  public addService(): void {
    if (!this.formProduct.value.service) {
      return;
    }
    let option = this.options.filter(option => option.service === this.formProduct.value.service);
    this.selectedOptions.push({ ...option[0], qty: this.formProduct.value.qty });
    this.formProduct.reset();
    this.table.renderRows();
  }

  public removeService(index: number): void {
    this.selectedOptions.splice(index, 1);
    this.table.renderRows();
  }

  public addOrder(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let orderDetails = { ...this.form.value, services: this.selectedOptions };
    this.dataService.sendData(orderDetails);

    this.router.navigate(['/bill']);
  }
}
