import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderBannerComponent } from "../../shared/header-banner/header-banner.component";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    HeaderBannerComponent
]
})
export class DashboardModuleModule { }
