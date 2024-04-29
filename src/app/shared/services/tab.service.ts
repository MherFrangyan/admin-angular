import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})

export class TabService {
  activeTabIndex = new BehaviorSubject(0)
}
