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

    //Creamoso el body
    const user: User = {
      email: this.email,
      password: this.password,
      name: '',
      surname: ''
    }

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (data: any) => {
        console.log(data); // Verifica que data sea realmente el objeto que esperas
        // Accede a las propiedades del objeto directamente
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });    
    
  }
  
}
