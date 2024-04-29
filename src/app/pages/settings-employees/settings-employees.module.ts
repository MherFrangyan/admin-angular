import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsEmployeesComponent} from "./settings-employees.component";
import {SettingsEmployeesRoutingModule} from "./settings-employees-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [SettingsEmployeesComponent],
  imports: [CommonModule, SettingsEmployeesRoutingModule, SharedModule],
})
export class SettingsEmployeesModule {}
