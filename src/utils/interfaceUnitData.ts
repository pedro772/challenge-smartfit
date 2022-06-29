export interface UnitData {
  locations: {
    title: string;
    content: string;
    opened: boolean;
    mask: string;
    towel: string;
    fountain: string;
    locker_room: string;
    schedules: {
      weekdays: string, 
      hour: string
    }[];
  }[];
}