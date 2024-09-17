import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notice } from '../../models/Notice/notice';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private http: HttpClient) { }

  addNewNotice(noticeInfo: Notice) {
    const path = environment.apiUrl + "admin/notice/addNotice";
    return this.http.post(path, noticeInfo);
  }

  getNoticeList() {
    const path = environment.apiUrl + "admin/notice/get-all-notices";
    return this.http.get(path);
  }
}
