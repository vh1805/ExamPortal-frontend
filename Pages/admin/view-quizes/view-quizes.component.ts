import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit{
  public Quiz =[
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

  constructor(private quiz : QuizService){}
  
  ngOnInit(): void {
    this.quiz.getQuiz().subscribe(
      (data:any)=>{
        this.Quiz=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  deleteQuiz(qId:any){
    this.quiz.deleteQuiz(qId).subscribe(
      (data:any)=>{
        this.Quiz=this.Quiz.filter((_quiz)=>_quiz.qid!=qId);
        Swal.fire('Success','Quiz Deleted','success');
      },
      (error)=>{
        Swal.fire('Error','Something Went Wrong While Deleting Quiz','error');
        console.log(error);
      }
    );

  }


}
