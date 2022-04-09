import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Login() {

    this.authService.login(this.email, this.password).subscribe(res => {
      console.log("You login in!", res);
      this.authService.addToken(res);
      this.router.navigate(['table']);
    }, err => {
      console.log(err);
      if (err.error.errorMessage == 'No such user. Authorisation required!') {
        alert('No such user');
        return;
      }
      if (err.error.errorMessage == 'This user is blocked!') {
        alert('This user is blocked!');
        return;
      }

    });



  }

}
