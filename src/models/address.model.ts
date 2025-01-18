import { DataBaseModel } from './database.model';

export class AddressModel extends DataBaseModel {
    override data: {
        city: string,
        state: string,
        postalCode: string,
        countryCode: string,
        street: string ,
        cologne: string,
        insideNumber: string | null,
        outsideNumber: string ,
    };

    constructor(id: number = 0, data?: any) {
        super(id, data);
        if (data) {
            this.data = data;
        } else {
            this.data = {
                city: '',
                state: '',
                postalCode: '',
                countryCode: 'MX',
                street: '',
                cologne: '',
                insideNumber: null,
                outsideNumber: ''
            }
        }
    }

    public static setAddresses(addressesRes: any[]) {
        const addresses: AddressModel[] = []
        addressesRes.forEach(addressRes => {
            addresses.push(this.setAddress(addressRes))
        });
        return addresses
    }

    public static setAddress(addressRes: any) {
        const addressModel = new AddressModel();
        addressModel.id = addressRes.id;
        addressModel.data.city = addressRes.city;
        addressModel.data.countryCode = addressRes.country_code;
        addressModel.data.insideNumber = addressRes.inside_number;
        addressModel.data.street = addressRes.street;
        addressModel.data.cologne = addressRes.cologne;
        addressModel.data.outsideNumber = addressRes.outside_number;
        addressModel.data.postalCode = addressRes.postal_code;
        addressModel.data.state = addressRes.state;
        return addressModel;
    }
}
