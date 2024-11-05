import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  total: number = 0;
  rows: Array<{ raamomtrek: number; aantalRamen: number }> = [
    { raamomtrek: 0, aantalRamen: 0 } 
  ];
  title: string = "";
  note: string = "";

  constructor(private storage: Storage) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create(); // Reinitializes the storage
  }

  addRow() {
    this.rows.push({ raamomtrek: 0, aantalRamen: 0 });
  }

  calculate(){
    console.log(this.rows);
    this.rows.forEach(calc => {

      this.total += calc.raamomtrek * calc.aantalRamen;
    });
  }

  async save() {
      // Create a single calculation object
  const calculation = {
    rows: this.rows, // List of row details
    total: this.total, // Calculation total
    title: this.title,
    note: this.note,
    createdOn: new Date().toISOString() // or format as needed
  };

  // Get the existing calculations list from storage
  const calculations = (await this.storage.get('calculations')) || [];

  // Add the new calculation to the list
  calculations.push(calculation);

  // Save the updated list back to storage
  await this.storage.set('calculations', calculations);
  }
}
