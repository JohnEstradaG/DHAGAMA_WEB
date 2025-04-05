import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserModel } from '../models/user.model';
import { RequestService } from './request.service';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private basePath = `${environment.host}/api/users`;

  constructor(
    private requestService: RequestService,
  ) { }


  create(userModel: UserModel) {
    return this.requestService.requestPost(`${this.basePath}/create/`, userModel.data);
  }

  update(userModel: UserModel) {
    return this.requestService.requestPut(`${this.basePath}/update/${userModel.id}`, userModel.data,);
  }

  delete(idUser: number) {
    return this.requestService.requestDelete(`${this.basePath}/delete/${idUser}`)
  }

  getOneByToken() {
    return this.requestService.requestGet(`${this.basePath}/getOne/ByToken`).then((responseModel: ResponseModel) => {
      return UserModel.setUser(responseModel.response)
    })
  }
  
  getAllUsersByCompany(index: number, size: number, search: string, idStatus: number | null, idCompany: number) {
    return this.requestService.requestGet(`${this.basePath}/getAll/byPagebySearchCompany/${index}&${size}&${search}&${idStatus}&${idCompany}`).then((responseModel: ResponseModel) => {
      return UserModel.setUsers(responseModel.response)
    });
  }
  
  getAllUsersNumberByCompany(search: string, idStatus: number | null, idCompany: number) {
    return this.requestService.requestGet(`${this.basePath}/count/bySearchCompany/${search}&${idStatus}&${idCompany}`);
  }
}
