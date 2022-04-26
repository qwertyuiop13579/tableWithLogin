import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableService, Item } from '../table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  data: Item[] = [];
  listArray: string[] = [];
  sum = 20;
  step = 10;
  selectedLang: any = 'en';
  ErrorsCount = 0;
  SeedInput = "";

  constructor(private router: Router, private tableService: TableService) {
    for (let i = 0; i < this.sum; i++) {
      this.data.push({ id: '1', name: 'name', surname: 'surname', address: 'address', phone: 'phone' });
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
      this.data.push({ id: '1', name: 'name', surname: 'surname', address: 'address', phone: 'phone' });
    }
  }

  onChangeLang() {
    console.log(this.selectedLang);
    //TODO: update table
  }

  onChangeErrorsCount() {
    console.log(this.ErrorsCount);
    //TODO: update table
  }

  onChangeSeed() {
    console.log(this.SeedInput);
    //TODO: update table
  }

  onClick() {
    this.tableService.generate();
  }

  ngOnDestroy(): void { }

}
