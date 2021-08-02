import { Component,DoCheck,ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,DoCheck {

  constructor(private el:ElementRef) { }
  public color;

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.getLocalColor();
  }

  getLocalColor(){
    this.color = JSON.parse(localStorage.getItem("color"));
    (this.el.nativeElement as HTMLElement).style.setProperty('--primary1', this.color.primario);
    (this.el.nativeElement as HTMLElement).style.setProperty('--second', this.color.secundario);
  }

}
