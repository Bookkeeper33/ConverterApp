import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ConverterComponent } from "./converter/converter.component";
import { FormsModule } from "@angular/forms";
import { OneDecimalDirective } from "./one-decimal.directive";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ConverterComponent,
        OneDecimalDirective,
    ],
    imports: [BrowserModule, HttpClientModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
