import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms'

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
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      // here we add the controlls, which are key-value pairs
      'gender': new FormControl('other'),
      'hobbies': new FormArray([])
    })
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

  // custom validator, validation needs to return true or null!!!
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    // if it is not found in the array
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'name is forbidden': true}
    }
    // this would be incorrect:
    // return {'name is forbidden': false}, return null instead, or return nothing
    return null
  }

  // I tried this and it worked. Alternative way to check if name is forbidden and arrow function so binding this is unnecessary
  // forbiddenNames = (control: FormControl): {[s: string]: boolean} => {
  //   if (this.forbiddenUsernames.includes(control.value)) return {'name is not allowed': true}
  // }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
}
