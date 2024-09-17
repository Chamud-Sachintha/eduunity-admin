import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { Dashboard } from '../../../shared/models/Dashboard/dashboard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dashboardModel = new Dashboard();

  constructor(private dashboardService: DashboardService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        this.dashboardModel.allStudentsCount = dataList.data.allStudentsCount;
        this.dashboardModel.noticeCount = dataList.data.noticeCount;
        this.dashboardModel.trendingSubjectCount = dataList.data.trendingSubjectCount;
      } else {
        this.tostr.error("Load Dashboard Data", resp.message);
      }
    })
  }
  
}
