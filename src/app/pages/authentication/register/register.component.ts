import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  hidePassword = true;
  constructor(
    private router: Router,
    private authService: AuthService  // Inyectar el servicio de autenticación
  ) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]), // Añadido Validators.email
    password: new FormControl('', [Validators.required, Validators.minLength(6)]), // Añadido Validators.minLength
  });

  get f() {
    return this.form.controls;
  }

  async registerWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during Google registration:', error);
      // handle error, maybe show a user-friendly error message
    }
  }

  async submit() {
    if (this.form.valid) { // Asegurarse de que el formulario es válido antes de proceder
      const { uname, email, password } = this.form.value;

      try {
        // Asegurarte de que email y password son strings antes de llamar a signUpWithEmail
        if (typeof email === 'string' && typeof password === 'string') {
          await this.authService.signUpWithEmail(email, password);
          this.router.navigate(['/']);
        } else {
          console.error('Email or Password is not a string');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      console.error('Form is not valid');
    }
  }
}
