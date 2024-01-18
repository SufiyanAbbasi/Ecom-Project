import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { user } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  //we can also declare HttpClientModule in app.config.ts(provideHttpClient()) otherwise error is shown
  imports: [CommonModule, RouterLink, HttpClientModule,ReactiveFormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  regForm: boolean = false;
  signUpform !: FormGroup;
  signInform !: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto !: user;
  user_reg_data: any;
  signInFormValue: any = {};

  // constructor are used to inject services 
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) { }


  // In Angular, ngOnInit is a lifecycle hook used in components to perform initialization tasks. It is called after Angular has initialized the component's data-bound properties and provides a safe place to initialize component properties, access input values, interact with services, set up child components, make API calls, and handle observables. By leveraging ngOnInit, developers ensure that their component is fully initialized and ready for use, making it a crucial part of the Angular component lifecycle.
  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  get rf(){
    return this.signUpform.controls;
  }

  OnSubmitSignUp(){
    this.signUpsubmitted = true;
    if(this.signUpform.invalid){
      return;
    }

    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      aboutYou:this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address:{
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    }
    this.loginService.userRegister(this.user_dto).subscribe(_data=>{
     alert("User Register Successfull");
     this.router.navigateByUrl('/sign-in');
     console.log("worked")
    })
  }
}
