import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username:'',
    password:''
  };

  constructor(private snack : MatSnackBar , private login: LoginService,private router:Router) {
  }

  formSubmit() {
    console.log("Login btn Submitted");
    if(this.loginData.username.trim()=='' || this.loginData.username==null) 
    {
      this.snack.open("username is required !!",'', {
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null) 
    {
      this.snack.open("password is required !!",'', {
        duration:3000,
      });
      return;
    }

    // request to server to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data : any) => {
        console.log('success');
        console.log(data);

        // login
        // now the token is generate and save it to the local Storage..........
        this.login.loginUser(data.token);
        // Now we have to find the details for the current user
        this.login.getCurrentUser().subscribe(
          (user:any) => {
            this.login.setUser(user);
            console.log(user);
            // redirect : ADMIN DASHBOARD
            // REDIRECT : NORMAL-USER

            if(this.login.getUserRole() == "ADMIN")
            {
              // Admin dashboard
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);


            }
            else if(this.login.getUserRole() == "NORMAL USER")
            {
              // user dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);


            }
            else
            {
              // logout
              this.login.logout();
            }
          }
        )
        
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.snack.open("Invalid details !!"," ",{
          duration:3000,
        } )
      }
    );
  }

  
}
