/* import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './pagination-app.component';
import { PaginationComponent } from './_components/pagination.component';

import { fakeBackendProvider } from './_helpers/fake-backend';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        PaginationComponent
    ],
    providers: [
        // provider for fake backend api
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
