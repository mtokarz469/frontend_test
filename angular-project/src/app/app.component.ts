import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as data from './data.json';
import { ModalComponent } from './modal/modal.component';
import { localStorageController } from './controllers/localStorageController';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  name : string = "Maciej Tokarz"
  visible : boolean = false;
  block_text : any[] = [];
  visibleModal : boolean = false;
  

  ngOnInit() {
    // console.log(data.text_fields);
    this.populateStorage();
  }
  toggleModal() {
    this.visibleModal = !this.visibleModal;
    this.populateStorage();
  }

  populateStorage() {
    if(localStorage.length < 1 || localStorageController.getItems().length < 1) {
      for(let x of data.text_fields) {
        localStorageController.pushItem(x);
        console.log(x);
      }
    }
  }

  toggleDisplayName() {
    this.visible = !this.visible;
  }

  form = new FormGroup({
    selected : new FormControl('0')
  })

  reset() {
    this.visible = false;
    this.block_text = [];
    this.visibleModal = false;
  }

  replace() {
    let current_val = this.form.controls['selected'].value || 0;
    this.block_text = [];
    this.block_text = [isNaN(Number(current_val)) ? this.chooseRandom() : {value: localStorageController.getItems()[Number(current_val)], index: current_val}]
  }

  chooseRandom() : {value : string, index : number} {
    
    let left_out = this.checkAvailability().add(0).add(1);
    let _tab = localStorageController.getItems().filter((_, index) => !left_out.has(index));
    let randomNum : number = Math.floor(Math.random() * _tab.length);
    if(_tab.length < 1) {
      alert("Nie można dodać więcej losowych paragrafów.");
    }
    return {value: _tab[randomNum], index: localStorageController.getItems().indexOf(_tab[randomNum])};
  }
  
  stick() {
    let current_val = this.form.controls['selected'].value || 0;
    
    if(this.checkAvailability().has(Number(current_val))) return alert("Nie można dodać paragrafu, który już się znajduje na stronie.")
    this.block_text.push(isNaN(Number(current_val)) ? this.chooseRandom() : {value: localStorageController.getItems()[Number(current_val)], index: current_val})

    this.block_text.sort((item, item2) => item.index - item2.index)
    console.log(this.block_text);
    

  }

  checkAvailability() : Set<number> {
    let current : number[] = [];
    if (this.block_text.length > 0) {
      current = this.block_text.map((item) : number => localStorageController.getItems().indexOf(item.value));
    }
    let left_out = new Set<number>([...current]);
    return left_out;
  }
}
