import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor (private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmitLoginForm() {

    
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
