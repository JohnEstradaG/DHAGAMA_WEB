import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UserFormComponent } from "./user-form/user-form.component";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { UserModel } from "../../models/user.model";
import dictionaryUtils from "../../utils/dictionary.utils";
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { FormService } from "../../services/form.service";
import { EmailService } from "../../services/email.service";
import { Utils } from "../../utils/utils";
import { FormControl, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: false,
})

export class UserComponent implements OnInit {

  users: UserModel[] = [];
  dictionaryUtils = dictionaryUtils;
  userData = new UserModel();
  utils = new Utils()
  dataSource = new MatTableDataSource();

  displayedColumns: any[] = [ 'name', 'email', 'role', 'phone', 'licenseNumber', 'accessRestriction', 'options'];
  isLoading = true;
  isLoadingCsv = false

  pageIndex = 0;
  pageSize = 10;
  numberOfUsers = 0;

  searchFormControl = new FormControl<string | null>(null);
  searchFormGroup = new FormGroup({
    search: this.searchFormControl
  });

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    value !== undefined ? value._intl.itemsPerPageLabel = 'Usuarios por página' : '';
  }


  constructor(
    public authService: AuthService,
    private usersService: UsersService,
    private formService: FormService,
    private emailService: EmailService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadInformations();
  }

  loadInformations() {
    this.isLoading = true;
    const arrayObservavble: any[] = []
    this.dataSource.data = []
    arrayObservavble.push(this.usersService.getAllUsersNumberByCompany(this.searchFormControl.value!, null, this.authService.currentUser!.data.idCompany! ));
    arrayObservavble.push(this.usersService.getAllUsersByCompany(this.pageIndex, this.pageSize, this.searchFormControl.value!, null, this.authService.currentUser!.data.idCompany!));
    Promise.all(arrayObservavble).then((result) => {
      this.numberOfUsers = result[0].response;
      this.users = result[1];
      this.isLoading = false;
    });
  }

  searchUser() {
    if (this.utils.timeout != null) {
      clearTimeout(this.utils.timeout);
    }
    this.utils.timeout = setTimeout(() => {
      if (this.searchFormControl.value === '') {
        this.searchFormControl.setValue(null);
      } 
      this.dataSource.data = [];
      this.pageIndex = 0;
      this.loadInformations();
    }, this.utils.getDelaySearch());
  }

  deleteUser(userModel: UserModel) {
    const dialogResult = this.formService.openMessageDialog(this.dictionaryUtils.actions.delete, '¿Seguro que desea eliminar al usuario "' + userModel.data.name + '"?', true);
    dialogResult.afterClosed().subscribe((res) => {
      if (res) {
        this.isLoading = true;
        this.usersService.delete(userModel.id).then((res) => {
          if (res.response.affectedRows === 1) {
            this.formService.showMessageSnackBar('Usuario eliminado con éxito', 'success-snackbar');
            this.loadInformations();
            this.isLoading = false;
          } else {
            this.formService.showMessageSnackBar('Error al eliminar el usuario', 'error-snackbar');
            this.isLoading = false;
          }
        })
      }
    })
  }

  updatePermission(user: UserModel) {
    user.data.idStatus = user.data.idStatus === 1 ? 2 : 1;
    this.usersService.update(user).then(() => {
      this.isLoading = false;
    });
  }

  addOrEdit(userModel?: UserModel) {
    const dialogRef = this.formService.openForm(UserFormComponent, { userModel}, this.dictionaryUtils.widthForm.xs);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadInformations();
      }
    })
  }

  onPageChange(event: any): void {
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadInformations();
  }

  resetPass(userModel: UserModel) {
    const dialogResult = this.formService.openMessageDialog('Restablecer contraseña', '¿Desea enviar un correo electronico para restablecer su contraseña a ' + userModel.data.name + ' ' + userModel.data.firstName + ' ' + userModel.data.lastName + ' ?', true);
    dialogResult.afterClosed().subscribe((res: boolean) => {
      if (res === true) {
        this.emailService.forgotPassword(userModel.data.email).then(() => {
          this.formService.showMessageSnackBar('Se ha enviado el correo', 'success-snackbar');
        }).catch((err) => {
          this.formService.showMessageSnackBar('Ha ocurrido un error', 'error-snackbar');
        })
      }
    })
  }

  generateReportRow(users: any) {
    let row = '';
    row += users.workplace_name === null
      ? 'N/A,'
      : users.workplace_name + ',';
    row += users.name + ' ' + users.first_name + ' ' + users.last_name + ',';
    row += users.position + ',' +
      users.email + '\n';
    return row;
  }

}