import { Component } from '@angular/core';
import { Router  } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  gotocalc() {
    this.router.navigate(['/tabs/tab2'], { queryParams: { calc: null } });
  }

}
