import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female', 'other'];
  signupForm: FormGroup
  forbiddenUsernames = ['Slagathor', 'Hitler']

  // we will initialize the form here, before the form is rendered
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        // when this.forbiddenNames is called it will not refer to the class as intended, that's why we need to bind it
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        // normal validators have a separate array from asynchronous validators
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      // here we add the controlls, which are key-value pairs
      'gender': new FormControl('other'),
      'hobbies': new FormArray([])
    })
    this.signupForm.valueChanges.subscribe(value => console.log(value))
    this.signupForm.statusChanges.subscribe(status => console.log(status))
    // we also have access to setValue() and patchValue() in reactive forms
    this.signupForm.reset()
  }

  // we don't need to get a form via local reference like we did in tda 
  // because we created the form in Typescript, and we already have access to it
  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // we will add new hobby to the hobbies array
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  // custom validator, validation needs to return true or null!!!
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // if it is not found in the array
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameForbidden': true}
    }
    // this would be incorrect:
    // return {'name is forbidden': false}, return null instead, or return nothing
    return null
  }

  // I tried this and it worked. Alternative way to check if name is forbidden and arrow function so binding this is unnecessary
  // forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
  //   if (this.forbiddenUsernames.includes(control.value)) return {'name is not allowed': true}
  // }

  // validator for asynchronous data (like when an email needs to be checked in the database)
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({'emailForbidden': true})
        } else {
          resolve(null)
        }
      },1500)
    })
    return promise
  }


  
}
