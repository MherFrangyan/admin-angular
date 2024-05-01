import {Component, DestroyRef, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {TabService} from "../services/tab.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public active: number = 0;
  public destroyRef = inject(DestroyRef);

  constructor(private _formBuilder: FormBuilder, public tabService: TabService) {}

  ngOnInit() {
    this.tabService.activeTabIndex
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(index => this.active = index);
  }

  openLeftBar() {
    this.tabService.toggleLeftBar.next(true)
  }
}
