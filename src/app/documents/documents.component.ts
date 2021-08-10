import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../services/auth.service';
import { GraphService } from '../services/graph.service';
import { User } from '../user';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  public files: any [] = [];
  
  constructor( private graph: GraphService) {
    this.graph.getDocuments().then((data: any) => {

          
      for(let f of data?.d?.Files?.results) {
        let url = `https://loqsea.sharepoint.com/:w:/r/_layouts/15/WopiFrame.aspx?sourcedoc=%7B${f.UniqueId.toUpperCase()}%7D&file=${encodeURI(f.Name)}&action=embedviewt&mobileredirect=true`;
        let linkIframe = `https://loqsea.sharepoint.com/_layouts/15/Doc.aspx?sourcedoc={${f.UniqueId.toUpperCase()}}&amp;action=embedview`
        let fil = {
          name: f.Name,
          link: url,
          linkIframe: linkIframe,
          source: f.UniqueId
        }

        this.files.push(fil);
      }
    });
   }

  ngOnInit() { }

}