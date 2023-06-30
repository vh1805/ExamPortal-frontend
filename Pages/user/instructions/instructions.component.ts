import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId=null;
  public Quizzes = 
    {
      qid:'',
      title:'',
      description:'',
      maxMarks:0,
      numberOfQuestions:0,
      category : {
        cid:'',
        title:''
      }
    }
  constructor(private _route:ActivatedRoute, private _quiz:QuizService,private _router:Router){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    // console.log(this.qId);
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any) => {
        this.Quizzes=data;
        console.log(this.Quizzes);

      },
      (error) => {
        Swal.fire('Error !!','Getting problem from server side for loading data','error');
        console.log(error);
      }
    )
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to start the quiz!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText:'start',
    }).then((result) => {
      if (result.isConfirmed) {

        this._router.navigate(['/start/' + this.qId])



      }
    })

  }

}
