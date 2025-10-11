import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-order',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss'
})
export class NewOrder implements OnInit {

  public form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
      bicycle: '',
      brand: '',
      color: ''
    });
  }

}
