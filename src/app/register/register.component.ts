import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RegisterService } from "../services/register.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  registerForm: FormGroup;

  constructor(
    private rF: FormBuilder,
    private newUserService: RegisterService,
    private route: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.rF.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  addNewUser() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    if (this.registerForm.valid) {
      this.newUserService.create(user).subscribe(data => {
        localStorage.setItem("token", data.token);
      });
      this.registerForm.reset();
      setTimeout(() => {
        this.route.navigate(["/"]);
      }, 2000);
    }
  }

  ngOnInit() {}
}
