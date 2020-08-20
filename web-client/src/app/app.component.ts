import { Component } from '@angular/core';
import {findIconDefinition, library} from '@fortawesome/fontawesome-svg-core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-client';
   // glasses = findIconDefinition({ prefix: 'fas', iconName: 'glasses' })

}
