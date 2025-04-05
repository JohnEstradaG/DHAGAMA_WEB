import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { LoginComponent } from '../screens/login/login.component';
import { NavbarComponent } from '../screens/navbar/navbar.component';
import { UserComponent } from '../screens/user/user.component';
import { UserFormComponent } from '../screens/user/user-form/user-form.component';
import { EmailService } from '../services/email.service';
import { ProfileComponent } from '../screens/profile/profile.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from '../components/confirmation/confirmation-dialog.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatDialogModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatTableModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatListModule,
        MatSlideToggleModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        UserComponent,
        UserFormComponent,
        ProfileComponent,
        ConfirmationDialogComponent
    ],
    providers: [
        HttpClient,
        AuthService,
        EmailService,
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AppModule { }