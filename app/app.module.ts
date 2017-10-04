import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {LACModule} from "./loaded-and-compiled/lac.module";

@NgModule({
    imports: [BrowserModule, LACModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
