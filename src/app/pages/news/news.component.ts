import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Subject, interval, takeUntil } from 'rxjs';
import * as xml2js from 'xml2js';

interface RssResponse {
  rss: {
    channel: [{
      item: any[];
    }];
  };
}


interface Noticia {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string[];
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  noticias: Noticia[] = [];
  newsData: any[] = [];
  currentPage = 0;
  newsPerPage = 1;
  loadingNews = false;
  private destroy$ = new Subject<void>();
  private rotationInterval = 15000; // Cambia esto al intervalo deseado en milisegundos (5 segundos en este ejemplo)
  isLoading = false;
  uniqueCategories: string[] = [];

  newsItems: any[] = [];
  private readonly CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  private readonly FEED_URL = "https://unaaldia.hispasec.com/feed";


  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {}

    ngOnInit(): void {
      // this.loadNewsFromRSS();
      this.fetchNoticias();

      // Observable que emite un valor cada `rotationInterval` milisegundos
      interval(this.rotationInterval)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isUserInteracting) { // Check the flag here
          this.advanceToNextPage();
        }
      });

    }

    ngOnDestroy(): void {
          this.destroy$.next();
          this.destroy$.complete();
    }

    fetchNoticias() {
      this.isLoading = true;  // 1. Establecer isLoading a true antes de la solicitud
      this.httpClient.get<Noticia[]>('https://bytebog-23ca3-default-rtdb.firebaseio.com/noticias.json')
        .subscribe(
          noticias => {
            this.noticias = noticias.sort(() => 0.5 - Math.random());
            this.isLoading = false;  // 2. Establecer isLoading a false cuando la solicitud se complete
          },
          error => {
            console.error('Error al cargar las noticias', error);
            this.isLoading = false;  // 2. También establecer isLoading a false en caso de error
          }
        );
    }




  private convertXmlToJson(xmlStr: string): any[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
    const items = Array.from(xmlDoc.querySelectorAll("item"));
    const allCategories: string[] = [];
    items.forEach(item => {
      const categories = Array.from(item.querySelectorAll("category")).map(categoryElement => categoryElement.textContent || "");
      allCategories.push(...categories);
    });

    // Elimina duplicados y asigna las categorías únicas a uniqueCategories
    this.uniqueCategories = [...new Set(allCategories)];

    return items.map(item => {
      return {
        title: item.querySelector("title")?.textContent || "",
        description: this.sanitizeContent(item.querySelector("description")?.textContent || ""),
        url: item.querySelector("link")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
        categories: Array.from(item.querySelectorAll("category")).map(categoryElement => categoryElement.textContent || "Sin categoría"),
      };
    });
  }



  private sanitizeContent(content: string): string {
      const div = document.createElement('div');
      div.innerHTML = content;
      return div.textContent || div.innerText || "";
   }



    formatNewsDate(dateString: string): string {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
          return "Fecha desconocida";
      }
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
    }

    getUniqueCategories(): string[] {
      const startIndex = this.currentPage * this.newsPerPage;
      const endIndex = startIndex + this.newsPerPage;
      const newsOnCurrentPage = this.newsData.slice(startIndex, endIndex);
      return [...new Set(newsOnCurrentPage.map(news => news.category))];
    }


    isUserInteracting = false;

    onPageChange(event: any): void {
      this.isUserInteracting = true; // Set the flag when the user interacts
      this.currentPage = event.pageIndex;
      this.newsPerPage = event.pageSize;
      this.uniqueCategories = this.getUniqueCategories();
    }


    get pagedNewsData(): any[] {
      const startIndex = this.currentPage * this.newsPerPage;
      const endIndex = startIndex + this.newsPerPage;
      return this.newsData.slice(startIndex, endIndex);
    }

    advanceToNextPage(): void {
      const nextPage = this.currentPage + 1;
      if (nextPage < this.newsData.length / this.newsPerPage) {
        this.currentPage = nextPage;
      } else {
        this.currentPage = 0;
      }
    }

    get pagedNoticias(): Noticia[] {
      const startIndex = this.currentPage * this.newsPerPage;
      const endIndex = startIndex + this.newsPerPage;
      return this.noticias.slice(startIndex, endIndex);
    }
}
