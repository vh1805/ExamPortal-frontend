import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  public category ={
    title:'',
    description:''
  };
  constructor(private snack:MatSnackBar,private _category:CategoryService){}
  ngOnInit(): void {
    
  }

   formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open('Title Required','',{
        duration:3000
      });
      return; 
    }
    if(this.category.description.trim()=='' || this.category.description==null){
      this.snack.open('Description Required','',{
        duration:3000
      });
      return; 
    }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire('Success','Category is added Successfully','success');
      },
      (error)=>{
        Swal.fire('error !!','Something Went Wrong','error');
        console.log(error);
      }
    );
  }

}
