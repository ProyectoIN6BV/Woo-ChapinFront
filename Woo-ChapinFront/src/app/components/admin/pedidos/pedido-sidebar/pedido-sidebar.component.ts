import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pedido-sidebar',
  templateUrl: './pedido-sidebar.component.html', animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  styleUrls: ['./pedido-sidebar.component.css']
})
export class PedidoSidebarComponent implements OnInit {
  public showName = false;

  constructor() { }

  ngOnInit(): void {
  }
  changeVariable(){
    if(this.showName == false){
      this.showName = true;
    }else{
      this.showName = false;
    }
  }
}
