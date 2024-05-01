import {Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {TabService} from "../services/tab.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent {
  @ViewChild('sidenav', { static: true })
  public sidenav!: MatSidenav;
  public active: number = 0;
  panelOpenState: number = 0;
  destroyRef = inject(DestroyRef);

  constructor(public tabService: TabService) {}

  ngOnInit() {
    this.tabService.toggleLeftBar
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(index => {
        index ? this.sidenav.toggle() : '';
      });
  }

  onTabChanged(tab: any) {
    this.tabService.activeTabIndex.next(tab.index)
  }
}
