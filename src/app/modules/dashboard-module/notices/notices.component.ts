import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { NoticeService } from '../../../shared/services/notice/notice.service';
import { Notice } from '../../../shared/models/Notice/notice';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [HeaderBannerComponent, CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit {

  addNewNoticeForm!: FormGroup;
  noticModel = new Notice();
  noticeList: Notice[] = [];
  searchText = '';

  constructor (private formBuilder: FormBuilder, private tostr: ToastrService, private noticeService: NoticeService) {}

  ngOnInit(): void {
    this.initAddNoticeForm();
    this.getNoticeList();
  }

  getNoticeList() {
    this.noticeService.getNoticeList().subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data.forEach((el: any) => {
          this.noticeList.push(el);
        })
      }
    })
  }

  onSubmitAddNoticeForm() {
    const message = this.addNewNoticeForm.controls['message'].value;
    const status = this.addNewNoticeForm.controls['status'].value;

    if (message == "") {
      this.tostr.error("Add New Notice", "Empty Fileds Found");
    } else if (status == "") {
      this.tostr.error("Add New Notice", "Empty Fileds Found");
    } else {
      this.noticModel.message = message;
      this.noticModel.status = status;

      this.noticeService.addNewNotice(this.noticModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Add New Notice", "Notice Added Successfully");
        } else {
          this.tostr.error("Add New Notice", resp.message);
        }
      })
    }
  }

  pageChanged(event: any) {

  }

  initAddNoticeForm() {
    this.addNewNoticeForm = this.formBuilder.group({
      message: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

}
