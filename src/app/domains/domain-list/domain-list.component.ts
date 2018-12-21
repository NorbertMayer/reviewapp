import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Domain } from 'src/app/services/domain.service';

@Component({
  selector: "domain-list",
  templateUrl: "./domain-list.component.html"
})
export class DomainListComponent {
  domains = new BehaviorSubject<Domain[]>([]);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const { domains } = this.route.snapshot.data;
    console.log(domains);
    if (Array.isArray(domains)) {
      this.domains.next(domains);
    }
  }
}
