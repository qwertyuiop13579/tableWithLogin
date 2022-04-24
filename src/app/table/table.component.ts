import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface IData {
  id: string,
  fio: string,
  address: string,
  phone: string,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  data: IData[] = [];
  listArray: string[] = [];
  sum = 20;
  step = 10;

  constructor(private router: Router) {
    for (let i = 0; i < this.sum; i++) {
      this.data.push({ id: '1', fio: 'fio', address: 'address', phone: 'phone' });
    }
  }

  ngOnInit(): void { }

  onScrollDown(ev: any) {
    console.log("Scrolled down! Add 10 items.");

    this.sum += this.step;
    this.addItems();

  }

  addItems() {
    this.listArray = [];
    for (let i = 0; i < this.step; i++) {
      this.data.push({ id: '1', fio: 'fio', address: 'address', phone: 'phone' });
    }
  }

  ngOnDestroy(): void {

  }

}
