import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { CanReadGuard } from './can-read.guard';
import { CanEditGuard } from './can-edit.gaurd';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AdminGuard, CanEditGuard, CanReadGuard]
})
export class AuthModule { }
