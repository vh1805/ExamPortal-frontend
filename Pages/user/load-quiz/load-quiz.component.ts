import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  Id:any;
  public Quizzes =[
    {
      qid:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:false,
      category: {
        title:''
      }
    }
  ]; 
  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}
  ngOnInit(): void {
    this._route.params.subscribe(
      (params:any)=>{
        console.log(params);
        this.Id=params['catId'];

        if(this.Id==0){
          console.log('load all the Quiz');
          this._quiz.getActiveQuizzes().subscribe(
            (data:any) => {
              this.Quizzes=data;
              // console.log(this.Quizzes);
              console.log(this.Quizzes);
    
            },
            (error)=>
            {
              Swal.fire('Error !!','getting problem from server side','error');
              // console.log(error);
            }
          )
    
    
        }
        else{
          console.log('load specific quiz');
          this._quiz.getActiveQuizzesOfCategory(this.Id).subscribe(
            (data:any)=>{
              this.Quizzes=data;
              console.log(data);
            },
            (error)=>{
              alert('getting problem from server side for loading data');
              console.log(error);
            }
          )
    
        }

      }
    )
  }

}
