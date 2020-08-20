import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: BehaviorSubject<string>;

  constructor() {
  }

  setToken(t: any): void {
    this.token = t;
    console.log(this.token);
  }
}
