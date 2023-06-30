import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  Category=[
    {
      cid:'',
      title:'',
      description:''
    }
  ];

  constructor(private _category:CategoryService,public _user:UserServiceService,public _login:LoginService){}
  ngOnInit(): void {
    this._category.getCategory().subscribe(
      (data:any)=>{
        this.Category=data;
        console.log(data);
      },
      (error)=>{
        Swal.fire('Error !!','Getting problem of loading data from server side','error');
        console.log(error);
      }
    )
  }

  public logout(){
    this._login.logout();
    window.location.reload();
  }



}
