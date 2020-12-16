import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenParticipantService {
  tokenParticipant: BehaviorSubject<string>;

  constructor() {
  }

  setToken(t: any): void {
    this.tokenParticipant = t;
  }
}
