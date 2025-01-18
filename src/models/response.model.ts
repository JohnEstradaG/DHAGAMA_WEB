export class ResponseModel {
  date: any ;
  message: any;
  description: any;
  response: any;

  constructor(date?: any, message?: any, description?: any, response?: any) {
    if (date && message && description && response) {
      this.date = date;
      this.message = message;
      this.description = description;
      this.response = response;
    } else {
      date = '';
      message = 'ok';
      description = '';
      response = '';
    }
  }
}