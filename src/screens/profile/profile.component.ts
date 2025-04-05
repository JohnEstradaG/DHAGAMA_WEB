import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user/user-form/user-form.component';
import dictionaryUtils from '../../utils/dictionary.utils';
import { AuthService } from '../../services/auth.service';
import { FormService } from '../../services/form.service';
import { Utils } from '../../utils/utils';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false
})
export class ProfileComponent implements OnInit {

  isLoading = true;
  dictionaryUtils = dictionaryUtils;
  utils = new Utils();

  constructor(
    public authService: AuthService,
    private formService: FormService,
    private emailService: EmailService,
  ) { }

  ngOnInit(): void {
      this.isLoading = false
  }

  editProfile() {
    const dialogRef = this.formService.openForm(UserFormComponent, { userModel: this.authService.currentUser, disabledProfile: true  }, this.dictionaryUtils.widthForm.xs)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoading = false
      }
    })
  }

  forgotPassword() {
    this.formService.openMessageDialog(dictionaryUtils.actions.restorePassword, 'Esta seguro que desea restablecer su contraseña', true).afterClosed().subscribe((result) => {
      if(result === true){
        this.emailService.forgotPassword(this.authService.currentUser!.data.email).then(() => {
        this.formService.openMessageDialog(this.dictionaryUtils.labels.didYouForgetYourPassword, 'Se ha enviado un correo con las indicaciones para restablecer su contraseña', false)
      }).catch(() => {
        this.formService.showMessageSnackBar('Correo inválido', 'error-snackbar')
      })
      }
    })
  }
}
