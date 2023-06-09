import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private us : UserServiceService){

  }

  public user = {
    username:'',
    password:'',
  }

  formSubmit(){
    if(this.user.username=='' || this.user.username==null)
    {
      alert('username required !!!');
      return;
    }

    this.us.adduser(this.user).subscribe(
      (data)=>{
        console.log(data);
        alert('Success');
      },
      (error)=>{
        console.log(error);
        alert('Something went wrong');
      }
    )
}
}
