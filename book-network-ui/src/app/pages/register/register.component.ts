import {Component, inject} from '@angular/core';
import {RegistrationRequest} from '../../services/models/registration-request';
import {FormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationRequest: RegistrationRequest = {
    email:'',
    firstname:'',
    lastname:'',
    password:''
  }

  errorMsg: Array<string>=[];

  private router = inject(Router);
  private authService = inject(AuthenticationService);




  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registrationRequest
    }).subscribe({
      next: () =>{
        this.router.navigate(['active-account']);
      },
      error:(err)=>{
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error.errorMsg) {
          this.errorMsg.push(err.error.errorMsg);
        } else {
          this.errorMsg.push(err.error.error || JSON.stringify(err.error));
        }
      },
      complete:()=>{}
    });
  }

  login(){
  this.router.navigate(['login']);
  }
}
