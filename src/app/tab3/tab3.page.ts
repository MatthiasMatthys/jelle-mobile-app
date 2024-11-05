import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  calculations: any[] = [];

  constructor(private storage: Storage, private zone: NgZone) {
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

}
