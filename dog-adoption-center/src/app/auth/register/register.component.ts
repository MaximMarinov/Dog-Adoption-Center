import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup
  }

  registerFormGroup = this.formBuilder.group({
    'name': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePass': new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)]),
    }),
  });
  
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) { }

  ngOnInit(): void {
  }

  errorMessage: string = '';

  handleRegister(): void {

    const body: User = {
      name: this.registerFormGroup.value.name,
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.passwords.password,
    }

    this.authService.register$(body).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });

  }

}
