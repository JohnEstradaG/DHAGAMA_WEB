import { DataBaseModel } from "./database.model";

export class StatusModel extends DataBaseModel {

    override data: {
        name: string,
        colour: string,
        textColour: string
    };

    constructor(id: number = 0, data?: any) {
        super(id, data);
        if (data) {
            this.data = data;
        } else {
            this.data = {
                name: '',
                colour: 'black',
                textColour: 'white',
            }
        }
    }

    static setStatus(statusRes: any[]) {
        const domains: StatusModel[] = []
        statusRes.forEach(status => {
            const statusModel = new StatusModel()
            statusModel.id = status.id
            statusModel.data.name = status.name
            statusModel.data.colour = status.colour
            statusModel.data.textColour = status.text_colour
            domains.push(statusModel)
        });
        return domains
    }
}