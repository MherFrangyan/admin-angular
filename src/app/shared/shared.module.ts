import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatSidenavModule,
    FormsModule,
    ReactiveFormsModule, MatTabsModule, CdkAccordionModule, MatExpansionModule,],
  exports: [
    NavbarComponent,
  ]
})
export class SharedModule {
}
