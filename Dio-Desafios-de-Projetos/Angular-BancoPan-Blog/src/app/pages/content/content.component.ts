import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input()
  photoCover:string="#"
  @Input()
  contentTitle:string="ssssss"
  @Input()
  contentDescription:string="ssssss"


}
