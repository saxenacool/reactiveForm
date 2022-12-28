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

export function passwordValidator(control: AbstractControl){
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(password?.pristine || confirmPassword?.pristine){ return null; }
    return password && confirmPassword && password.value!==confirmPassword.value ? { 'misMatch': true} : null;
  }
