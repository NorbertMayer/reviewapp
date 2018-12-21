import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  private url_prefix: string = environment.express_url;

  constructor(private http: HttpClient) {}

  loginUser(user) {
    return this.http.post<any>(`${this.url_prefix}/login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    const tokenStr = localStorage.getItem("token");
    try {
      const token = JSON.parse(tokenStr);
      return token;
    } catch {}
    return null;
  }

  logoutUser() {
    localStorage.removeItem("token");
  }

  // create new user
  create(user) {
    return this.http.post<any>(`${this.url_prefix}/register`, user);
  }
}

export interface NewUser extends NewUserParams {
  _id: string;
}

export interface NewUserParams {
  name: string;
  email: string;
  password: string;
}
