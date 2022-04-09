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
    this.authService.findUser(this.email).subscribe(res => {
      if (!res.length) {
        alert('Incorrect login or password');
        return;
      }
      if (res[0].status == 'block') {
        alert('This user is block');
        return;
      }
      this.authService.setToken(res[0].$id);
      this.router.navigate(['table']);

    });


  }

}
