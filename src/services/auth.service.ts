import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { BehaviorSubject } from 'rxjs';
import { FormService } from './form.service';
import { ResponseModel } from '../models/response.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key': '',
      'Access-Control-Allow-Origin': '*'
    })
  };

  token: string | null = this.getValueLocalStorage('token');
  currentUser: UserModel | null = null;
  private countForm = 0;

  constructor(
    private https: HttpClient,
    private formService: FormService
  ) {
  }

  private basePath = '/api/users';

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.https.post(`${environment.host}${this.basePath}/signin`, {
        email,
        password
      },
        this.httpOptions
      ).subscribe((res: any) => {
        const responseModel = res as ResponseModel;
        resolve(responseModel.response.token);
      },
        (error) => {
          reject(error)
        })
    });
  }

  signInGoogle(credential: string) {
    return this.https.get(`${environment.host}${this.basePath}/signinGoogle/${credential}`, this.httpOptions)
  }

  logOut() {
    window.location.reload();
    this.removeCurrentSession();
  }

  removeValueLocalStorage(identifier: string) {
    localStorage.removeItem(identifier);
  }

  removeCurrentSession(): void {
    this.removeValueLocalStorage('token');
    this.removeValueLocalStorage('previousSearches');
    this.token = null;
  }

  setValueLocalStorage(identifier: string, data: any) {
    localStorage.setItem(identifier, JSON.stringify(data));
  }

  isAuthenticated(): boolean {
    return (this.getValueLocalStorage('token') !== null) ? true : false;
  }

  getValueLocalStorage(identifier: string) {
    return JSON.parse(localStorage.getItem(identifier)!);
  }

  validateErrors(error: any) {
    switch (parseInt(error.status)) {
      case 401:
        try {
        } catch (changeSubscriptionError) {
          console.error('Error:', changeSubscriptionError);
        }
        this.logOut();
        break;
      case 409:
        if (this.countForm === 0) {
          this.countForm = 1;
          this.formService.openMessageDialog('Nueva versión', 'Hay una nueva versión disponible', true).afterClosed().subscribe(() => {
            this.countForm = 0;
            try {
            } catch (changeSubscriptionError) {
              console.error('Error:', changeSubscriptionError);
            }
            this.logOut();
          });
        }
        break;
      default:
        break;
    }
  }

  public resetPassword(email: string) {
    return new Promise(() => {
      
    })
  }
}
