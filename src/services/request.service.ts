import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private httpOptions = {}

    constructor(
        private https: HttpClient,
        private authService: AuthService
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({
          auth: this.authService.token !== null ? this.authService.token : '',
      })
  };}


    requestGet(uri: string) {
        return new Promise<ResponseModel>((resolve, reject) => {
            this.https.get(uri, this.httpOptions).subscribe((responseModel: any) => {
                resolve(responseModel);
            },
                (error) => {

                    this.authService.validateErrors(error);
                    reject(error);
                });
        });
    }

    requestPost(uri: string, data: any) {
        return new Promise<ResponseModel>((resolve, reject) => {
            this.https.post(uri, data, this.httpOptions).subscribe((responseModel: any) => {
                resolve(responseModel);
            },
            (error) => {
                this.authService.validateErrors(error.error);
                reject(error);
            },);
        });
    }

    requestPut(uri: string, data: any) {
        return new Promise<ResponseModel>((resolve, reject) => {
            this.https.put(uri, data, this.httpOptions).subscribe((responseModel: any) => {
                resolve(responseModel);
            },
                (error) => {
                    this.authService.validateErrors(error.error);
                    reject(error);
                });
        });
    }

    requestDelete(uri: string) {
        return new Promise<ResponseModel>((resolve) => {
            this.https.delete(uri, this.httpOptions).subscribe((responseModel: any) => {
                resolve(responseModel);
            },
                (error) => {
                    this.authService.validateErrors(error.error)
                });
        });
    }

}