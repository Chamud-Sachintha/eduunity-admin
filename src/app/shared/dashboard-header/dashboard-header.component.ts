import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {

  constructor(private router: Router) {}

  onClickLogOut() {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])

    return false;
    
  }

}
