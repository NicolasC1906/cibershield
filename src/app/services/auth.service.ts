import { Injectable } from '@angular/core';
import { getAuth, signOut ,signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string | null = null;


  constructor(
    private router: Router,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

 // auth.service.ts

 async signInWithEmail(email: string, password: string): Promise<void> {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Almacenar los datos del usuario en las cookies
    this.cookieService.set('userDataTradicional', JSON.stringify(userCredential.user));

    await this.router.navigate(['/']);
  } catch (error: unknown) {
    console.error(error);
    let errorMessage = 'Ocurrió un error al intentar iniciar sesión.';

    // Verifica que `error` tenga la forma que esperas antes de acceder a sus propiedades
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorCode = (error as { code: string }).code;
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico es incorrecto.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'La cuenta ha sido deshabilitada.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No hay ningún usuario con ese correo electrónico.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'La contraseña es incorrecta.';
          break;
      }
    }

    this.errorMessage = errorMessage;
  }
}


async signUpWithEmail(email: string, password: string): Promise<any> {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Almacenar los datos del usuario en las cookies
    this.cookieService.set('userDataRegistre', JSON.stringify(userCredential.user));

    return userCredential;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  async signInWithGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Store user data in cookie.
      this.cookieService.set('userDataWithGoogle', JSON.stringify(userCredential.user));

      await this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }


  async logout(): Promise<void> {
    try {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Estás seguro de que deseas cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión!'
        });

        if (result.isConfirmed) {
            const auth = getAuth();
            await signOut(auth);
            this.cookieService.delete('userDataTradicional');
            this.cookieService.delete('userDataRegistre');
            this.cookieService.delete('userDataWithGoogle');
            await this.router.navigate(['/authentication/login']);
        }
    } catch (error) {
        console.error('Error durante el cierre de sesión:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal al intentar cerrar la sesión!',
        });
    }
}


}
