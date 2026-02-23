import { Component } from '@angular/core';
import { SearchBar } from "../../../../shared/components/search-bar/search-bar";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmartInput } from "../../../../shared/components/smart-input/smart-input";
import { LucideAngularModule, Plus, Save } from "lucide-angular";

@Component({
  selector: 'app-vehicle-register',
  imports: [SearchBar, ReactiveFormsModule, SmartInput, LucideAngularModule],
  templateUrl: './vehicle-register.html',
})
export class VehicleRegister {
  readonly Plus = Plus
  readonly Save = Save

  vehicleForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    plate: new FormControl('', [Validators.required]),
    renavam: new FormControl(''),
    chassis: new FormControl(''),
    manufactureYear: new FormControl(null, [Validators.min(1886), Validators.max(new Date().getFullYear() + 1)]),
    modelYear: new FormControl(null, [Validators.min(1886), Validators.max(new Date().getFullYear() + 1)]),
    mileage: new FormControl(null, [Validators.min(0)]),
    salePrice: new FormControl(null, [Validators.min(0)]),
    observation: new FormControl(''),
    sold: new FormControl(false),
    categoryId: new FormControl(null),
    transmissionId: new FormControl(null),
    fuelId: new FormControl(null),
    colorId: new FormControl(null),
    modelId: new FormControl(null),
    brandId: new FormControl(null),
    typeId: new FormControl(null)
  })

  onSubmit() { 
    console.log(this.vehicleForm.get)
  }

  deleteVehicle() {

  }
}
