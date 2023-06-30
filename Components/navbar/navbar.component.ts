import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   isLoggedIn=false;
   user=null;
   role='';

  constructor(public login:LoginService,private router:Router) {}
  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe( 
      (data) => {
        this.isLoggedIn=this.login.isLoggedIn();
        this.user=this.login.getUser();
      }
    )
  }


  public logout() {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }

  public navigate(){
    this.role = this.login.getUserRole();
    if(this.role=='ADMIN'){
      this.router.navigate(['admin/profile']);
    }
    else if(this.role=='NORMAL USER'){
      this.router.navigate(['user-dashboard/user-profile']);
    }
    else{
      return;
    }
    
  }

}
