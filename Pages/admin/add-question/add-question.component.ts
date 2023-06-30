import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId='';
  quizTitle='';
  Question ={
    image:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:
    {
      qid:'',
    },
  };
  constructor(private _route:ActivatedRoute,private _snack:MatSnackBar,private _question:QuestionService){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.quizTitle = this._route.snapshot.params['title'];
    console.log(this.qId);
    this.Question.quiz['qid']=this.qId;
  }

  public AddQuestionToQuiz(){
    if(this.Question.content.trim()=='' || this.Question.content==null){
      this._snack.open('Content Required','',{
        duration:3000
      })
      return;
    }
    if(this.Question.option1.trim()=='' || this.Question.option1==null){
      this._snack.open('option1 Required','',{
        duration:3000
      })
      return;
    }
    if(this.Question.option2.trim()=='' || this.Question.option2==null){
      this._snack.open('option2 Required','',{
        duration:3000
      })
      return;
    }
    if(this.Question.option3.trim()=='' || this.Question.option3==null){
      this._snack.open('option3 Required','',{
        duration:3000
      })
      return;
    }
    if(this.Question.option4.trim()=='' || this.Question.option4==null){
      this._snack.open('option4 Required','',{
        duration:3000
      })
      return;
    }

    this._question.addQuestion(this.Question).subscribe(
      (data:any)=>{
        this.Question=data;
        Swal.fire('Success','Question is Add Successfully','success');
        console.log(data);
        this.Question ={
          image:'',
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:'',
          quiz:
          {
            qid:'',
          },
        };
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','Getting problem from server side','error');
      }
    )
  }

}
