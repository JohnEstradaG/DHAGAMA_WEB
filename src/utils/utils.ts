
import { RouterModel } from '../models/router.model';
import { UserModel } from '../models/user.model';
import dictionaryUtils from './dictionary.utils';


export class Utils {

  dictionaryUtils = dictionaryUtils;
  timeout: any;

  getNavBar(userModel: UserModel): RouterModel[] {
    return this.isMobileDevice() === true ? this.getNavbarMobile(userModel) : this.getNavbarDesktop(userModel);
  }

  getNavbarMobile(userModel: UserModel): RouterModel[] {
    const sidenav: RouterModel[] = [];
    sidenav.push(this.dictionaryUtils.routes.profile);
    return sidenav;
  }

  getDelaySearch() {
    return 500;
  }

  getNavbarDesktop(userModel: UserModel): RouterModel[] {
    const sidenav: RouterModel[] = [];
    switch (userModel.data.idRole) {
      case 1:
        sidenav.push(dictionaryUtils.routes.users);
        break;
    }
    sidenav.push(this.dictionaryUtils.routes.profile);
    return sidenav;
  }

  getNavBarOptions(): RouterModel[] {
    const sidenav: RouterModel[] = [];
    sidenav.push(this.dictionaryUtils.routes.logout);
    return sidenav;
  }

  viewNameURL(name: string): RouterModel {
    let routerModel: RouterModel = new RouterModel;
    switch (true) {

      case name.includes(this.dictionaryUtils.routes.users.route):
        routerModel = this.dictionaryUtils.routes.users;
        break;

      case name.includes(this.dictionaryUtils.routes.profile.route):
        routerModel = this.dictionaryUtils.routes.profile;
        break;
    }
    return routerModel;
  }

  formatDateCSV(date: string): Date {
    const arrayDate = date.toString().split('/');
    return new Date(arrayDate[1] + '/' + arrayDate[0] + '/' + arrayDate[2]);
  }

  formatDate(date: Date, type: string) {
    let dateFormat = '';
    switch (type) {
      case this.dictionaryUtils.labels.startDate:
        dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' 00:00:00';
        break;
      case this.dictionaryUtils.labels.endDate:
        dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' 23:59:59';
        break;

      case this.dictionaryUtils.labels.fullDate:
        dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0');
        break;
    }
    return dateFormat;
  }

  errorStatus(error: any, page: string): string {
    let title = '';
    switch (error.code) {
      case 'auth/invalid-email':
        title = 'El correo es inválido'
        break;
      case 'auth/user-not-found':
        title = page === 'forgot-password' ? 'El usuario no existe.' : 'Usuario o contraseña incorrecta'
        break;
      case 'auth/too-many-requests':
        title = 'El acceso a esta cuenta se ha desactivado temporalmente debido a muchos intentos fallidos de inicio de sesión.'
        break;
      case 'auth/wrong-password':
        title = 'Usuario o contraseña incorrecta'
        break;
      case 'auth/user-disabled':
        title = 'No tiene acceso a la aplicación contacte con su administrador'
        break;

      default:
        break;
    }
    return title;
  }


  generateURL(paths: any[]) {
    let newPath = '';
    paths.forEach((path) => {
      newPath = newPath + (path.route + '/');
      if (path.id !== null) newPath = newPath + (path.id + '/');
    })
    return newPath;
  }

  generarLetra() {
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const numero = (Math.random() * 15).toFixed(0);
    return letras[parseInt(numero)];
  }

  colorHEX() {
    let coolor = '';
    for (let i = 0; i < 6; i++) {
      coolor = coolor + this.generarLetra();
    }
    return `#${coolor}`;
  }

  isMobileDevice() {
    if (window.screen.width <= 460) {
      return true;
    } else {
      return false;
    }
  }

  getTypeImage(fileName: string, type: string) {
    switch (type) {
      case 'image/png':
        return fileName + '.png';
      case 'image/jpeg':
        return fileName + '.jpeg';
      case 'image/jpg':
        return fileName + '.jpg';
      default:
        return fileName + '.png';
    }
  }

  dataURLToBlob(dataUrl: string): Blob {
    const splitarray = dataUrl.split(',');
    const mime = splitarray[0].match(/:(.*?);/)![1];
    const atobData = atob(splitarray[1]);
    let n = atobData.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = atobData.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  extractMimeType(dataUrl: string): string | null {
    const match = dataUrl.match(/^data:([^;]+)/i);
    return match?.[1] || null;
  }
}

