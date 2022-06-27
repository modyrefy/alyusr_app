export enum LayoutEnum {
  None = 0,
  DefaultLayout = 1,
  SeniorAdminLayout = 2,
  AdminLayout = 3,
  InspectorLayout = 4,
  GuestLayout = 5,
  OnlineLayout = 6,
}
export enum RowState {
  None = 0,
  Add = 1,
  Update = 2,
  Delete = 3,
}
export enum UserRoleEnum {
  None = 0,
  OnlineUser = 982,
  NoteIssuer = 986,
  Admin = 983,
  SeniorAdmin = 984,
  Inspector = 985,
  AlliedUser = 987,
  AlliedInformer = 988,
  Inquiry = 989,
  GeneralInquiry = 990,
  InspectorAdmin = 991,
  TrakheesiOfficeAdmin = 1100,
}
export enum InspectionSearchTypeEnum {
  None = 0,
  AutomaticBulk = 1,
  ManualBulk = 2,
  Individual = 3,
}
export enum LookupTypeEnum {
  None = 0,
}
export enum RedirectTypeEnum {
  None = 0,
  Internal = 1,
  External = 2,
  DirectExternalRedirect = 3,
}
export enum DialogStatusEnum {
  None = 0,
  Success = 1,
  Failed = 2,
}
export enum DocumentStatusEnum {
  Add = 1,
  Remove = 2,
  View = 3,
}
export enum TransactionModeEnum {
  View = 0,
  Add = 1,
  Update = 2,
  Cancel = 3,
  Close = 4,
  Rejcted = 7,
  Edit = 8,
}
export enum UploadFileTypeEnum {
  None = 0,
  request = 1,
  Measure = 2,
}
