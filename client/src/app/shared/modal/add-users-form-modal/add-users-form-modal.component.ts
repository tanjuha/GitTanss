import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-add-users-form-modal',
  templateUrl: './add-users-form-modal.component.html',
  styleUrls: ['./add-users-form-modal.component.css']
})
export class AddUsersFormModalComponent implements OnInit {

  users: any;

  constructor(public activeModal: NgbActiveModal, public user: UserService) { }

  @Input() name_project;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  ngOnInit() {

    this.user.getUsers().subscribe((data: any) => {
      this.users = JSON.stringify(data);
      console.log('data users - ' + this.users);
    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log('this users - ' + this.users.username);
  }
  onSelectAll(items: any) {
    console.log(items);
    console.log('this users - ' + this.users.username);
  }

  info() {
    console.log( this.dropdownList);
  }
}
