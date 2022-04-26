import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, } from 'rxjs/operators';

export interface Name {
  sex: 'male' | 'female',
  ru: string,
  en: string,
}

export interface Surname {
  sex: 'male' | 'female',
  ru: string,
  en: string,
}

export interface Country {
  ru: string,
  en: string,
  citiesRu: string[],
  citiesEn: string[],
}

export interface Street {
  ru: string,
  en: string,
}

export interface Phone {
  text: string
  format: 'ru' | 'en'
}

export interface Item {
  id: string,
  name: string,
  surname: string,
  address: string,
  phone: string,
}



@Injectable({
  providedIn: 'root'
})
export class TableService {
  private _selectedLang = 'en';
  errorsCount = 0;


  constructor(private afs: AngularFirestore, private http: HttpClient) {
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  DO() {
    // this.http.post('http://localhost:5000/api' + '/names', {}).subscribe(res => console.log(res));
    // this.http.post('http://localhost:5000/api' + '/surnames', {}).subscribe(res => console.log(res));
    // this.http.post('http://localhost:5000/api' + '/phones', {}).subscribe(res => console.log(res));
    // this.http.post('http://localhost:5000/api' + '/countries', {}).subscribe(res => console.log(res));
    // this.http.post('http://localhost:5000/api' + '/streets', {}).subscribe(res => console.log(res));
  }

  generate() {
    var name = '';
    var sex: 'male' | 'female';
    var surname = '';
    var phone = '';
    var country = '';
    var cities: any;
    var randomCity = '';
    var street;
    var newItem: Item;

    return this.getJSON('assets/data/names.json').pipe(
      switchMap(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        sex = randomItem.sex;
        if (this.selectedLang == 'en') name = randomItem.en;
        else name = randomItem.ru;
        newItem = { ...newItem, name: name };
        return of(newItem);
      }),
      switchMap(res => this.getJSON('assets/data/surnames.json').pipe(map(data => {
        data = data.filter((item: any) => item.sex == sex);
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') surname = randomItem.en;
        else surname = randomItem.ru;
        newItem = { ...res, surname: surname };
        return newItem;
      }))),
      switchMap(res => this.getJSON('assets/data/phones.json').pipe(map(data => {
        let filterItems = data.filter((item: any) => item.format == this.selectedLang);
        let randomItem = filterItems[Math.floor(Math.random() * filterItems.length)];
        phone = randomItem.text;
        newItem = { ...res, phone: phone };
        return newItem;
      }))),
      switchMap(res => this.getJSON('assets/data/countries.json').pipe(map(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') {
          country = randomItem.en;
          cities = randomItem.citiesEn;
        }
        else {
          country = randomItem.ru;
          cities = randomItem.citiesRu;
        }
        randomCity = cities[Math.floor(Math.random() * cities.length)];
        return res;
      }))),
      switchMap(res => this.getJSON('assets/data/streets.json').pipe(map(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') {
          street = randomItem.en;
        }
        else {
          street = randomItem.ru;
        }
        newItem = {
          ...res,
          id: Math.random().toString(36).substring(2, 12),
          address: `${country}, ${randomCity}, ${street}, ${Math.floor(Math.random() * 100 + 1)} - ${Math.floor(Math.random() * 30 + 1)}`,
        };
        return newItem;
      }))));
  }

  public get selectedLang() {
    return this._selectedLang;
  }
  public set selectedLang(value) {
    this._selectedLang = value;
  }
}
