import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settins',
  templateUrl: './account-settins.component.html',
  styles: [
  ]
})
export class AccountSettinsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  public links!: NodeListOf<Element>;
  constructor(private settingsService: SettingsService) { 
    
    
  }

  ngOnInit(): void {    
    this.links = document.querySelectorAll('.selector');    
    this.settingsService.checkCurrentTheme(this.links);    
  }

  changeTheme(theme: string): void{   
    this.settingsService.changeTheme(theme);
    this.settingsService.checkCurrentTheme(this.links);    
  }

 

}
