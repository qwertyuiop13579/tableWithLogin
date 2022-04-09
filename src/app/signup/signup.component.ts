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
    this.authService.signup(this.name, this.email, this.password).subscribe(res => {
      console.log('You sign up!', res);
      this.router.navigate(['login']);
    }, err => {
      console.log(err);
    });
  }

}
