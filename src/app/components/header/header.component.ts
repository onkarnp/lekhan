import { Component, EventEmitter, Output } from '@angular/core';
import { Emitters } from 'src/app/shared/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  userDetails:any|boolean = false;
  sidebarOpen:boolean = true;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter;
  constructor(){}
  ngOnInit(): void {}
  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    this.sidebarOpen = !this.sidebarOpen;
  }

}
