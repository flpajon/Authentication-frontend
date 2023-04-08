import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginRequest } from 'src/app/services/requests/loginRequest';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  submitted: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  iniciarSesion() {
    if (this.formLogin.invalid) {
      this.formLogin.controls['user'].markAsTouched();
      this.formLogin.controls['password'].markAsTouched();
      return;
    }
    const loginRequest = new LoginRequest(this.formLogin.controls['user'].value, this.formLogin.controls['password'].value);
    this.authenticationService.login(loginRequest).subscribe({
      next: response => {
        console.log(response);
        
      }
    })
  }

  validarRequiredForm(formInputName: string): boolean {
    return this.formLogin.controls[formInputName].errors && this.formLogin.controls[formInputName].errors?.['required'] && this.formLogin.controls[formInputName].touched;
  }

}
