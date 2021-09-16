import { Injectable } from '@angular/core';
import { Alert } from '../alert';
import { AlertsService } from './alerts.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class DocumentsService {

    constructor(
        private authService: AuthService,
        private alertsService: AlertsService
    ) {
    }

    getDocuments() {
        var miUrl = "https://loquesea.sharepoint.com/_api/web/GetFolderByServerRelativeUrl('Documentos%20compartidos')?$select=Author/Title,ModifiedBy/Title&$expand=Author/Title,ModifiedBy/Title,Folders,Files";
    }
}