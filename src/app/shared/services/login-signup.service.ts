import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  public login_url= "http://localhost:3000"
  public reg_url= "http://localhost:3000"
  apiService: any;

  constructor(private http: HttpClient, apiService:ApiService) { }

  auth_login(user_name:any , password:any):Observable<any>{
    return this.apiService.get(this.login_url + '/user?email=' + user_name + '&password=' + password)
  }

  userRegister(user_dta:any):Observable<any>{
    return this.apiService.post(this.reg_url+'/user',user_dta)
  }

  admin_login(user_name:any , password:any):Observable<any>{
    return this.apiService.get(this.login_url + '/user?email=' + user_name + '&password=' + password + '&role=admin')
  }
}
