import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { RequestService } from './request.service';
import { StatusModel } from '../models/status.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private basePath = `${environment.host}/api/status`;
  public status: StatusModel[] = [];

  constructor(
    private requestService: RequestService
  ) { }

  getAll(): Promise<StatusModel[]> {
    return this.requestService.requestGet(`${this.basePath}/getAll`).then((responseModel: ResponseModel) => {
      return StatusModel.setStatus(responseModel.response);
    })
  }
}
