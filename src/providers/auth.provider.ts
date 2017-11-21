import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';
import { User } from '../models/user.model';


@Injectable()
export class Auth {
  public user: User;
  public whitelist: string[];

  constructor( public googlePlus: GooglePlus ) {
    this.whitelist = new Array<string>();
  }

  mocklogin(): boolean {
    let u = new User();
    u.email = "test@test.com";
    u.userId = "idXXX";
    u.givenName = "Randy";
    u.lastName = "Testerson";
    u.idToken = "tokenXXX";
    this.user = u;
    return true;
  }

  getUser(): User {
    return this.user;
  }

  login(): Promise<any> {
      let promise = new Promise((resolve, reject) => {
        // Do some async stuff
           this.googlePlus.login({
            'webClientId': '889363901107-flqospl2tq54j07uvguise4ffbk0trhc.apps.googleusercontent.com',
            'offline': true
            }).then((res) => {
             this.user = res;
             resolve(res);

            }, (err) => {
              this.user = null;
               reject(err);
            });
      });
      return promise;   
  }

  logout() {
  }
}