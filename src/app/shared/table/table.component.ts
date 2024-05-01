import {Component, DestroyRef, inject, Input, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {UserService} from "../services/users.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Data, User, IFormData} from "../interface/api-response.interface";
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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  blockAndUnblock = '';
  @Input()
  newRowData!: IFormData;
  @Input()
  filterData!: IFormData;
  @Input()
  cancelFilterType!: string;
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
      .subscribe(res => {
        const localStorageData = localStorage.getItem('selectedUserList')
        if (localStorageData) {
          const selectedUserList = JSON.parse(localStorageData)
          this.dataSource.data = selectedUserList;
        } else {
          this.dataSource.data = res.data;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('blockAndUnblock' in changes) {
      const newValue = changes['blockAndUnblock'].currentValue;
      switch (newValue) {
        case 'block':
          this.selection.selected.forEach(item => {
            if (item.status === 'BLOCK') return;
            item.status = 'BLOCK'
          })
          break;
        case 'unblock':
          this.selection.selected.forEach(item => {
            if (item.status === 'ACTIVE') return;
            item.status = 'ACTIVE'
          })
          break;
      }
    } else if ('newRowData' in changes) {
      const newValue = changes['newRowData'].currentValue;
      if (newValue) {
        this.addItemToDataSource(newValue)
      }
    } else if ('filterData' in changes) {
      const filterValue = changes['filterData'].currentValue;
      if (filterValue) {
        this.dataSource.data = this.dataSource.data.filter((row: Data | User) => {
          return (
            (!filterValue.login || ("name" in row && row.name.includes(filterValue.login))) &&
            (!filterValue.phone || ("phone" in row && row.phone === filterValue.phone)) &&
            (!filterValue.createDate || ("create_at" in row && row.create_at === moment(filterValue.createDate).unix())) &&
            (!filterValue.email || ("email" in row && row.email.includes(filterValue.email))) &&
            (!filterValue.updateData || ("update_at" in row && row.update_at === moment(filterValue.updateData).unix())) &&
            (!filterValue.status || ("status" in row && row.status === filterValue.status))
          );
        });
      }
    } else if ('cancelFilterType' in changes) {
      const typeValue = changes['cancelFilterType'].currentValue;
      if (typeValue) {
        this.dataSource.data = this.userService.userData.value.data
      }
    }
  }

  addItemToDataSource(value:IFormData): void {
    const newItem = {
      user_id: Math.floor(Math.random() * 1000),
      is_admin: value.role === "admin",
      is_ecp: false,
      status: value.status || 'ACTIVE',
      id: Math.floor(Math.random() * 1000),
      name: value.login || 'John Smite',
      email: value.email || 'example@example.com',
      phone: value.phone || 0,
      create_at: moment(value.createDate).unix() || Math.floor(Date.now() / 1000),
      update_at: ''
    };
    const tableData = [...this.dataSource.data, newItem]

    this.dataSource.data = tableData;
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
    if (!this.selection.selected.length) {
      return 0
    }
    localStorage.setItem('selectedUserList', JSON.stringify(this.dataSource.data));
    return this.selection.selected.length;
  }
}
