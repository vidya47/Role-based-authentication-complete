import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Auth {

  public token: any;
  //public data: any;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello Auth Provider');
  }

  checkAuthentication(){

      return new Promise((resolve, reject) => {

          //Load token if exists
          this.storage.get('token').then((value) => {

              this.token = value;

              let headers = new HttpHeaders();
              headers.append('Authorization', this.token);

              this.http.get('http://localhost:8080/api/auth/protected', {headers: headers})
                  .subscribe(res => {
                      resolve(res);
                  }, (err) => {
                      reject(err);
                  });

          });

      });

    }

    createAccount(details){

      return new Promise((resolve, reject) => {

          let headers = new HttpHeaders();
          headers.append('Content-Type', 'application/json');

          this.http.post('http://localhost:8080/api/auth/register', JSON.stringify(details), {headers: headers})
            .subscribe(res => {

              let data = res;
              this.token = data['token'];
              this.storage.set('token', this.token);
              resolve(data);

            }, (err) => {
              reject(err);
            });

      });

    }

    login(credentials){

      return new Promise((resolve, reject) => {

          let headers = new HttpHeaders();
          headers.append('Content-Type', 'application/json');

          this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(credentials), {headers: headers})
            .subscribe(res => {

              let data = res;
              this.token = data['token'];
              this.storage.set('token', this.token);
              resolve(data);

              resolve(res);
            }, (err) => {
              reject(err);
            });

      });

    }

    logout(){
      this.storage.set('token', '');
    }

  }
