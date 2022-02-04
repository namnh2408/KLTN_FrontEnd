export class PetDetail{
    Id: number;
    PetName: string;
    SupplierName: string;
    ColorTitle: string;
    SizeTitle: string;
    AgeTitle: string;
    SexTitle: string;
    StatusDetailTitle: string;
    Price: number;
    Discount: number;
    Quantity: number;
    StatusText: string;
    CreateUserName: string;
    CreateDate: string;
    UpdateUserName: string;
    UpdateDate: string;
}

export class PetDetailCondition {
    BreedId: string;
    SupplierId: string;
    ColorId: string;
    SizeId: string;
    AgeId: string;
    SexId: string;
    StatusDetailId: string;
    Status: string;
  
    constructor() {
      this.BreedId = '0';
      this.SupplierId = '0';
      this.ColorId = '0';
      this.SizeId = '0';
      this.AgeId = '0';
      this.SexId = '0';
      this.StatusDetailId = '0';
      this.Status = '0';
    }
  }

export class AgeSelection{
  Id: number;
  Title: string;
}

export class ColorSelection{
  Id: number;
  Title: string;
}

export class SizeSelection{
  Id: number;
  Title: string;
}

export class SexSelection{
  Id: number;
  Title: string;
}

export class BreedSelection{
  Id: number;
  Name: string;
}

export class SupplierSelection{
  Id: number;
  Name: string;
}

export class StatusDetailSelection{
  Id: number;
  Title: string;
}

export class ImageModel{
  Id:Number;
  Url: string;
}