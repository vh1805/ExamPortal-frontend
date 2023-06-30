import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizes',
  templateUrl: './add-quizes.component.html',
  styleUrls: ['./add-quizes.component.css']
})
export class AddQuizesComponent implements OnInit{
  categories = [
    {
      cid:1,
      title:'Programming'
    }
  ]

  quiz=
    {
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:true,
      category: {
        cid:'',
      }
    };

  constructor(private category: CategoryService,private _quiz : QuizService, private snack:MatSnackBar) {}

  ngOnInit(): void {
    this.category.getCategory().subscribe(
      (data:any) =>{
        this.categories=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Error in loading data from server','error');
      }
    )
  }

  formSubmit(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snack.open('Title Required','',{
        duration:3000
      });
      return;
    }
    if(this.quiz.description.trim()=='' || this.quiz.description==null){
      this.snack.open('Description Required','',{
        duration:3000
      });
      return;
    }
    this._quiz.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success','Quiz is added','success');
        this.quiz=
        {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category: {
            cid:'',
          }
        };

      },
      (error)=>{
        Swal.fire('Error !!','getting problem for adding quiz','error');
        console.log(error);
      }
    )

    

  }

}
