import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  total: number = 0
  rows: Array<{ raamomtrek: number; aantalRamen: number }> = [
    { raamomtrek: 0, aantalRamen: 0 } 
  ];

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
    const rowsWithTotal = [];

    rowsWithTotal.push({'rows':this.rows, 'total':this.total, 'createdOn':new Date().toISOString()})
    
    // Retrieve the existing list of calculations
    const existingCalculations = (await this.storage.get('calculations')) || [];
    
    // Add the new calculation to the list
    existingCalculations.push(rowsWithTotal);
    
    // Save the updated list back to storage
    await this.storage.set('calculations', existingCalculations);
    console.log(this.storage.get('calculations'));
    console.log('Calculation saved:', rowsWithTotal);
  }
}
