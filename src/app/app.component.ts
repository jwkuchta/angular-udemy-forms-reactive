import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  signupForm: FormGroup

  // we will initialize the form here, before the form is rendered
  ngOnInit() {
    this.signupForm = new FormGroup({
      // here we add the controlls, which are key-value pairs
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('other')
    })
  }

  // we don't need to get a form via local reference like we did in tda 
  // because we created the form in Typescript, and we already have access to it
  onSubmit() {
    console.log(this.signupForm)
  }
}
