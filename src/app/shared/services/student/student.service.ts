import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentList() {
    const path = environment.apiUrl + "admin/student/list?pageNo=0&pageSize=10000";
    return this.http.get(path);
  }
}
