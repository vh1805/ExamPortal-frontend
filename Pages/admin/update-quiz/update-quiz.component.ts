import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  quizId=0;
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
      title:''
    }
  };
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private category:CategoryService,private route:Router){}
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

    this.quizId= this._route.snapshot.params['qid']; 
    this._quiz.getSingleQuiz(this.quizId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);

      },
      (error)=>{
        Swal.fire('Error','SomeWent went wrong while fetching data from server','error');
        console.log(error);
      }
    )
    // alert(this.quizId);
  }

  formSubmit() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('success','Quiz Data Updated Successfully','success').then(
          (e)=>{
            this.route.navigate(['/admin/view-quiz']);
          }
        );
        console.log(data);

      },
      (error)=>{
        Swal.fire('Error !!','Something Went Wrong','error');
        console.log(error);
      }
    )
  }

}
