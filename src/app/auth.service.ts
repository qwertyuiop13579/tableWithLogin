
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface UserInfo {
  id: string,
  name: string,
  email: string,
  password: string,
  status: string,
  dateReg: number,
  dateLog: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection!: AngularFirestoreCollection<UserInfo>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<UserInfo>('users');
  }

  getUsers() {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  signUp(user: UserInfo): Observable<DocumentReference> {
    return from(this.usersCollection.add(user));
  }

  login(email: string, password: string) {
    return this.afs.collection<UserInfo>('users',
      ref => ref
        .where('email', '==', email)
        .where('password', '==', password))
      .valueChanges({ idField: '$id' });
  }

  updateUser(user: UserInfo): Observable<void> {
    return from(
      this.usersCollection.doc<UserInfo>(`${user.id}`).update({
        name: '1',
      }),
    );
  }

  blockUser(id: string): Observable<void> {
    return from(
      this.usersCollection.doc(id).update({
        status: 'block',
      }),
    );
  }

  unblockUser(id: string): Observable<void> {
    return from(
      this.usersCollection.doc(id).update({
        status: 'ok',
      }),
    );
  }

  deleteUser(id: string) {
    return from(this.usersCollection.doc(id).delete());
  }

  findUser(email: string) {
    return this.afs.collection<UserInfo>('users',
      ref => ref
        .where('email', '==', email))
      .valueChanges({ idField: '$id' });
  }

  setToken(token: string) {
    localStorage.setItem('user_token', token);
  }
  deleteToken() {
    localStorage.removeItem('user_token');
  }

  signOut() {
    this.deleteToken();
  }

  isAuth() {
    return !!localStorage.getItem('user_token');
  }


}
