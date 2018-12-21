import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DomainsResolver } from '../services/domains.resolver';
import { DomainsComponent } from "./domains.component";
import { DomainListComponent } from "./domain-list/domain-list.component";
import { DomainDetailsComponent } from "./domain-details/domain-details.component";


const routes: Routes = [
  {
    path: "",
    component: DomainsComponent,
    children: [
      {
        path: '', pathMatch: 'full', component: DomainListComponent, resolve: {
          domains: DomainsResolver
        }
      },
      { path: ':name', component: DomainDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainsRoutingModule { }
