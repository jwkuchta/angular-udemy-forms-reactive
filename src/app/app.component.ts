import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup

  // we will initialize the form here, before the form is rendered
  ngOnInit() {
    this.signupForm = new FormGroup({
      // here we add the controlls, which are key-value pairs
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender': new FormControl('other')
    })
  }
}
