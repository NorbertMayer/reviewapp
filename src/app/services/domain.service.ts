import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DomainService {
  private url_prefix: string = environment.express_url;

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get<Domain[]>(`${this.url_prefix}/domain`);
  }

  getReviewsForDomain(name: string) {
    return this.http.get<Review[]>(`${this.url_prefix}/domain/${name}/review`);
  }
}

export interface Domain {
  _id: string;
  name: string;
  url: string;
}

export interface Review {
  _id: string;
}