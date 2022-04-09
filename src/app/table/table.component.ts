import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  onChangeSelect() {
    if (this.toolbarEl.nativeElement.value == 'block') {
      this.checklist.forEach((check: any) => {
        if (check.isSelected) {
          this.authService.blockUser(check.id).subscribe();
        }
      });
    }
    else if (this.toolbarEl.nativeElement.value == 'unblock') {
      this.checklist.forEach((check: any) => {
        if (check.isSelected) {
          this.authService.unblockUser(check.id).subscribe();
        }
      });

    }
    else if (this.toolbarEl.nativeElement.value == 'delete') {
      this.checklist.forEach((check: any) => {
        if (check.isSelected) {
          this.authService.deleteUser(check.id).subscribe();
        }
      });
    }

    this.toolbarEl.nativeElement.value = 'select';
    this.isAllSelected = false;
  }

}
