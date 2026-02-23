import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Building2, Car, CarFront, ChevronRight, LucideAngularModule, PaintBucket, ShieldHalf, SwatchBook, Users, Van } from 'lucide-angular';

@Component({
  selector: 'app-register-menu',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './register-menu.html',
})
export class RegisterMenu {

  readonly ChevronRight = ChevronRight;

  menuItens = [
    { label: "Cadastro de Clientes", path: "costumer", icon: Users },
    { label: "Cadastro de Veículos", path: "vehicle", icon: Car },
    { label: "Cadastro de Modelos", path: "models", icon: CarFront },
    { label: "Cadastro de Cidades", path: "city", icon: Building2 },
    { label: "Cadastro de Marcas", path: "brand", icon: ShieldHalf },
    { label: "Cadastro de Categorias", path: "category", icon: SwatchBook },
    { label: "Cadastro de Cores", path: "color", icon: PaintBucket },
    { label: "Cadastro de Tipos de Carro", path: "type", icon: Van },
  ]
}
