import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from './auth';
import 'rxjs/add/operator/map';


/*
  Generated class for the Todos provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Todos {

  constructor(public http: HttpClient, public authService: Auth) {
    console.log('Hello Todos Provider');
  }

  getTodos(){

      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Authorization', this.authService.token);

        this.http.get('http://localhost:8080/api/todos', {headers: headers})
          //.map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err);
          });
      });

    }

    createTodo(todo){

      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.token);

        this.http.post('http://localhost:8080/api/todos', JSON.stringify(todo), {headers: headers})
          .map(res => res)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    }

    deleteTodo(id){

      return new Promise((resolve, reject) => {

          let headers = new HttpHeaders();
          headers.append('Authorization', this.authService.token);

          this.http.delete('http://localhost:8080/api/todos/' + id, {headers: headers}).subscribe((res) => {
              resolve(res);
          }, (err) => {
              reject(err);
          });

      });

    }

  }
