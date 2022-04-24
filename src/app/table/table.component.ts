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

  constructor(private router: Router) {
    for (let i = 0; i < 20; i++) {
      this.data.push({ id: '1', fio: 'fio', address: 'address', phone: 'phone' });
    }
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }

}
