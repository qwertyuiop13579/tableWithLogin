import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, interval, merge, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

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
  selectedLang = 'en';
  errorsCount = 0;


  constructor(private afs: AngularFirestore, private http: HttpClient) {
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  generate() {
    var name = '';
    var surname = '';
    var phone = '';
    var country = '';
    let cities: any;
    var randomCity = '';
    var street;
    var newItem: Item;

    return this.getJSON('../assets/data/names.json').pipe(
      switchMap(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') name = randomItem.en;
        else name = randomItem.ru;
        newItem = { ...newItem, name: name };
        return of(newItem);
      }),
      switchMap(res => this.getJSON('../assets/data/surnames.json').pipe(map(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') surname = randomItem.en;
        else surname = randomItem.ru;
        newItem = { ...res, surname: surname };
        return newItem;
      }))),
      switchMap(res => this.getJSON('../assets/data/phones.json').pipe(map(data => {
        let filterItems = data.filter((item: any) => item.format == this.selectedLang);
        let randomItem = filterItems[Math.floor(Math.random() * filterItems.length)];
        phone = randomItem.text;
        newItem = { ...res, phone: phone };
        return newItem;
      }))),
      switchMap(res => this.getJSON('../assets/data/countries.json').pipe(map(data => {
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
      switchMap(res => this.getJSON('../assets/data/streets.json').pipe(map(data => {
        let randomItem = data[Math.floor(Math.random() * data.length)];
        if (this.selectedLang == 'en') {
          street = randomItem.en;
        }
        else {
          street = randomItem.ru;
        }
        newItem = {
          ...res,
          id: Math.random().toString(36).substring(2, 9),
          address: `${country}, ${randomCity}, ${street}, ${Math.floor(Math.random() * 100 + 1)} - ${Math.floor(Math.random() * 30 + 1)}`,
        };
        return newItem;
      }))));
  }

  addNames() {
    let names = 'AAA,BBB';
    let elements = names.split(',');;
    elements.forEach(elem => {
      this.afs.collection<Name>('names').add({ sex: 'male', ru: elem, en: `${elem}EN` });
    });
  }

  addSurnames() {
    let surnames = 'AAA,BBB';
    let elements = surnames.split(',');;
    elements.forEach(elem => {
      this.afs.collection<Surname>('surnames').add({ sex: 'male', ru: elem, en: `${elem}EN` });
    });
  }

  addCountriesAndCities() {
    var requestUrl = 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', requestUrl, true);
    xhr.responseType = 'json';
    xhr.send()

    xhr.onload = () => {
      var countryList = xhr.response;
      for (var key in countryList) {
        this.afs.collection('countriesAndCities').add({
          ru: `${key}RU`,
          en: `${key}EN`,
          citiesRu: countryList[`${key}`].map((item: string) => item += 'RU'),
          citiesEn: countryList[`${key}`]
        });
      }
    }
  }

  addStreets() {
    for (let i = 0; i < 200; i++) {
      this.afs.collection<Street>('streets').add({ ru: `street${i + 1}RU`, en: `street${i + 1}EN` });
    }
  }

  addPhones() {
    let phones = `44(798)513-39-44
    44(2045)660-13-57
    44(396)704-69-62
    44(95)407-70-12
    44(7899)475-86-24
    44(390)533-59-39
    44(0701)098-99-04`;

    let elements = phones.split(/\r?\n/);;
    elements.forEach(elem => {
      this.afs.collection<Phone>('phones').add({ format: 'en', text: `${elem}` });
    });
  }

}
