export class Order{
    public Id: number;
    public CustomerName: string;
    public CustomerPhone: string;
    public CustomerEmail: string;
    public TotalMoney: number;
    public Note: string;
    public StatusText: string;
    public CreateUserName: string;
    public CreateDate: string;
    public UpdateUserName: string;
    public UpdateDate: string;
}

export class OrderCondition {
    CustomerName: string;
    CustomerPhone: string;
    CustomerEmail: string;
    StatusOrderId: string;
    Status: string;
  
    constructor() {
      this.CustomerName = '';
      this.CustomerPhone = '';
      this.CustomerEmail = '';
      this.StatusOrderId = '1';
      this.Status = '0';
    }
  }