import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public login:LoginService){}
}
