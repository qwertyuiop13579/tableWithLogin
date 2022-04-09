import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UserInfo } from '../auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('selectAll', { static: true }) selectAllEl: any;
  @ViewChild('toolbar', { static: true }) toolbarEl: any;
  users: UserInfo[] = [];
  checklist: any = [];
  isAllSelected = false;
  usersSub: any;

  users$: Observable<UserInfo[]>;

  constructor(private authService: AuthService, private router: Router) {
    this.users$ = this.authService.getUsers();
  }

  ngOnInit(): void {
    console.log(localStorage);

    this.users$.subscribe(users => {
      this.users = users;
      this.checklist = [];
      this.users.forEach(user => {
        this.checklist.push({ id: user.id, isSelected: false });
      })
    })

  }


  logout() {
    this.authService.signOut();
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

  onClickBlock() {
    this.checklist.forEach((checkItem: any) => {
      if (checkItem.isSelected) {
        this.authService.blockUser(checkItem.id).subscribe();

        // signout if block current user
        if (checkItem.id === this.authService.getToken()) {
          this.authService.signOut();
        }
      }
    });
    this.isAllSelected = false;
  }

  onClickUnblock() {
    this.checklist.forEach((checkItem: any) => {
      if (checkItem.isSelected) {
        this.authService.unblockUser(checkItem.id).subscribe();
      }
    });
    this.isAllSelected = false;
  }

  onClickDelete() {
    this.checklist.forEach((checkItem: any) => {
      if (checkItem.isSelected) {
        this.authService.deleteUser(checkItem.id).subscribe(() => { });
        // signout if delete current user
        if (checkItem.id == this.authService.getToken()) this.authService.signOut();
      }
    });
    this.isAllSelected = false;
  }

}
