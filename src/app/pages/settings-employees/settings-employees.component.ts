import {Component, DestroyRef, inject} from '@angular/core';
import {UserService} from "../../shared/services/users.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ApiResponse} from "../../shared/interface/api-response.interface";

@Component({
  selector: 'app-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent {
  public isFilter: boolean = true;
  public destroyRef = inject(DestroyRef);

  constructor(private userService: UserService) {
  }

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
  }

}
