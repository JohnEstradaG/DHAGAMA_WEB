import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Utils } from '../../utils/utils';
import dictionaryUtils from '../../utils/dictionary.utils';
import { FormService } from '../../services/form.service';
import { noWhitespaceValidator } from '../../services/validators.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MatDialogModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatInputModule, MatIconModule],
  providers: [
    HttpClient,
    AuthService,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  isLoading = false;
  dictionaryUtils = dictionaryUtils;
  utils = new Utils();

  emailFormControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  passwordFormControl = new FormControl<string | null>(null, [Validators.required, noWhitespaceValidator]);

  loginFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  });

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setAuthListener();
  }

  setAuthListener() {
    const authenticate = this.authService.isAuthenticated();
    if (authenticate === true) {
      if (this.authService.token !== null) this.router.navigate(['/control-acceso']);;
    } else {
      this.isLoading = false;
    }
  }

  signIn() {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      this.authService.signIn(this.loginFormGroup.value.email!, this.loginFormGroup.value.password!).then((token: any) => {
        (token !== null) ? this.correctLogin(token) : '';
        this.isLoading = false;
      }
      ).catch(() => {
        this.isLoading = false;
        this.formService.showMessageSnackBar('Datos inválidos', 'error-snackbar');
      })
    }
  }

  correctLogin(token: string) {
    this.authService.setValueLocalStorage('token', token);
    this.authService.token = token;
    this.router.navigate(['/control-acceso']);
  }
}
