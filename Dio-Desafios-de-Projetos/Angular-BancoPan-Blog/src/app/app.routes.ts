import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    
    {
        path:'',
        component:HomeComponent,
    },
    {
        path:'content/:id',
        component:ContentComponent,
    },
];

@NgModule({
    imports:[],
    exports:[]
})

export class AppRoutinModule {
    
}