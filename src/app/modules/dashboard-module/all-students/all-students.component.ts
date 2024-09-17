import { Component, OnInit } from '@angular/core';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Student } from '../../../shared/models/Student/student';
import { StudentService } from '../../../shared/services/student/student.service';

@Component({
  selector: 'app-all-students',
  standalone: true,
  imports: [HeaderBannerComponent, CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './all-students.component.html',
  styleUrl: './all-students.component.css'
})
export class AllStudentsComponent implements OnInit {

  studentList: Student[] = [];
  searchText = '';

  constructor (private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudentList();
  }

  loadStudentList() {
    this.studentService.getStudentList().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data.data.content.forEach((el: any) => {
          this.studentList.push(el);
        })
      }
    })
  }

  pageChanged(event: any) {

  }

}
