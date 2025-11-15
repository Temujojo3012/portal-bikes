import { Component } from '@angular/core';
import { ListBill } from '../list-bill/list-bill';

@Component({
  selector: 'app-home',
  imports: [ListBill],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
