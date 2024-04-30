import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  form: FormGroup = new FormGroup({
    login: new FormControl(''),
    phone: new FormControl(''),
    createDate: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    role: new FormControl(''),
    updateData: new FormControl(''),
    status: new FormControl(''),
  })
  onClick(event: any, control: string) {
    this.form.controls[control].setValue('')
    console.log(this.form.controls[control],'controlcontrolcontrol');
    event.stopPropagation();
  }

  apply() {

  }

  cancel() {

  }

  clear() {
    this.form.reset();
  }
}
