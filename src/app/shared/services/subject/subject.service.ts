import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  addNewTrendingSubject(formData: FormData) {
    const path = environment.apiUrl + "admin/trending/addTrendingSubject";
    return this.http.post(path, formData);
  }

  getAllTrendingSubjectList() {
    const path = environment.apiUrl + "admin/trending/getAllTrendingSubList?page=0&size=1000";
    return this.http.get(path);
  }
}
