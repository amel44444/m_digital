// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';
// // import { ApiService } from './api.service';
// // import { User } from '../models/user.model';
// //
// // @Injectable({ providedIn: 'root' })
// // export class UserService {
// //   constructor(private api: ApiService) {}
// //
// //   getAll(): Observable<User[]> { return this.api.get<User[]>('users'); }
// //   getById(id: number): Observable<User> { return this.api.get<User>(`users/${id}`); }
// //   update(id: number, dto: Partial<User>): Observable<User> {
// //     return this.api.put<User>(`users/${id}`, dto);
// //   }
// //   delete(id: number): Observable<void> { return this.api.delete<void>(`users/${id}`); }
// // }
//
// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
//
// export const authGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   if (auth.isLoggedIn()) return true;
//   router.navigate(['/login']);
//   return false;
// };


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getAll(): Observable<User[]> { return this.api.get<User[]>('users'); }
  getById(id: number): Observable<User> { return this.api.get<User>(`users/${id}`); }
  update(id: number, dto: Partial<User>): Observable<User> {
    return this.api.put<User>(`users/${id}`, dto);
  }
  delete(id: number): Observable<void> { return this.api.delete<void>(`users/${id}`); }
}
