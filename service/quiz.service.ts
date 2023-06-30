import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuiz() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  public deleteQuiz(quizId:any){
    return this.http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  // getSingleQuiz
  public getSingleQuiz(quizId:any){
    return this.http.get(`${baseUrl}/quiz/${quizId}`);
  }

  // getQuizesofCategory
  public getQuizesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  // get Active Quizzes
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);

  }

  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);

  }
}
