import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router  } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  calc: any;
  total: number = 0;
  rows: Array<{ raamomtrek: number; aantalRamen: number }> = [
    { raamomtrek: 0, aantalRamen: 0 } 
  ];
  title: string = "";
  note: string = "";

  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['calc']) {
        this.calc = JSON.parse(params['calc']);
        this.total = this.calc.total;
        this.rows = this.calc.rows;
        this.note = this.calc.note;
        this.title = this.calc.title
      }
    });
  }

  addRow() {
    this.rows.push({ raamomtrek: 0, aantalRamen: 0 });
  }

  calculate(){
    this.rows.forEach(calc => {

      this.total += calc.raamomtrek * calc.aantalRamen;
    });
  }

  incrementRamen(row: any): void {
    row.aantalRamen = (row.aantalRamen || 0) + 1;
  }
  
  decrementRamen(row: any): void {
    if (row.aantalRamen > 0) {
      row.aantalRamen--;
    }
  }


  async save() {

    try{

      const calculation: Calculation = {
        rows: this.rows,
        total: this.total, 
        title: this.title,
        note: this.note,
        createdOn: new Date().toISOString() 
      };
    
      const calculations: Calculation[] = (await this.storage.get('calculations')) || [];
    
      if (this.calc) {
        const index = calculations.findIndex((c: Calculation) => c.createdOn === this.calc.createdOn);
    
        if (index !== -1) {
          calculations[index] = calculation;
        }
      } else {
        calculations.push(calculation);
      }
    
      await this.storage.set('calculations', calculations);
      this.presentSuccesToast();

      this.resetCalculation();
    }
    catch{
      this.presentErrorToast();
    }
  }

  resetCalculation(){
    this.rows = [];
    this.total = 0;
    this.title = "";
    this.note = "";
  }

  async presentSuccesToast() {
    const toast = await this.toastController.create({
      message: 'Calculation saved!',
      duration: 3000,
      position: 'top',
      color: 'success',
      icon: 'checkmark-outline'
    });

    await toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Error during save!',
      duration: 3000,
      position: 'top',
      color: 'danger',
      icon: 'alert-circle-outline'
    });

    await toast.present();
  }
  

  ionViewWillLeave() {
    this.total = 0;
    this.rows = [];
    this.title = "";
    this.note = "";
    this.calc = null;
  }

}

interface Calculation {
  rows: any[];
  total: number;
  title: string;
  note: string;
  createdOn: string;
}
