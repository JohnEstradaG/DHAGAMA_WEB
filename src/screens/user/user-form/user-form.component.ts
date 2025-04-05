import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ResponseModel } from "../../../models/response.model";
import dictionaryUtils from "../../../utils/dictionary.utils";
import { Utils } from "../../../utils/utils";
import { RoleModel } from "../../../models/roles.model";
import { UserModel } from "../../../models/user.model";
import { AuthService } from "../../../services/auth.service";
import { RolesService } from "../../../services/roles.service";
import { UsersService } from "../../../services/users.service";
import { FormService } from "../../../services/form.service";

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
})

export class UserFormComponent implements OnInit {

  dictionaryUtils = dictionaryUtils;
  utils = new Utils();
  roles: RoleModel[] = []
  branches = []
  isLoading = true;
  isLoadingPicture = true;
  profilePictureChanged = false;
  userModel = new UserModel();
  file: File | null = null;
  fileReader: FileReader | null = null;

  nameFormControl = new FormControl<string | null>(null, [Validators.required]);
  fisrNameFormControl = new FormControl<string | null>(null, [Validators.required]);
  lastNameFormControl = new FormControl<string | null>(null, [Validators.required]);
  licenseNumberFormControl = new FormControl<string | null>(null);
  emailFormControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  phoneFormControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(10)]);
  roleFormControl = new FormControl<number | null>(null, [Validators.required]);

  userFormGroup = new FormGroup({
    name: this.nameFormControl,
    firstName: this.fisrNameFormControl,
    lastName: this.lastNameFormControl,
    licenseNumber: this.licenseNumberFormControl,
    email: this.emailFormControl,
    phone: this.phoneFormControl,
    idRole: this.roleFormControl
  })


  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userModel: UserModel, disabledProfile: boolean, route: string },
    public rolesService: RolesService,
    private usersService: UsersService,
    private formService: FormService,
  ) { }

  ngOnInit() {
    if (this.data.userModel !== undefined) {
      this.setDataUser()
    } else {
      this.loadInformations();
    }
  }

  loadInformations() {
    this.rolesService.getAll().then((roles: RoleModel[]) => {
      this.roles = roles;
      this.isLoading = false;
      this.isLoadingPicture = false;
    });
  }


  setDataUser() {
    this.userModel = this.data.userModel;
    this.roles.push(this.userModel.data.roleModel)
    
    this.userFormGroup.setValue({
      name: this.userModel.data.name,
      firstName: this.userModel.data.firstName,
      lastName: this.userModel.data.lastName,
      licenseNumber: this.userModel.data.licenseNumber,
      email: this.userModel.data.email,
      phone: this.userModel.data.phone,
      idRole: this.userModel.data.idRole,
    });
    this.roleFormControl.disable()
    this.emailFormControl.disable() 
    this.isLoading = false;
    this.isLoadingPicture = false;
  }

  saveOrUpdate() {
    
    this.isLoading = true;
    this.userFormGroup.disable();
    this.userModel.data.name = this.userFormGroup.value.name!;
    this.userModel.data.firstName = this.userFormGroup.value.firstName!;
    this.userModel.data.lastName = this.userFormGroup.value.lastName!;
    this.userModel.data.licenseNumber = this.userFormGroup.value.licenseNumber!;
    this.userModel.data.email = this.userFormGroup.value.email!;
    this.userModel.data.phone = this.userFormGroup.value.phone!;
    this.userModel.data.idRole = this.userFormGroup.value.idRole!;
    this.userModel.data.idCompany = this.authService.currentUser!.data.idCompany;
    this.userModel.data.companyModel = this.authService.currentUser!.data.companyModel;
    if (this.data.userModel !== undefined) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.usersService.update(this.userModel).then(() => {
      this.formService.showMessageSnackBar('El usuario se actualizó correctamente', 'success-snackbar');
      this.dialogRef.close(true);
    }).catch(() => {
      this.formService.showMessageSnackBar('El usuario no pudo ser actualizado', 'error-snackbar');
    })
  }

  create() {
    this.usersService.create(this.userModel).then((responseModel: ResponseModel) => {
      if (responseModel.response.id_user_data !== undefined) {
        this.isLoading = false;
        this.dialogRef.close(true)
        this.formService.showMessageSnackBar('El usuario se creó correctamente', 'success-snackbar');
      } else {
        this.isLoading = false;
        this.formService.showMessageSnackBar('El correo ya existe en nuestro sistema', 'error-snackbar');
      }

    })
  }

  loadImg(files: FileList | null) {
    if (files && files[0]) {
      if (files[0].type === 'image/png' || files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
        this.profilePictureChanged = true;
        this.file = files[0]
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          this.fileReader = e.target;
        } 
      } else {
        this.formService.showMessageSnackBar(dictionaryUtils.messages.selectedFileNotImage, 'error-snackbar');
      }
    }
  }

}
