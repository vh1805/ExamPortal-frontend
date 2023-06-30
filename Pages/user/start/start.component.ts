import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId = '';
  Question = [{
    quesId: '',
    image: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    givenAnswer:'',
    quiz: {
      qid: '',
      title: '',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
    }
  }];

  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;


  constructor(private Location: LocationStrategy,
    private _route: ActivatedRoute,
    private _ques: QuestionService) { }
  ngOnInit(): void {
    this.disableBackButton();
    this.qId = this._route.snapshot.params['qid'];
    console.log(this.qId);
    this.loadQuestions();




  }

  loadQuestions() {
    this._ques.getQuestionOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.Question = data;
        this.Question.forEach(
          (q) => {
            q['givenAnswer']='';

          }
        );
        console.log(this.Question);

      },
      (error) => {
        Swal.fire('Error', 'Getting problem from server side for loading questions', 'error');
        console.log(error);
      }
    )
  }

  disableBackButton() {
    history.pushState(null, 'null', window.location.href);

    this.Location.onPopState(() => {

      history.pushState(null, 'null', window.location.href);

    });
  }

  submit() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Submit the quiz",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((result) => {
      if (result.isConfirmed) {
        // calculation
        this.isSubmit=true;

        this.Question.forEach(
          (q) => {
            if(q.givenAnswer == q.answer) {
              this.correctAnswer++;
              let marks = parseInt(this.Question[0].quiz.maxMarks, 10) / this.Question.length;
              this.marksGot+=marks;
            }
            if(q.givenAnswer.trim() != ''){
              this.attempted++;
            }
          }
        );
        console.log("Correct Answer = " + this.correctAnswer);
        console.log("Total marks = " + this.marksGot);
        console.log("Total Question attempted = " + this.attempted);
      } 

    })
  }



}
