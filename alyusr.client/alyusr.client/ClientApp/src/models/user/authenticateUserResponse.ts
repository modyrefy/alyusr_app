import { ValidationError } from "../validation/error";

export interface AuthenticateUserResponse {
  Result?: UserResponse | null;
  userToken?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  redirectUrl?: string;
  Errors?: ValidationError[];
}

export interface UserResponse {
  UserID: number;
  Lang: number;
  UserName: string;
  Password: any;
  IsAdmin: boolean;
  Name_En: string;
  Name: string;
  ClientId: number;
  Status_Id: number;
  WaterMarkImage: string;
  ServiceUrl: any;
  UserSetting: UserSetting;
  PosUserSetting: PosUserSetting;
  Email: string;
  Token: string;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: any[];
  rowState: number;
}
export interface UserSetting {
  Lang: number;
  AllowSaleLessThanCost: boolean;
  User_ID: number;
  PeriodAllowToEdit: number;
  RigesterBillOnPayment: boolean;
  AlowRepeateFactoItemUnit: boolean;
  AddItemInNewLineInBill: boolean;
  PreventStoreOutOfItemLessZero: boolean;
  ShowCustomerOfUserOnly: boolean;
  AllowItemPriceSaleLessThanCost: boolean;
  RequestDueDateOnDelayPayment: boolean;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: any[];
  rowState: number;
}
export interface PosUserSetting {
  User_ID: number;
  Station_ID: number;
  Store_ID: number;
  CalcType_ID: number;
  PaymentType_ID: number;
  Emp_ID: number;
  Customer_ID: number;
  Supplier_ID: number;
  Currency_ID: number;
  AloowReturn: boolean;
  AllowDiscount: boolean;
  AllowEditPrice: boolean;
  AllowReturnWithoutBill: boolean;
  EnableModifyReservedInvoice: boolean;
  UseKichenPrinter: boolean;
  EnableAddMoney: boolean;
  EnableCloseDay: boolean;
  DefaultInvoiceType: number;
  AllowDeleteItems: boolean;
  AllowClickNew: boolean;
  DefaultRatioDiscount: number;
  NumbeOfCopyPrintKichen: number;
  DefaultServiceInvoiceType: number;
  DefaultServiceRatio: number;
  DefaultServiceValue: number;
  DirectPrint: boolean;
  EnablePrintSavedTransaction: boolean;
  DirectPrintAfterReserve: boolean;
  PrintItemDependonPrinterOfCategory: boolean;
  EnablePrintSaleReportAndPrintCloseDay: boolean;
  PrintReservedBillInKitchenOnly: boolean;
  PrinterName: string;
  KichenPrinter: string;
  NumberOfCopy: number;
  PrintEveryRelatedItemOnSeprateBill: boolean;
  EnableCancelReservedBill: boolean;
  DefaultServiceLocalMoneyAdd: number;
  DefaultServiceDeliveryMoneyAdd: number;
  DefaultServiceOutMoneyAdd: number;
  ID: number;
  CreatedBy: number;
  ModifiedBy: number;
  Errors: any[];
  rowState: number;
}
