import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.scss'
})
export class EditDialog implements OnInit {

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditDialog>);

  public form!: FormGroup;
  private formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      service: this.data.service,
      brand: this.data.brand,
      qty: this.data.qty,
      price: this.data.price
    })
  }

  editProduct(): void {
    let variable = { data: this.form.value, id: this.data.id }
    this.dialogRef.close(variable);
  }
}
