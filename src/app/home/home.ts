import { Component } from '@angular/core';
import { Inventory } from "../inventory/inventory";
import { FormProducts } from "../form-products/form-products";

@Component({
  selector: 'app-home',
  imports: [Inventory, FormProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
