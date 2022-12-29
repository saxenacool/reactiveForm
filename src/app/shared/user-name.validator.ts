import { AbstractControl } from "@angular/forms";

// export function forbidderNameValidator(control: AbstractControl){
//   const forbidden = /admin/.test(control.value)
//   return forbidden ? { 'forbiddenName': {value: control.value}} : null;
// }

//userName field validation
export function forbidderNameValidator(forbiddenName: RegExp){
return (control: AbstractControl) => {
    const forbidden = forbiddenName.test(control.value)
    return forbidden ? { 'forbiddenName': {value: control.value}} : null;
  }
}

  // Email form control validator function
  export function emailValidator () {
    return (control: AbstractControl) => {
      const name = control.value;
      const regex =
        /^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
      if (name && !regex.test(name)) {
        return {
          invalid_email: 'Invalid E-mail',
        };
      }
      return null;
    };
  };

//password fields validation
export function passwordValidator(control: AbstractControl){
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(password?.pristine || confirmPassword?.pristine){ return null; }
    return password && confirmPassword && password.value!==confirmPassword.value ? { 'misMatch': true} : null;
  }
