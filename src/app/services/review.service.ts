import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  private url_prefix: string = environment.express_url;

  constructor(private http: HttpClient) {}
}
