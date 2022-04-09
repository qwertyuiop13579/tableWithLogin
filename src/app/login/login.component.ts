import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email = '';
  password = '';
  subscription: any;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Login() {
    this.subscription = this.authService.findUser(this.email).pipe(take(1)).subscribe(res => {
      if (!res.length) {
        alert('Incorrect login or password');
        return;
      }
      if (res[0].status == 'block') {
        alert('This user is block');
        return;
      }
      this.authService.setToken(res[0].id);
      this.router.navigate(['table']);

    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

}
