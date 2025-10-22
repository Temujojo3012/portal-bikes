import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-form-products',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-products.html',
  styleUrl: './form-products.scss'
})
export class FormProducts implements OnInit {
  public form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      service: '',
      brand: '',
      qty: '',
      price: 0,
    })
  }

  public addItem(): void {
    if (this.form.invalid) {
      return;
    }
    this.firestoreService.addItem('products', this.form.value);
    this.form.reset();
  }
}
