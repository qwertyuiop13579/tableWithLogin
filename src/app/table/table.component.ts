import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('selectAll', { static: true }) selectAllEl: any;
  @ViewChild('toolbar', { static: true }) toolbarEl: any;
  users: User[] = [];
  checklist: any = [];
  isAllSelected = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.users().subscribe(res => {
      this.users = res;
      this.users.forEach((item, index) => {
        this.checklist.push({ id: index, isSelected: false });
      })
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onChangeSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    if (!this.isAllSelected) {
      this.checklist.map((item: any) => item.isSelected = false);
    }
    else {
      this.checklist.map((item: any) => item.isSelected = true);
    }
  }

  onChangeSelect() {
    if (this.toolbarEl.nativeElement.value == 'block') {

    } else if (this.toolbarEl.nativeElement.value == 'unblock') {

    }
    else if (this.toolbarEl.nativeElement.value == 'delete') {

    }

  }

}
