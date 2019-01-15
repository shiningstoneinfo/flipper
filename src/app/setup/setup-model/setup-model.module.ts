import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { TaxRateModelComponent } from './tax-rate-model/tax-rate-model.component';
import { SetUpModelComponent } from './setup-model.component';
import { ReasonModelComponent } from './reason-model/reason-model.component';
import { CustomerTypeModelComponent } from './customertype-model/customertype-model.component';


@NgModule({
  declarations:
  [TaxRateModelComponent,
    SetUpModelComponent,
    ReasonModelComponent,
    CustomerTypeModelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    TaxRateModelComponent,
    SetUpModelComponent,
    ReasonModelComponent,
    CustomerTypeModelComponent
  ]
})
export class SetUpModelModule {

 }
