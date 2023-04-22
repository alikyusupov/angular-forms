import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getSkills(): Observable<string[]>{
    return of(['Git', 'Typescript', 'Angular', 'Nest']).pipe(delay(1000))
  }
}
