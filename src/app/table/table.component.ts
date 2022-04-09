import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() users: User[] = [];
  checklist: any = [];
  isAllSelected = false;
  usersSub: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.updateUsers();

  }

  updateUsers() {
    if (this.usersSub) this.usersSub.unsubscribe();
    this.usersSub = this.authService.users().subscribe(res => {
      this.users = res;
      this.checklist = [];
      this.users.forEach((item, index) => {
        this.checklist.push({ id: item.id, isSelected: false });
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
      this.checklist.forEach((check: any, index: any) => {
        if (check.isSelected) {
          this.users[index].status = 'block';
        }
        console.log(this.users);
        this.authService.updateUsers(this.users).subscribe(res => {
          console.log(res);
          this.updateUsers();
        });
      });

    } else if (this.toolbarEl.nativeElement.value == 'unblock') {
      this.checklist.filter((item: any) => item.isSelected).forEach((check: any) => {
        this.authService.unblock(check.id);
      });

    }
    else if (this.toolbarEl.nativeElement.value == 'delete') {
      this.checklist.filter((item: any) => item.isSelected).forEach((check: any) => {
        this.authService.delete(check.id);
      });
    }
    this.updateUsers();
    this.toolbarEl.nativeElement.value = 'select';
    this.isAllSelected = false;
  }

}
