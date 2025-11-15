import { Component } from '@angular/core';
import { FormProducts } from './form-products/form-products';
import { Inventory } from './inventory/inventory';

@Component({
  selector: 'app-work-services',
  imports: [FormProducts, Inventory],
  templateUrl: './work-services.html',
  styleUrl: './work-services.scss'
})
export class WorkServices {

}
