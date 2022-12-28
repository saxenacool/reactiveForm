import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { forbidderNameValidator, passwordValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbidderNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password : [''],
      confirmPassword : [''],
      address: this.fb.group({
        city : [''],
        state : [''],
        postalCode : [''],
      }),
      alternateEmails: this.fb.array([])
    }, {validator: passwordValidator})

    this.registrationForm.get('subscribe')?.valueChanges.subscribe(checkedValue=> {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email?.setValidators(Validators.required);
      }else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  constructor(private fb: FormBuilder){}
  title = 'rf';

  get userName(){
    return this.registrationForm.get('userName');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''))
  }

  removeEmail(){
    this.alternateEmails.removeAt(-1);
  }

//   registrationForm = new FormGroup({
//     userName : new FormControl(''),
//     password : new FormControl(''),
//     confirmPassword : new FormControl(''),
//     address: new FormGroup({
//       city : new FormControl(''),
//       state : new FormControl(''),
//       postalCode : new FormControl(''),
//     })
// })

onClick(){
  console.log(this.registrationForm);
  console.log(this.registrationForm.get('userName')?.invalid)
}

loadData(){
  this.registrationForm.patchValue({
    userName : "Shubham",
    password : "1234",
    confirmPassword : "1234",
    address: {
      city : "Bareilly",
      state : "UP",
      postalCode : "243122",
    }
  })
}
}