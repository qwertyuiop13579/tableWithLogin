import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.users().subscribe(res => {
      this.users = res;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
