import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { SelectType } from 'custom-form-controls';
import { User } from './core/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  selectValue = new FormControl([
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
  ]) 

  users: User[] = [
    new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(3, 'Marie Curie', 'marie', 'Poland/French'),
    new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
    new User(5, 'Stephen Hawking', 'stephen', 'United Kingdom', true),
    new User(6, 'Max Planck', 'max', 'Germany'),
    new User(7, 'James Clerk Maxwell', 'james', 'United Kingdom'),
    new User(8, 'Michael Faraday', 'michael', 'United Kingdom'),
    new User(9, 'Richard Feynman', 'richard', 'USA'),
    new User(10, 'Ernest Rutherford', 'ernest', 'New Zealand'),
  ];

  filteredUsers = this.users

  constructor(private readonly cd: ChangeDetectorRef) {

    // setTimeout(() => this.selectValue.disable() , 3000)

    // setTimeout(() => {
    //   this.selectValue = new User(3, 'Marie Curie', 'marie', 'Poland/French')
    //   this.users = [
    //     new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
    //     new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    //     new User(3, 'Marie Curie', 'marie', 'Poland/French'),
    //     new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
    //   ]
    //   this.cd.markForCheck()
    // }, 3500)
  }

  ngOnInit(): void {
    this.selectValue.valueChanges.subscribe(this.onSelectionChanged)
  }
  
  displayWithFn(user: User){
    return user.name
  }

  compareWithFn(user1: User | null, user2: User | null ){
    return user1?.id === user2?.id
  }

  onSelectionChanged(value: unknown) {
    if(!value) 
      this.filteredUsers = this.users
    console.log('selected value ', value)
  }

  onSearchChanged(value: string | undefined){
    if(!value) 
      this.filteredUsers = this.users
    else 
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(value.toLowerCase()))
  }
}
