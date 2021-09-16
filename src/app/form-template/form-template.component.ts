import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {
  public template1: FormGroup;
  public template2: FormGroup;
  public template1Errors: boolean = false
  public template2Errors: boolean = false

  constructor(private fb: FormBuilder, private graph: GraphService) {
    this.createTemplate1Form();
    this.createTemplate2Form();

    this.graph.getTemplates().then((data: any) => {
      debugger;
    });
  }

  private createTemplate1Form() {
    this.template1 = this.fb.group({
      destinatario: ['', Validators.required],
      expediente: ['', Validators.required],
      solicitud: ['', Validators.required],
      tecnico: ['', Validators.required]
    });
  }
  private createTemplate2Form() {
    this.template2 = this.fb.group({
      destinatario: ['', Validators.required],
      expediente: ['', Validators.required],
      solicitud: ['', Validators.required],
      tecnico: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  submitForm1() {
    if(this.template1.valid) {
      this.template1Errors = false;
    } else {
      this.template1Errors = true;
    }
  }
  submitForm2() {
    if(this.template2.valid) {
      this.template2Errors = false; 
    } else {
      this.template2Errors = true;
    }
  }
}
