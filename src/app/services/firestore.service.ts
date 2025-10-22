import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  getItems(collectionName: string): Observable<any> {
    const itemsCollection = collection(this.firestore, collectionName);
    return collectionData(itemsCollection, {idField: 'id'}) as Observable<any>
  }

  addItem(collectionName: string, data: any): void {
    const itemCollection = collection(this.firestore, collectionName);
    addDoc(itemCollection, data);
  }
}
