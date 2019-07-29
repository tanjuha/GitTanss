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
       this.users = data.map(item => ({email: item.email}));
      console.log('data users - ' + this.users);
    });

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'username',
      textField: 'email',
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
