import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../interface/api-response.interface";

@Injectable({providedIn: 'root'})

export class UserService {
  public userData: BehaviorSubject<ApiResponse> = new BehaviorSubject<ApiResponse>({
    page: { total: 0, current: 0, size: 0 },
    users: [],
    data: []
  })

  constructor(private http: HttpClient) {
  }

  public getUser(): Observable<ApiResponse>  {
    return this.http.get<ApiResponse>('https://cars.cprogroup.ru/api/rubetek/angular-testcase-list/');
  }



}
