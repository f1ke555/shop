import {BehaviorSubject} from "rxjs";

class ApiService {
    allDevice$ = new BehaviorSubject([])
    allCategory$ = new BehaviorSubject([])
    favoriteDevice$ = new BehaviorSubject([])
    basketDevice$ = new BehaviorSubject([])
    compareDevice$ = new BehaviorSubject([])
    deviceId$ = new BehaviorSubject('')
    inputSearch$ = new BehaviorSubject('')
    changeCategory$ = new BehaviorSubject('')
    categoryDevice$ = new BehaviorSubject([])
    changeBrand$ = new BehaviorSubject('')
    brandDevice$ = new BehaviorSubject([])
    linkChange$ = new BehaviorSubject(false)
}

export const apiService = new ApiService();