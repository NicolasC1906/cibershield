import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  newsData: any[] = [];
  currentPage = 0;
  newsPerPage = 1;
  loadingNews = false;
  private destroy$ = new Subject<void>();
  private rotationInterval = 5000; // Cambia esto al intervalo deseado en milisegundos (5 segundos en este ejemplo)


  products = [
    {
      id: 1,
      name: 'Simula ataques',
      imageUrl: '/assets/images/products/p1_ciber.svg',
      description: '',
      iconName: 'target', // Nombre del ícono
    },
    {
      id: 2,
      name: 'Escaneo de puertos',
      imageUrl: '/assets/images/products/p2_ciber.svg',
      description: '',
      iconName: 'file-check', // Nombre del ícono
    },
    {
      id: 3,
      name: 'Reportes de amenazas',
      imageUrl: '/assets/images/products/p3_ciber.svg',
      description: '',
      iconName: 'alert-triangle', // Nombre del ícono
    },
  ];

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {}

  scrollToElement(): void {
    const element = document.getElementById('conocenos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {

    // Observable que emite un valor cada `rotationInterval` milisegundos
          interval(this.rotationInterval)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
          });

  }
      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }





 // Agrega esta función para determinar si es un dispositivo pequeño
 isSmallScreen(): boolean {
  return window.innerWidth <= 600; // Puedes ajustar el valor según tus necesidades
}

}
