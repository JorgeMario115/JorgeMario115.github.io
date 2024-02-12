import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { dataSimulator } from '../../data/dataSimulator'


@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  private id:string | null="0"

  @Input()
  photoCover:string=""
  @Input()
  contentTitle:string=""
  @Input()
  contentDescription:string="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, non. Maiores adipisci similique veniam temporibus, culpa vero nesciunt sed ullam odit quisquam et eum non facere sequi. Aspernatur, explicabo quaerat. "
  
  constructor(
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value =>
      this.id = value.get("id")
            // console.log(value.get("id"))
      )
      this.setValuesToComponent(this.id)
    }
    setValuesToComponent(id:string | null){
      const result = dataSimulator.filter(article => article.id == id)
      [0] 

      this.contentTitle = result.title
      this.contentDescription = result.description
      this.photoCover = result.photoCover
    }
}
