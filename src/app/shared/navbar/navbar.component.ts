import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private _formBuilder: FormBuilder) {}

  public options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
}
