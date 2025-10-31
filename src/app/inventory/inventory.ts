import { Component, OnInit, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FirestoreService } from '../services/firestore.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-inventory',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class Inventory implements OnInit {

  public displayedColumms = ['service', 'price', 'stock', 'actions'];
  public isMobile: boolean = false;

  public dataSource!: any;

  private firestoreService: FirestoreService = inject(FirestoreService);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 768;
    this.firestoreService.getCollection('products')
      .subscribe(
        {
          next: (data: Array<any>) => {
            data.sort((a, b) => a.sku - b.sku);
            this.dataSource = data;
          }
        });
  }


}
