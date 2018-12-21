import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { RegisterService } from "../services/register.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private newUserService: RegisterService,
    private lF: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.lF.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLoginSubmit() {
    const user = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value
    };

    this.newUserService.loginUser(user).subscribe(data => {
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 2000);
    });
  }

  ngOnInit() {}
}
