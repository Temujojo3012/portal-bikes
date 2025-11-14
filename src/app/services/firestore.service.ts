import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  getCollection(collectionName: string): Observable<any> {
    const itemsCollection = collection(this.firestore, collectionName);
    return collectionData(itemsCollection, { idField: 'id' }) as Observable<any>;
  }

  getDoc(collectionName: string, docName: string): Observable<any> {
    const itemDoc = doc(this.firestore, collectionName, docName);
    return docData(itemDoc, { idField: 'id' }) as Observable<any>;
  }

  addDoc(collectionName: string, data: any): void {
    const itemCollection = collection(this.firestore, collectionName);
    addDoc(itemCollection, data);
  }

  updateDoc(collectionName: string, docName: string, data: any): void {
    const itemDoc = doc(this.firestore, collectionName, docName);
    setDoc(itemDoc, data);
  }

  deleteDoc(collectionName: string, docId: string): void {
    const itemDoc = doc(this.firestore, collectionName, docId)
    deleteDoc(itemDoc);
  }
}
