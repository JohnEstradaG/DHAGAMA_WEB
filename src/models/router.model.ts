export class RouterModel {
  children: RouterModel[]
  icon: string;
  name: string;
  route: string;
  url: string;

  constructor(children?: any, icon?: any, name?: any, route?: any, url?: any) {
    if (children && icon && name && route && url) {
      this.children = children;
      this.icon = icon;
      this.name = name;
      this.route = route;
      this.url = url;
    } else {
      this.children = [];
      this.icon = '';
      this.name = '';
      this.route = '';
      this.url = '';
    }
  }
}
