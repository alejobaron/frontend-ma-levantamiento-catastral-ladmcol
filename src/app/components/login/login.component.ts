import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    username:'',
    password:''
  };

  apiLoginObj: any = 	{
    "username": "",
    "password": ""
  }

  router = inject(Router);
  http = inject(HttpClient)

  onLogin(){
    debugger;
   this.http.post("http://localhost:8000/login/", this.apiLoginObj).subscribe((res:any)=>{
    debugger;
    localStorage.setItem("token", res.token)
    this.router.navigateByUrl("predio")
   }, error=> {
    debugger;
    alert("Credenciales incorrectas.")
   })
  }
}
