import { Component, OnInit } from '@angular/core';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../../../shared/services/subject/subject.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrendingSubject } from '../../../shared/models/TrendingSubject/trending-subject';

@Component({
  selector: 'app-trending-subjects',
  standalone: true,
  imports: [HeaderBannerComponent, CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './trending-subjects.component.html',
  styleUrl: './trending-subjects.component.css'
})
export class TrendingSubjectsComponent implements OnInit {

  addTrendingSubjectForm!: FormGroup;
  trendingSubjectList: TrendingSubject[] = [];
  selectedImage!: File;
  searchText = '';

  constructor (private formBuilder: FormBuilder, private subjectService: SubjectService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddTrendingSubjectForm();
    this.loadTrendingSubjectList();
  }

  loadTrendingSubjectList() {
    this.subjectService.getAllTrendingSubjectList().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data.data.content.forEach((el: any) => {
          this.trendingSubjectList.push(el);
        })
      } else {
        this.tostr.error("Trending Subject List", "Loading Error");
      }
    })
  }

  onSubmitAddTrendingSubject() {
    const subjectName = this.addTrendingSubjectForm.controls['subjectName'].value;
    const subjectDescription = this.addTrendingSubjectForm.controls['subjectDescription'].value;
    
    if (subjectName == "") {
      this.tostr.error("Add Trending Subject", "Empty Fileds Found");
    } else if (subjectDescription == "") {
      this.tostr.error("Add Trending Subject", "Empty Fileds Found");
    } else {
      var formdata = new FormData();

      formdata.append("subjectName", subjectName);
      formdata.append("subjectDescription", subjectDescription);
      formdata.append("file", this.selectedImage);

      this.subjectService.addNewTrendingSubject(formdata).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Add Trending Subject", "Subject Added Successfully");
        } else {
          this.tostr.error("Add Trending Subject", resp.message);
        }
      })
    }
  }

  onImageSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  initAddTrendingSubjectForm() {
    this.addTrendingSubjectForm = this.formBuilder.group({
      subjectName: ['', Validators.required],
      subjectDescription: ['', Validators.required],
    })
  }

  pageChanged(event: any) {

  }

}
