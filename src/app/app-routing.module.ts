import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
// import { AuthGuard } from "./services/auth.guard";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "domains", loadChildren: "./domains/domains.module#DomainsModule" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  //{ path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
