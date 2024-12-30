import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { GestureController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  calculations: any[] = [];

  constructor(private storage: Storage, private zone: NgZone, private router: Router, private gestureCtrl: GestureController, private alertCtrl: AlertController) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
  }

  async ionViewWillEnter() {
    const calculations = (await this.storage.get('calculations')) || [];

    this.zone.run(() => {
      this.calculations = calculations;
      console.log(this.calculations)
    });
  }

  editCalc(calc: any, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/tabs/tab2'], { queryParams: { calc: JSON.stringify(calc) } });
  }

  async presentDeleteOption(calc: any, index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Calculation',
      message: `Are you sure you want to delete "${calc.title}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => this.deleteCalc(index),
        },
      ],
    });
    await alert.present();
  }

  deleteCalc(index: number) {
    this.calculations.splice(index, 1); // Remove the item from the list
    this.storage.set('calculations', this.calculations);
  }
  

}
