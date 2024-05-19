import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  // userData: any;

  constructor(private toastr: ToastrService, 
    private _userService: UsersService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  login() {
    //validamos que le usuario iungrese datos
    if (this.email == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    //Creamos el body
    const user: User = {
      email: this.email,
      password: this.password,
      name: '',
      surname: ''
    }
    // console.log(this.email);
    // console.log(this.password);

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (data: any) => {
        // console.log(data); // Verifica que data sea realmente el objeto que esperas
        // this.userData = data;
        // console.log("userdata->",this.userData);
        // this._userService.setUserData(data);
        // Accede a las propiedades del objeto directamente
        localStorage.setItem('token', data.token);

        // Redirigir al usuario a la URL almacenada o al dashboard
        const redirectUrl = localStorage.getItem('redirectUrl');
    
        if (redirectUrl) {
          localStorage.removeItem('redirectUrl');
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });    
    
  }
  
}
