import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Data, IFormData, User} from "../interface/api-response.interface";
import * as moment from "moment/moment";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output()
  public applyFilter: EventEmitter<IFormData> = new EventEmitter<IFormData>()
  @Output()
  public cancelFilter: EventEmitter<string> = new EventEmitter<string>()
  @Output()
  public formValueData: EventEmitter<IFormData> = new EventEmitter<IFormData>()
  @Input()
  addTableData!: boolean;

  form: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    createDate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    role: new FormControl('', Validators.required),
    updateData: new FormControl(''),
    status: new FormControl('', Validators.required),
  })
  onClick(event: any, control: string) {
    this.form.controls[control].setValue('')
    event.stopPropagation();
  }

  apply() {
    this.applyFilter.emit(this.form.value)
  }

  cancel() {
    this.cancelFilter.emit('cancel')
  }

  clear() {
    this.cancelFilter.emit('cancel')
    this.form.reset();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('addTableData' in changes) {
      const newValue = changes['addTableData'].currentValue;
      if (newValue && this.form.valid) {
        this.formValueData.emit(this.form.value);
      }
    }
  }
}
