import { Component,  Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-big-card',
  standalone: true,
  imports: [RouterOutlet,RouterLink ],
  templateUrl: './big-card.component.html',
  styleUrl: './big-card.component.css'
})
export class BigCardComponent {

  @Input()
  photoCover:string = ""
  @Input()
  cardTitle:string= ""
  @Input()
  cardDescription:string=""
  @Input()
  Id:string="0"


}
