import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CybersecToolkitComponent } from './pages/components/cybersec-toolkit/cybersec-toolkit.component';
import { WebvulnReportComponent } from './pages/components/webvuln-report/webvuln-report.component';
import { ComplianceCheckerComponent } from './pages/components/compliance-checker/compliance-checker.component';
import { SecureApiComponent } from './pages/components/secure-api/secure-api.component';
import { SimulAttackerComponent } from './pages/components/simul-attacker/simul-attacker.component';
import { IncidentResponseComponent } from './pages/components/incident-response/incident-response.component';
import { ThreatAlertComponent } from './pages/components/threat-alert/threat-alert.component';
import { SecureTrainingComponent } from './pages/components/secure-training/secure-training.component';
import { StartComponent } from './pages/start/start.component';
import { NewsComponent } from './pages/news/news.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    LandingPageComponent,
    CybersecToolkitComponent,
    WebvulnReportComponent,
    ComplianceCheckerComponent,
    SecureApiComponent,
    SimulAttackerComponent,
    IncidentResponseComponent,
    ThreatAlertComponent,
    SecureTrainingComponent,
    StartComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    NgApexchartsModule,
    FlexLayoutModule,
    TablerIconsModule.pick(TablerIcons),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    ScreenTrackingService,UserTrackingService, CookieService
  ],
})
export class AppModule {}
