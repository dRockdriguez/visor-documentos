import { Injectable } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';

import { AlertsService } from './alerts.service';
import { OAuthSettings } from '../oauth';
import { User } from '../user';
import { Client } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public authenticated: boolean = false;
  public user?: User;

  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService) {
/*
    this.authenticated = this.msalService.instance
      .getAllAccounts().length > 0;
    this.getUser().then((user) => { this.user = user });*/
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    const result = await this.msalService
      .loginPopup(OAuthSettings)
      .toPromise()
      .catch((reason) => {
        this.alertsService.addError('Login failed',
          JSON.stringify(reason, null, 2));
      });
    if (result) {
      this.msalService.instance.setActiveAccount(result.account);
      this.authenticated = true;
      this.user = await this.getUser();
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    await this.msalService.logout().toPromise();
    this.user = undefined;
    this.authenticated = false;
  }

  async getToken() {
    var requestObj = {
      scopes: ["https://loquesea.sharepoint.com/.default"]
    };
    const result = await this.msalService.acquireTokenSilent(requestObj).toPromise()
      .catch((err) => { console.log("error ") });
    if (result) {
      // Temporary to display token in an error box
      return result.accessToken;
    }
    return '';
  }
  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService
      .acquireTokenSilent({
        scopes: OAuthSettings.scopes
      })
      .toPromise()
      .catch((reason) => {
        this.alertsService.addError('Get token failed', JSON.stringify(reason, null, 2));
      });
    if (result) {
      // Temporary to display token in an error box
      return result.accessToken;
    }

    // Couldn't get a token
    this.authenticated = false;
    return '';
  }

  private async getUser(): Promise<User | undefined> {
    if (!this.authenticated) return undefined;
    const graphClient = Client.init({
      authProvider: async (done) => {
        const token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });
        if (token) {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
    // Get the user from Graph (GET /me)
    const graphUser: MicrosoftGraph.User = await graphClient
      .api('/me')
      .select('displayName')
      .get();

    const user = new User();
    user.displayName = graphUser.displayName ?? '';
  
    user.avatar = '/assets/no-profile-photo.png';

    return user;
  }
}