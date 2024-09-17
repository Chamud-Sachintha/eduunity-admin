import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { TrendingSubjectsComponent } from './trending-subjects/trending-subjects.component';
import { NoticesComponent } from './notices/notices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'all-students',
    component: AllStudentsComponent
  },
  {
    path: 'trending-subjects',
    component: TrendingSubjectsComponent
  },
  {
    path: 'all-notices',
    component: NoticesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
