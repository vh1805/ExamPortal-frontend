import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit{
  categories = [
    {
      cid:1,
      title:"",
      description:''
    }
  ];
  constructor(public _category : CategoryService){}
  public ngOnInit(): void {
    this._category.getCategory().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);

      },
      (error:any) =>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data' , 'error');
      }

    )
    
  }

}
