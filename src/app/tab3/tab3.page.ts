import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  calculations: any[] = [];

  constructor(private storage: Storage, private zone: NgZone, private router: Router) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create(); // Reinitializes the storage
  }

  async ionViewWillEnter() {
    const calculations = (await this.storage.get('calculations')) || [];

    this.zone.run(() => {
      this.calculations = calculations;
      console.log(this.calculations)
    });
  }

  editCalc(calc: any) {
    this.router.navigate(['/tabs/tab2'], { queryParams: { calc: JSON.stringify(calc) } });
  }
  

}
