import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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

  //names
  private namesCollection!: AngularFirestoreCollection<Name>;
  //surnames
  private surnamesCollection!: AngularFirestoreCollection<Surname>;
  //countriesAndCities
  private countriesAndCitiesCollection!: AngularFirestoreCollection<Country>;
  //streets
  private streetCollection!: AngularFirestoreCollection<Street>;
  //phones
  private phonesCollection!: AngularFirestoreCollection<Phone>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.namesCollection = this.afs.collection<Name>('names');
    this.surnamesCollection = this.afs.collection<Surname>('surnames');
    this.countriesAndCitiesCollection = this.afs.collection<Country>('countriesAndCities');
    this.streetCollection = this.afs.collection<Street>('streets');
    this.phonesCollection = this.afs.collection<Phone>('phones');
  }

  public getJSON(url:string): Observable<any> {
    return this.http.get(url);
  }

  generate() {
    var name = '';
    var surname = '';
    var phone = '';
    var address = '';
    let newItem: Item = {
      id: '',
      name: '',
      surname: '',
      phone: '',
      address: ''
    };


    // this.getJSON('../assets/data/names,json').subscribe(data => {
    //   let randomItem = data[Math.floor(Math.random() * data.length)];
    //   if (this.selectedLang == 'en') name = randomItem.en;
    //   else name = randomItem.ru;
    //  });


    this.namesCollection.valueChanges().pipe(take(1)).subscribe(res => {
      let randomItem = res[Math.floor(Math.random() * res.length)];
      if (this.selectedLang == 'en') name = randomItem.en;
      else name = randomItem.ru;
    });

    // this.surnamesCollection.valueChanges().pipe(take(1)).subscribe(res => {
    //   let randomItem = res[Math.floor(Math.random() * res.length)];
    //   if (this.selectedLang == 'en') surname = randomItem.en;
    //   else surname = randomItem.ru;
    // });

    // this.afs.collection<Phone>('phones', ref =>
    //   ref.where('format', '==', this.selectedLang)
    // ).valueChanges().pipe(take(1)).subscribe(res => {
    //   let randomItem = res[Math.floor(Math.random() * res.length)];
    //   phone = randomItem.text;
    // });
    // let country = '';
    // let randomCity = '';
    // let street;
    // this.afs.collection<Country>('countriesAndCities').valueChanges().pipe(take(1)).subscribe(res => {
    //   let cities: any;
    //   let randomItem = res[Math.floor(Math.random() * res.length)];
    //   if (this.selectedLang == 'en') {
    //     country = randomItem.en;
    //     cities = randomItem.citiesEn;
    //   }
    //   else {
    //     country = randomItem.ru;
    //     cities = randomItem.citiesRu;
    //   }
    //   randomCity = cities[Math.floor(Math.random() * cities.length)];
    // });

    // this.afs.collection<Street>('streets').valueChanges({ idField: 'id' }).pipe(take(1)).subscribe(res => {
    //   let randomItem = res[Math.floor(Math.random() * res.length)];
    //   if (this.selectedLang == 'en') {
    //     street = randomItem.en;
    //   }
    //   else {
    //     street = randomItem.ru;
    //   }
    //   newItem = {
    //     id: randomItem.id,
    //     name: name,
    //     surname: surname,
    //     phone: phone,
    //     address: `${country}, ${randomCity}, ${street}, ${Math.floor(Math.random() * 100)} - ${Math.floor(Math.random() * 30)}`,
    //   };
    //   console.log(newItem);
    // });
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
