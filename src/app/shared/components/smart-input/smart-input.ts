import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-smart-input',
  imports: [LucideAngularModule],
  templateUrl: './smart-input.html',
  styleUrl: './smart-input.css',
})
export class SmartInput {
  @Input() register: boolean = false;
  @Input() path: string = '';

  private router = inject(Router);

  readonly Plus = Plus;


  navigate() {
    this.router.navigate([this.path]);
  }
}
