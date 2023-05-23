import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
ngOnInit(): void {}
  
@Input()
visible=true;
@Input()
notfoundMessage="Not Found !";
@Input ()
resetLinkText ="Reset"
@Input()
resetLinkRoute="/"

}
