import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';

//$IMPORTSTATEMENT

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//$IONICPAGE
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html',
})
export class SignupPage {

  role: string;
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: Auth, public loadingCtrl: LoadingController) {
  }

  //ionViewDidLoad() {
    register(){

    this.showLoader();

    let details = {
        email: this.email,
        password: this.password,
        role: this.role
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
