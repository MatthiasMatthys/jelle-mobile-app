import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router  } from '@angular/router';

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

  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create(); // Reinitializes the storage
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['calc']) {
        this.calc = JSON.parse(params['calc']);
        this.total = this.calc.total;
        this.rows = this.calc.rows;
        this.note = this.calc.note;
        this.title = this.calc.title
        console.log(this.calc);  // Now you can use 'calc' in your component
      }
    });
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

  incrementRamen(row: any): void {
    row.aantalRamen = (row.aantalRamen || 0) + 1;
  }
  
  decrementRamen(row: any): void {
    if (row.aantalRamen > 0) {
      row.aantalRamen--;
    }
  }


  async save() {
    // Create a single calculation object
    const calculation: Calculation = {
      rows: this.rows, // List of row details
      total: this.total, // Calculation total
      title: this.title,
      note: this.note,
      createdOn: new Date().toISOString() // or format as needed
    };
  
    // Get the existing calculations list from storage
    const calculations: Calculation[] = (await this.storage.get('calculations')) || [];
  
    if (this.calc) {
      // If `this.calc` is defined, update the existing record
      const index = calculations.findIndex((c: Calculation) => c.createdOn === this.calc.createdOn);
  
      if (index !== -1) {
        // Update the existing calculation
        calculations[index] = calculation;
        console.log('Calculation updated');
      }
    } else {
      // If `this.calc` is not defined, it's a new calculation, so we add it to the list
      calculations.push(calculation);
      console.log('New calculation added');
    }
  
    // Save the updated list back to storage
    await this.storage.set('calculations', calculations);
  }
  

  ionViewWillLeave() {
    this.total = 0;
    this.rows = [];
    console.log('Tab2 will leave, resetting calc');
    this.calc = null;
  }

}

interface Calculation {
  rows: any[]; // Adjust the type based on what 'rows' represents
  total: number;
  title: string;
  note: string;
  createdOn: string; // ISO string format or Date object
}
