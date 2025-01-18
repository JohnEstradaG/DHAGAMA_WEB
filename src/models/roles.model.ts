import { DataBaseModel } from "./database.model";

export class RoleModel extends DataBaseModel {
  override data: {
    name: string;
  };

  constructor(id: number = 0, data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        name: '',
      };
    }
  }

  static setRoles(rolesRes: any[]) {
    const roles: RoleModel[] = []
    rolesRes.forEach(role => {
      const roleModel = new RoleModel()
      roleModel.id = role.id
      roleModel.data.name = role.name
      roles.push(roleModel)
    });
    return roles
  }
}
