import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Auth } from '../../../shared/models/Auth/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;
  authModel = new Auth();

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private tostr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmitLoginForm() {
    const username = this.loginForm.controls['userName'].value;
    const password = this.loginForm.controls['password'].value;

    if (username == "") {
      this.tostr.error("Authenticate Admin User", "Empty Filed Found");
    } else if (password == "") {
      this.tostr.error("Authenticate Admin User", "Empty Field Found");
    } else {
      this.authModel.username = username;
      this.authModel.password = password;

      this.authService.authenticateAdminUser(this.authModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Authenticate Admin User", "Authenticate Successfully");
          sessionStorage.setItem("token", resp.token);
          
          setTimeout(() => {
            this.router.navigate(['/app/home'])
          }, 1000);
        } else {
          this.tostr.error("Authenticate Admin User", resp.message)
        }
      })
    }
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
