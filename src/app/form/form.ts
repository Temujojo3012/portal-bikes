import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit{
  public form!: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm():void{
    this.form = this.formBuilder.group({
      name:'',
      sku: '',
      qty: '',
      price: 0,
    })
  }
}
