import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRatesComponent } from './tax-rates/tax-rates.component';
import { AuthGuard } from '../common/guards/auth-guard.service';
import { SetupComponent } from './setup.component';
import { ReasonComponent } from './reasons/reason.component';
import { CustomerTypeComponent } from './customerType/customertype.component';
import { ExpirationSettingComponent } from './expiration_setting/expiration_setting.component';

const setupRoutes: Routes = [
    {
        path: '',
        component: SetupComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'customertype',
                pathMatch: 'full',
            },
            { path: 'customertype', component: CustomerTypeComponent },
            { path: 'tax-rate', component: TaxRatesComponent },
            { path: 'reasons/:reason', component: ReasonComponent},
            { path: 'expiration_setting', component: ExpirationSettingComponent},


        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(setupRoutes)],
    exports: [RouterModule]
})
export class SetupRoutingModule {
}