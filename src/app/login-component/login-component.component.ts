import { Component } from '@angular/core';
// import {AuthService} from "../auth.service";
// import {Router} from "@angular/router";
// import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    // private router: Router,
    // private toast: MatSnackBar,
    // private authService: AuthService,
  ) {}
  // login() {
  //   this.authService.login(this.credentials)
  //     .then( user => this.router.navigate(['/main']))
  //     .catch( error => this.toast.open(error.message));
  //
  // }
}
