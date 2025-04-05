import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { RouterModel } from '../../models/router.model';
import { Utils } from '../../utils/utils';
import dictionaryUtils from '../../utils/dictionary.utils';
import { FormService } from '../../services/form.service';
import { UserModel } from '../../models/user.model';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  utils = new Utils();
  dictionaryUtils = dictionaryUtils;
  navbar: RouterModel[] = [];
  navbarForms: RouterModel[] = [];
  currentRouter = new RouterModel();
  isLoading = true;
  previousUrl = '';
  isHome = false;
  selected = '';

  constructor(
    public authService: AuthService,
    public usersService: UsersService,
    private router: Router,
    private formService: FormService,
    private statusService: StatusService
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.previousUrl = event.url;
      if (this.isLoading === false) this.changeViewName();
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.usersService.getOneByToken().then((userModel: UserModel) => {
      this.authService.currentUser = userModel;
      this.loadInformationsPerRole();
    });
  }

  getAllStatus() {
    return new Promise((resolve) => {
      this.statusService.getAll().then((status) => {
        this.statusService.status = status;
        resolve(true)
      });
    });
  }

  loadInformationsPerRole() {
    this.changeViewName();
    if (this.router.url.split('/').length < 3) this.correctLogin();
  }

  correctLogin() {
    if (this.utils.isMobileDevice() === true) {
      this.redirectMobile();

    } else {
      this.redirectDesktop();
    }
  }

  redirectDesktop() {
    switch (this.authService.currentUser!.data.idRole) {
      case 1:
        this.router.navigate([this.dictionaryUtils.routes.users.url]);
        break;

      default:
        this.router.navigate([this.dictionaryUtils.routes.profile.url]);
        break;
    }
  }

  redirectMobile() {
    
  }

  deshabilitaRetroceso() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"
    window.onhashchange = function () { window.location.hash = ""; }
  }

  validateMenuByRole(): void {
    this.navbar = this.utils.getNavBar(this.authService.currentUser!);
    this.navbarForms = this.utils.getNavBarOptions();
    this.isLoading = false;
  }

  changeViewName(): void {
    this.isHome = false;
    const activeRoute = this.router.url.split('/');
    this.currentRouter = new RouterModel();
    if (activeRoute.length > 4) {
      this.isHome = false
      this.getInfoRoute(activeRoute);
    } else {
      if (activeRoute[activeRoute.length - 1].includes('form')) {
        this.setRoute(activeRoute, this.utils.viewNameURL(activeRoute[activeRoute.length - 2]).name + ' / ' + this.utils.viewNameURL(activeRoute[activeRoute.length - 1]).name)
        this.isHome = false
      } else {
        this.currentRouter = this.utils.viewNameURL(activeRoute[2] !== undefined ? activeRoute[2] : '');
        this.selected = this.currentRouter.url;
        this.isHome = true
      }
    }
    this.validateMenuByRole();
  }

  setRoute(routes: string[], path: string) {
    this.currentRouter.name = (routes.length > 5 ? '.../' : '') + path;
  }


  getInfoRoute(routes: string[]) {
    if (routes.length <= 5) {

    } else {

    }
  }


  goBack(): void {
    const activeRoute = this.router.url.split('/');
    if (activeRoute.length <= 5) {
      this.router.navigate(['dhagama/' + activeRoute[2]]);
    } else {
      this.router.navigate(['dhagama/' + activeRoute[2] + '/' + activeRoute[3]]);
    }

  }

  optionNavBar(type: string) {
    switch (type) {
      case 'logout':
        this.logOut();
        break;
    }
  }

  openDialog(componentType: ComponentType<unknown>, data: any, widthForm: string) {
    this.formService.openForm(componentType, data, widthForm);
  }

  logOut() {
    this.isLoading = true;
    this.close();
  }

  close() {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.logOut();
    this.router.navigate(['login']);
  }

  routes() {
    switch (this.authService.currentUser!.data.idRole) {
      case 1:
        this.router.navigate([this.dictionaryUtils.routes.users.url]);
        break;

      default:
        this.router.navigate([this.dictionaryUtils.routes.profile.url]);
        break;
    }
  }
}
