import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  email: string;
  password: string;
  form: FormGroup;
  hidePassword = true;

  // Inyecta el AuthService para que podamos acceder a errorMessage desde la plantilla
  constructor(public authService: AuthService, private formBuilder: FormBuilder,  private router: Router,) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.signInWithEmail(email, password);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during Google registration:', error);
      // handle error, maybe show a user-friendly error message
    }
  }

   // Añadido: función para conmutar la visibilidad de la contraseña
   togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
