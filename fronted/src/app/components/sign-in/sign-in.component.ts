import { Component, inject } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';


import { UsersService } from '../../services/users.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, SpinnerComponent, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastrSvc: ToastrService, 
    private _userService: UsersService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  addUser() {
    //validamos que el usuario ingrese valores
    if(this.name == '' || this.surname == '' || this.email == '' || this.password == '' || this.confirmPassword == ''){
      this.toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if(this.password != this.confirmPassword) {
      this.toastrSvc.error('Las contraseñas no coinciden','Error');
      return;
    }

    //creamos el objeto
    const user: User = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    }
    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastrSvc.success(` ${this.name} te has registrado con exito`,'Usuario Registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
      this.loading = false;
      this._errorService.msjError(e);
      }
    })
  }

}
