import { Component, Input } from '@angular/core';
import { localStorageController } from '../controllers/localStorageController';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  data : string[] = [];

  ngOnInit() {
    this.updateData()
  }

  updateData() {
    this.data = localStorageController.getItems();
  }

  removeItem(index : number) {
    localStorageController.removeItemByIndex(index);
    this.updateData()
  }

  editItem(index : number) {
    localStorageController.editItem(index, this.data[index]);
    this.updateData()
  }

  

}



