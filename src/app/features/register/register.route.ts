import { Routes } from '@angular/router';
import { RegisterMenu } from './pages/register-menu/register-menu';
import { VehicleRegister } from './pages/vehicle-register/vehicle-register';
import { BrandRegister } from './pages/brand-register/brand-register';
import { ModelRegister } from './pages/model-register/model-register';

export const REGISTER_ROUTES: Routes  = [
    {
        path: "",
        component: RegisterMenu
    },
    {
        path: "vehicle",
        component: VehicleRegister
    },
    {
        path: "brand",
        component: BrandRegister
    },
    {
        path: "model",
        component: ModelRegister
    }
];
