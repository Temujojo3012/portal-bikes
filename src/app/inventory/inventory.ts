import { Component, OnInit, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FirestoreService } from '../services/firestore.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditDialog } from '../shared/edit-dialog/edit-dialog';

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

  private firestoreService: FirestoreService = inject(FirestoreService);
  readonly dialog: MatDialog = inject(MatDialog);

  public displayedColumms: Array<string> = ['service', 'brand', 'price', 'stock', 'actions'];
  public isMobile: boolean = false;
  public dataSource: Array<any> = [];

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
            this.dataSource = data;
            this.dataSource.sort((a, b) => a.service.localeCompare(b.service));
          }
        });
  }

  public deleteItem(id: string): void {
    //TODO: añadir alerta de querer borrar items
    this.firestoreService.deleteDoc('products', id);
  }

  editItem(id: string): void {
    let itemFind = this.dataSource.find((a) => a.id === id);
    const dialogRef = this.dialog.open(EditDialog, { data: itemFind, id: id });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        this.firestoreService.updateDoc('products', data.id, data.data);
      }
    })

  }

}
