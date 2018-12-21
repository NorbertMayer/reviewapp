import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from "@angular/router";
import { take } from "rxjs/operators";
import { RegisterService } from "./register.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private auth: RegisterService) {}

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
  canLoad(): Promise<boolean> {
    return this.canActivate();
  }

  async canActivate(): Promise<boolean> {
    const token = await this.auth.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
