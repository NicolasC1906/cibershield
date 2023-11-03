import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { ExtraRoutes } from './extra.routing';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExtraRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppIconsComponent,
    AppSamplePageComponent
  ],
})
export class ExtraModule {}
