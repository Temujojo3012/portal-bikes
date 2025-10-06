import { Component } from '@angular/core';
import { Inventory } from "../inventory/inventory";
import { Form } from "../form/form";

@Component({
  selector: 'app-home',
  imports: [Inventory, Form],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
