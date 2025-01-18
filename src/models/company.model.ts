import { AddressModel } from './address.model';
import { DataBaseModel } from './database.model';
import { StatusModel } from './status.model';

export class CompanyModel extends DataBaseModel {
  override data: {
    email: string,
    idAddress: number,
    addressModel: AddressModel,
    idStatus: number,
    statusModel: StatusModel,
    name: string,
    phone: string,
    profilePicture: ArrayBuffer  | string | null
    profilePicturePath: string | null,
    rfc: string,
  };

  constructor(id: number = 0, data?: any) {
    super(id, data);
    if (data) {
      this.data = data;
    } else {
      this.data = {
        email: '',
        idAddress: 0,
        addressModel: new AddressModel(),
        idStatus: 0,
        statusModel: new StatusModel(),
        name: '',
        phone: '',
        profilePicture: null,
        profilePicturePath: null,
        rfc: ''
      };
    }
  }

  public static setCompanies(companiesRes: any[]) {
    const companies: CompanyModel[] = []
    companiesRes.forEach(company => {
      companies.push(this.setCompany(company))
    });
    return companies
  }

  public static setCompany(companyRes: any) {
    const companyModel = new CompanyModel();
    companyModel.id = companyRes.id;
    companyModel.data.name = companyRes.name;
    companyModel.data.email = companyRes.email;
    companyModel.data.phone = companyRes.phone;
    companyModel.data.rfc = companyRes.rfc;
    companyModel.data.profilePicturePath = companyRes.profile_picture_path;
    companyModel.data.idAddress = companyRes.id_address;
    companyModel.data.idStatus = companyRes.id_status;
    companyModel.data.statusModel.id = companyRes.id_status;
    companyModel.data.statusModel.data.name = companyRes.status_name;

    companyModel.data.addressModel.id = companyRes.id_address;
    companyModel.data.addressModel.data.city = companyRes.city;
    companyModel.data.addressModel.data.countryCode = companyRes.country_code;
    companyModel.data.addressModel.data.insideNumber = companyRes.inside_number;
    companyModel.data.addressModel.data.street = companyRes.street;
    companyModel.data.addressModel.data.cologne = companyRes.cologne;
    companyModel.data.addressModel.data.outsideNumber = companyRes.outside_number;
    companyModel.data.addressModel.data.postalCode = companyRes.postal_code;
    companyModel.data.addressModel.data.state = companyRes.state;
    return companyModel
  }
}
