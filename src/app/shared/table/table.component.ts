import {Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {UserService} from "../services/users.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Data} from "../interface/api-response.interface";
import * as moment from 'moment';
import {MatPaginator} from "@angular/material/paginator";

export interface PeriodicElement {
  action: string;
  select: string;
  email: string;
  phone: string;
  dataUpdate: string;
  dataCreated: string;
  status: string;
  availability: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;

  displayedColumns: string[] = ['action', 'select', 'email', 'phone', 'role', 'dataUpdate', 'dataCreated', 'status', 'availability'];
  dataSource = new MatTableDataSource<Data>([]);
  selection = new SelectionModel<Data>(true, []);
  public destroyRef = inject(DestroyRef);

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.userData
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => { this.dataSource.data = res.data;
        console.log(res,'resres');});
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    // need send API params
  }


  changeDateFormat(date: Date): string {
    return moment(date).format('DD.MM.YYYY')
  }

  formatPhoneNumber(number: any) {
    const numericNumber = String(number).replace(/\D/g, '');
    const countryCode = numericNumber.slice(0, 1);
    const restOfNumber = numericNumber.slice(1);
    const formattedNumber = restOfNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
    return `+${countryCode} ${formattedNumber}`;
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** Count the number of selected elements */
  countSelectedElements(): number {
    return this.selection.selected.length;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    // }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    return ''
  }
}
