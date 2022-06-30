export interface DialogModel {
  isVisible: boolean;
  date?: Date;
  title?: string;
  key?: string;
}
export interface ActionButtons {
  text: string;
  onClick: any;
  variant?: string | null;
}
