import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { RequestService } from './request.service';
@Injectable()
export class EmailService {

  constructor(
    private requestService: RequestService
  ) { }

  private basePath = `${environment.host}/api/emails`;

  forgotPassword(email: string) {
    return this.requestService.requestGet(`${this.basePath}/forgotPassword/${email}`)
  }
  
  restorePassword(token: string, password: string, validatePassword: string) {
    return this.requestService.requestPost(`${this.basePath}/restorePassword/${token}`, {password, validatePassword})
  }

}