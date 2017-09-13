/* tslint:disable */  
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {

  @Input('routerLink') linkParams: string;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
  
}

@Directive({
  selector: 'router-outlet'
})
export class RouterOutletStubComponent {}
