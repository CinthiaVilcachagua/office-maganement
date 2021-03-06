import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  public info = [];
  public Visitor = {
    nombre: '',
    correo: '',
    empresaPorVisitada: '',
    persona: '',
    empresaVisitante: '',
    id:"",
    fechaDeSalida:''
  };

  public invitados = {
    nombreDvistante: '',
    fechaDeLlegada: '',
    horaDeLlegada: '',
    email: '',
    empresaVisitada: '',
    notas: '',

  }

  public visitantesData = new BehaviorSubject([]);
  visitantes = this.visitantesData.asObservable();

  constructor(public firestore: AngularFirestore,
              public auth: AngularFireAuth) { }

  getVisitors() {
    return this.firestore.collection('visitors').valueChanges();
  }

  registerWithEmail(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }
  
  addVisitors(name, email, companyVisitador, comunero, comuneroVisitador) {
  const newObj = {
    ...this.Visitor,
    nombre: name,
    correo: email,
    empresaPorVisitada: companyVisitador,
    persona: comunero,
    empresaVisitante: comuneroVisitador,
  };
  this.firestore.collection('visitors').add(newObj);
  this.info.push(newObj);
  
  }

// getCollection(){
//   this.firestore.collection('visitors').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, ' => ', doc.data());
//     });
// });
// }

  getDateForVisitorOut(obj: any, id: any) {
  const gettingData = this.getVisitors();
  this.info.push(gettingData);

  this.info = this.info.map(ele => {
    let objModif;
    if (ele.id === id) {
      objModif = {
        ...obj,
        fechaDeSalida: new Date(),
    };
    console.log(objModif.fechaDeSalida);

      return objModif;
  }
    return ele;
  });

  }
  
  addInvitacion(nombre, fecha, hora, email, empresavisitada, notas){
  const newObjInvitados = {
    ...this.invitados,
    nombreDvistante: nombre,
    fechaDeLlegada: fecha,
    horaDeLlegada: hora,
    email: email,
    empresaVisitada: empresavisitada,
    notas: notas,
  }
  this.firestore.collection('invitados').add(newObjInvitados);
  }


}
