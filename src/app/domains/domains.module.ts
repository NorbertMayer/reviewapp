
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { DomainsRoutingModule } from "./domains-routing.module";

import { DomainsComponent } from "./domains.component";
import { DomainListComponent } from "./domain-list/domain-list.component";
import { DomainDetailsComponent } from "./domain-details/domain-details.component";

@NgModule({
  declarations: [
    DomainsComponent,
    DomainListComponent,
    DomainDetailsComponent
  ],
  imports: [
    CommonModule,
    DomainsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DomainsModule { }
