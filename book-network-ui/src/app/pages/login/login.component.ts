import {Component, inject} from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationResponse} from '../../services/models/authentication-response';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<String> = [];

  private router = inject(Router);
  private authService = inject(AuthenticationService);
  private tokenService = inject(TokenService);

  login() {
    console.log("req" + this.authRequest);
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: AuthenticationResponse): void => {
        this.tokenService.token = res.accessToken as string;
        this.router.navigate(['books'])
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error.errorMsg) {
          this.errorMsg.push(err.error.errorMsg);
        } else {
          this.errorMsg.push(err.error.error || JSON.stringify(err.error));
        }


      },
      complete: () => {
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
