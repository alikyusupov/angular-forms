import { FormBuilder, FormGroup } from "@angular/forms";

import { Component } from "@angular/core";

const DEFAULT_TEMPLATE = `
  <p><strong>Hello world!!!</strong></div>
`

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  myForm: FormGroup = this.fb.group({
    reviewText: '' || DEFAULT_TEMPLATE
  })

  constructor(private readonly fb: FormBuilder){
    this.myForm.controls['reviewText'].disable()
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value)
    form.reset()
  }
}
