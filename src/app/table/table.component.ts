import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
    this.tableService.generate(this.sum).pipe(take(1)).subscribe(res => {
      this.data = [...res];
    });
  }

  ngOnInit(): void { }

  onScrollDown(ev: any) {
    console.log("Scrolled down! Add 10 items.");
    this.addItems();

  }

  addItems() {
    this.tableService.generate(this.step).pipe(take(1)).subscribe(res => {
      this.data = this.data.concat(res);
    });
  }

  onChangeLang() {
    console.log(this.selectedLang);
    this.tableService.selectedLang = this.selectedLang;
    this.data = [];
    this.tableService.generate(this.sum).pipe(take(1)).subscribe(res => {
      this.data = this.data.concat(res);
    });

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
    this.tableService.DO();
  }

  ngOnDestroy(): void { }

}
