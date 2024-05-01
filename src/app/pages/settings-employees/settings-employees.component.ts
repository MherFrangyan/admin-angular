import {Component, DestroyRef, inject } from '@angular/core';
import {UserService} from "../../shared/services/users.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ApiResponse, IFormData} from "../../shared/interface/api-response.interface";
import {TabService} from "../../shared/services/tab.service";

@Component({
  selector: 'app-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent {
  public blockAndUnblock = '';
  public addNewRow!: boolean;
  public filterData!: IFormData
  public cancelFilterType!: string
  public isFilter: boolean = true;
  public newRowData: IFormData = {
    login: "",
    phone: "",
    createDate: "",
    email: "",
    role: "",
    updateData: "",
    status: ""
  };
  public destroyRef = inject(DestroyRef);
  public activeTabIndex!: number;
  constructor(private userService: UserService, public tabService: TabService) {}

  ngOnInit() {
    this.userService.getUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: ApiResponse) => {
        const { users, data } = res;
        data.forEach(dataItem => {
          const user = users.find(userItem => userItem.id === dataItem.user_id);
          if (user) {
            Object.assign(dataItem, user);
          }
        });
        this.userService.userData.next(res);
      });

    this.tabService.activeTabIndex.subscribe(indexTab => {
      this.activeTabIndex = indexTab
    })
  }

  blockAndUser(type: string) {
    this.blockAndUnblock = type
  }

  applyFilterData(formData: IFormData) {
    this.filterData = formData
  }

  cancelFilter(type: string) {
    this.cancelFilterType = type;
  }

  addRow() {
    this.addNewRow = !this.addNewRow
  }

  formValueData(data: IFormData) {
    this.newRowData = data;
  }
}
