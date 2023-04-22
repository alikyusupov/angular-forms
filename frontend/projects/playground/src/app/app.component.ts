import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { delay, of } from 'rxjs';

export type RateOptions = 'fire' | 'neutral' | 'sucks' | null

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  feedbackForm: FormGroup = this.fb.group({
    rate: 'sucks'
  })

  constructor( private readonly fb: FormBuilder ){
    this.feedbackForm.controls['rate'].disable()
    of(null).pipe(delay(1500)).subscribe(() => {
      this.feedbackForm.controls['rate'].enable()
    })
  }

  ngOnInit(): void {
    this.feedbackForm.get('rate')?.valueChanges.subscribe(console.log)
  }

  onChange(event: RateOptions): void {
    //this.feedbackForm.controls['rate'].setValue(event)
  }

  onSave(){
    console.log(this.feedbackForm.value)
  }
}
