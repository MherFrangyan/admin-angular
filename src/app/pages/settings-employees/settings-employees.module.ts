import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsEmployeesComponent} from "./settings-employees.component";
import {SettingsEmployeesRoutingModule} from "./settings-employees-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [SettingsEmployeesComponent],
  imports: [CommonModule, SettingsEmployeesRoutingModule, SharedModule, MatIconModule, MatButtonModule],
})
export class SettingsEmployeesModule {}
