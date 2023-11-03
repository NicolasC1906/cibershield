import { Routes } from '@angular/router';


// pages
import { AppIconsComponent } from './icons/icons.component';
import { AppSamplePageComponent } from './sample-page/sample-page.component';
import { CybersecToolkitComponent } from '../components/cybersec-toolkit/cybersec-toolkit.component';
import { WebvulnReportComponent } from '../components/webvuln-report/webvuln-report.component';
import { ComplianceCheckerComponent } from '../components/compliance-checker/compliance-checker.component';
import { SecureApiComponent } from '../components/secure-api/secure-api.component';
import { SimulAttackerComponent } from '../components/simul-attacker/simul-attacker.component';
import { IncidentResponseComponent } from '../components/incident-response/incident-response.component';
import { ThreatAlertComponent } from '../components/threat-alert/threat-alert.component';
import { SecureTrainingComponent } from '../components/secure-training/secure-training.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'icons',
        component: AppIconsComponent,
      },
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
      {
        path: 'cybersec-toolkit',
        component: CybersecToolkitComponent,
      },
      {
        path: 'webvuln-report',
        component: WebvulnReportComponent,
      },
      {
        path: 'compliance-checker',
        component: ComplianceCheckerComponent,
      },
      {
        path: 'secure-api',
        component: SecureApiComponent,
      },
      {
        path: 'simul-attacker',
        component: SimulAttackerComponent,
      },
      {
        path: 'incident-response',
        component: IncidentResponseComponent,
      },
      {
        path: 'threat-alert',
        component: ThreatAlertComponent,
      },
      {
        path: 'secure-training',
        component: SecureTrainingComponent,
      },
    ],
  },
];
