import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsEmployeesComponent} from "./settings-employees.component";

const routes: Routes = [{ path: '', component: SettingsEmployeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsEmployeesRoutingModule {}
