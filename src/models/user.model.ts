
import { CompanyModel } from './company.model';
import { DataBaseModel } from './database.model';
import { RoleModel } from './roles.model';
import { StatusModel } from './status.model';

export class UserModel extends DataBaseModel {
  override data: {
    idCompany: number | null,
    companyModel: CompanyModel
    email: string,
    emailAlerts: number,
    name: string,
    firstName: string,
    lastName: string,
    phone: string,
    licenseNumber: string | null,
    profilePicturePath: string | null
    profilePicture: ArrayBuffer  | string | null
    idRole: number,
    createdBy: number | null,
    idStatus: number,
    statusModel: StatusModel,
    roleModel: RoleModel,
  };

  constructor(id: number = 0, data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        idCompany: null,
        companyModel: new CompanyModel(),
        email: '',
        emailAlerts: 0,
        name: '',
        firstName: '',
        lastName: '',
        phone: '',
        licenseNumber: null,
        profilePicturePath: null,
        profilePicture: '',
        idRole: 0,
        createdBy: 0,
        idStatus: 0,
        roleModel: new RoleModel(),
        statusModel: new StatusModel(),
      };
    }
  }

  public static setUsers(usersRes: any[]) {
    const users: UserModel[] = []
    usersRes.forEach(user => {
      users.push(this.setUser(user))
    });
    return users
  }

  public static setUser(userRes: any) {
    const userModel = new UserModel();
    userModel.id = userRes.id;
    userModel.data.email = userRes.email;
    userModel.data.name = userRes.name;
    userModel.data.firstName = userRes.first_name;
    userModel.data.lastName = userRes.last_name;
    userModel.data.phone = userRes.phone;
    userModel.data.idStatus = userRes.id_status;
    userModel.data.licenseNumber = userRes.license_number;
    userModel.data.idRole = userRes.id_role;
    userModel.data.roleModel.id = userRes.id_role;
    userModel.data.roleModel.data.name = userRes.role_name;
    userModel.data.createdBy = userRes.created_by;
    userModel.data.statusModel.id = userRes.id_status;
    userModel.data.statusModel.data.name = userRes.status_name;
    userModel.data.profilePicturePath = userRes.profile_picture_path;

    if(userRes.id_company !== null){
      userModel.data.idCompany = userRes.id_company;
      userModel.data.companyModel.id = userRes.id_company;
      userModel.data.companyModel.data.name = userRes.company_name
      userModel.data.companyModel.data.idStatus = userRes.id_status_company
    }

    return userModel
  }
}
