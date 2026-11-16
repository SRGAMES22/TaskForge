import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/:id', component: BoardDetailComponent },
  { path: '**', redirectTo: 'login' }
];
