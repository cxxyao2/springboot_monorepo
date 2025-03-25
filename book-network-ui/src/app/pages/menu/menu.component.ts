import {Component, OnInit} from '@angular/core';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements  OnInit{
  ngOnInit(){
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if(window.location.href.endsWith(link.getAttribute('href') || '')){
        link.classList.add('active');
      }

      link.addEventListener('click', (event) => {
        linkColor.forEach(link => {
          link.classList.remove('active');
        })
        link.classList.add('active');
      });
    })
  }


  logout() {

  }
}
