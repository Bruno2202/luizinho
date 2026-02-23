import { Component } from '@angular/core';
import { ArrowRightLeft, BookText, CarFront, ChevronRight, CopyPlus, LogOut, LucideAngularModule, Settings } from 'lucide-angular';
import { RouterLink } from "@angular/router";

@Component({
	selector: 'app-sidebar',
	imports: [LucideAngularModule, RouterLink],
	templateUrl: './sidebar.html',
})
export class Sidebar {
	readonly ArrowRightLeft = ArrowRightLeft;
	readonly CarFront = CarFront;
	readonly CopyPlus = CopyPlus;
	readonly BookText = BookText;
	readonly Settings = Settings;
	readonly ChevronRight = ChevronRight; 
	readonly LogOut = LogOut;

	menuItems = [
		{ label: 'Entradas e Saídas', path: '/fluxo', icon: ArrowRightLeft },
		{ label: 'Gerenciador de Veículos', path: '/veiculos', icon: CarFront },
		{ label: 'Cadastros', path: '/register', icon: CopyPlus },
		{ label: 'Luizinho Report', path: '/relatorios', icon: BookText },
		{ label: 'Configurações', path: '/config', icon: Settings },
	];
}
