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
import {LeftBarComponent} from './left-bar/left-bar.component';
import {FilterComponent} from './filter/filter.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {TableComponent} from './table/table.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    NavbarComponent,
    LeftBarComponent,
    FilterComponent,
    TableComponent,
  ],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaskDirective,
    MatTableModule,
    NgxMaskPipe,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule, MatPaginatorModule,
  ],
  exports: [
    NavbarComponent,
    LeftBarComponent,
    FilterComponent,
    TableComponent,
  ],
  providers: [
    provideNgxMask()
  ],
})
export class SharedModule {
}
