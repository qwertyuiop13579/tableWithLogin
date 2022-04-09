import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name = '';
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
    const user = {
      id: '1',
      name: this.name,
      email: this.email,
      password: this.password,
      status: 'ok',
      dateReg: new Date().getTime(),
      dateLog: 0,
    };
    this.authService.signUp(user).subscribe((res: any) => {
      console.log('Add user');
      this.router.navigate(['login']);
    });
  }

}
