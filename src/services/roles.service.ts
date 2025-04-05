import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { RequestService } from './request.service';
import { RoleModel } from '../models/roles.model';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private basePath = `${environment.host}/api/roles`;

  constructor(
    private requestService: RequestService
    ) {}

  getAll(): Promise<RoleModel[]> {
    return this.requestService.requestGet(`${this.basePath}/getAll`).then((responseModel: ResponseModel) => {
      return RoleModel.setRoles(responseModel.response);
    })
  }
}
