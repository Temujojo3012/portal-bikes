import { FirestoreService } from './../services/firestore.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from "@angular/material/table";
import { CurrencyPipe } from '@angular/common';


export interface IServiceOption {
  service: string;
  brand: string;
  price: number;
  qty?: number;
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

  public options!: Array<IServiceOption>;
  /*
    *= [
    *{ service: 'Limpieza', brand: 'Propia', price: 10000 },
    *{ service: 'Ajuste de frenos', brand: 'Propia', price: 6000 },
    *{ service: 'Ajuste de cambios', brand: 'Propia', price: 8000 },
    *{ service: 'Revisión general', brand: 'Propia', price: 5000 },
    *{ service: 'Reparación de pinchazos', brand: 'Propia', price: 7000 },
    *{ service: 'Instalación de accesorios', brand: '', price: 4000 }
    *];
  */
  public filteredOptions!: Array<IServiceOption>; //? = [...this.options];
  public selectedOptions: Array<IServiceOption> = [];
  public form!: FormGroup;
  public formProduct!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
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
    console.log(this.selectedOptions);
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
    //TODO: compartir con vista bill y guardar en firestore
    console.log(orderDetails);
  }
}
