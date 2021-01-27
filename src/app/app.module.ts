import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/modal/modal.component";
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [AppComponent, HomeComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  entryComponents: [ModalComponent],
  providers: [BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule {}
