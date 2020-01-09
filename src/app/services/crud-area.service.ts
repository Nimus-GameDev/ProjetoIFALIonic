import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudAreaService {

  constructor(
    private firestore: AngularFirestore
  ) { }

    createArea(area) {
      return this.firestore.collection('areas').add(area);
    }

    readAreas() {
      return this.firestore.collection('areas').snapshotChanges();
    }

    updateArea(id, area) {
      return this.firestore.doc('areas/' + id).update(area);
    }

    remove(id) {
      return this.firestore.doc('areas/' + id).delete();
    }

}
