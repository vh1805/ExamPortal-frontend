import { Component,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit{
  qId='';
  qTitle='';

  Question =[{
    quesId:'',
    image:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
];
  constructor(private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit(): void {
    this.qId= this._route.snapshot.params['qid']; 
    this.qTitle=this._route.snapshot.params['title'];
    console.log(this.qId,this.qTitle);

    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.Question=data;
        console.log(this.Question);

      },
      (error:any)=>{
        Swal.fire('Error !!','Getting problem from server side','error');
      }
    )
  }

  public deleteQuestion(queId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are u Sure, U wanna delete this question?'
    }).then(
      (result)=>{
        if(result.isConfirmed)
        {
          this._question.deleteQuestion(queId).subscribe(
            (data)=>{
              this.Question=this.Question.filter((q)=>q.quesId!=queId);
              Swal.fire('success','Question Deleted','success');
            },
            (error)=>{
              console.log(error);
            }
          )
        }

      }
    )

  }


}
