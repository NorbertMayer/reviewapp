import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { Domain, DomainService } from './domain.service';

@Injectable({
    providedIn: 'root'
})
export class DomainsResolver implements Resolve<Observable<Domain[]>> {
    constructor(private domainService: DomainService) { }

    resolve() {
        return this.domainService.getList();
    }
}