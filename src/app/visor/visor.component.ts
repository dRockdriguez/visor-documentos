import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GraphService } from '../services/graph.service';
import { User } from '../user';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorCommponent implements OnInit {
  public url = '';
  public name = '';
  constructor(private route:ActivatedRoute) {
    this.url = `https://loquesea.sharepoint.com/:w:/r/_layouts/15/Doc.aspx?sourcedoc=%7B${route.snapshot.paramMap.get('source') || '' }%7D&amp=&action=embedview`
    this.name = route.snapshot.paramMap.get('name') || '';
   }

  ngOnInit() { }

}