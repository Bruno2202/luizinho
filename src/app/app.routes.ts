import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Home } from './features/home/home';
import { RegisterMenu } from './features/register/pages/register-menu/register-menu';
import { MainLayout } from './shared/components/main-layout/main-layout';

export const routes: Routes = [
    {
        path: "",
        component: Login
    },
    {
        path: "",
        component: MainLayout,
        children: [
            {path: "home", component: Home},
            {path: "register", loadChildren: () => import('./features/register/register.route').then(m => m.REGISTER_ROUTES)}
        ]
    },

];
