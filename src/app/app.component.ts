import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { forbiddenWordValidator, forbiddenWordsValidator } from "./validators/forbidden-words.validator";

import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  form: FormGroup = this._fb.group({
    firstname: "",
    lastname: "",
    nickname: ['kleot', [forbiddenWordsValidator(['test', 'dummy'])]],
    addressGroup: this._fb.group({
      postal: '',
      address: ''
    }),
    phones: this._fb.array([
      this._fb.group({
        type: '',
        phone: ''
      }),
    ]),
    skills: this._fb.group({})
  })

  types = ["Mobile", "Work", "Personal"]
  skills$!: Observable<string[]>

  constructor(private readonly userService: UserService, private readonly _fb: FormBuilder){}

  ngOnInit(): void {
    this.skills$ = this.userService.getSkills().pipe(tap((skills) => {
      skills.forEach(skill => {
        (this.form.controls.skills as FormGroup).addControl(skill, new FormControl(false))
      })
    }))
  }

  addPhone(){
    (this.form.controls.phones as FormArray).insert(0, new FormGroup({
        type: new FormControl('Mobile'),
        phone: new FormControl('')
    }))
  }

  removePhone(i: number){
    (this.form.controls.phones as FormArray).removeAt(i)
  }

}
