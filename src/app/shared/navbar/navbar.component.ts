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
  panelOpenState: number = 0;
  public activeAccordion: null | number  = 0;
  destroyRef = inject(DestroyRef);

  constructor(private _formBuilder: FormBuilder, public tabService: TabService) {}

  ngOnInit() {
    this.tabService.activeTabIndex
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(index => this.active = index);
  }

  onTabChanged(tab: any) {
    this.tabService.activeTabIndex.next(tab.index)
  }
  test(el: any) {
    console.log(el,'');
  }

  public options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
}
