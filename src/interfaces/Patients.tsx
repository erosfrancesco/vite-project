import { IPatient } from "./Database";

export interface IListItemProps {
  item: IPatient;
  onRemove: (id: IPatient["_id"]) => void;
  onUpdate: (item: Partial<IPatient>) => void;
}
