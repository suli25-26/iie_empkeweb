import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm !: any;

  constructor(
    private auth: AuthService,
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.builder.group({
      name: [''],
      password: ['']
    })

  }

  login() {
    console.log('belépés...')
    console.log(this.loginForm.value)

    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response)
        localStorage.setItem('token', response.accessToken)
        this.router.navigate(['employee'])
      },
      error: () => {
        console.log('------Hiba!------')
        // alert('Hiba! A bejelentkezés sikertelen!')
        Swal.fire({
          icon: 'error',
          title: 'Hiba! A bejelentkezés sikertelen!',
          timer: 4000
        })
      }
    })    

  }

}
