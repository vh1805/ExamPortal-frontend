import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/service/user-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private us:UserServiceService,private _snack:MatSnackBar) {
  }
  

  public user= {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  formSubmit() 
  {
    console.log(this.user);
    if(this.user.username=='' || this.user.username == null)
    {
      this._snack.open("Username is required !!","",
      {
        duration:3000
      });
      return;
    }
    // calling add user function
    this.us.adduser(this.user).subscribe(
      (data:any) =>{
        console.log(data);
        // alert('Success');
        swal.fire('Success','user is registered' + data.id ,'success');
      },
      (error) =>{
        console.log(error);
        // alert('Something Went Wrong');
        this._snack.open('Something Went Wrong','',{
          duration:3000
        })
      }
    );

  }

}
