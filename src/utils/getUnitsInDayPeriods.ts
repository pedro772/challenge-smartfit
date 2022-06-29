import { getAllUnits } from "./getAllUnits";

interface UnitData {
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

export async function getUnitsInDayPeriods() {
  const allUnits = await getAllUnits();
  let morningLocationsSet = new Set();
  let afternoonLocationsSet = new Set();
  let nightLocationsSet = new Set();
  let closedLocationsSet = new Set();
  const getCharsBeforeLastHourMark = /(.*)h/;

  allUnits.locations.map((location: { schedules : {weekdays: string, hour: string}[], opened: boolean; }) => {
    location.schedules.map((schedule : {hour: string}) => {
      const openPeriod = schedule.hour;
      if((schedule.hour).includes("às") && location.opened) {
        const regexReturn = getCharsBeforeLastHourMark.exec(openPeriod)
        const stringBeforeLastHourMark = regexReturn ? regexReturn[1] : null;
        const openingTime = Number(stringBeforeLastHourMark?.substring(0, 2));
        const closingTime = Number(stringBeforeLastHourMark?.slice(-2));

        if(openingTime >= 6 && openingTime < 12) {
          morningLocationsSet.add(location);
        }

        if(closingTime > 12) {
          afternoonLocationsSet.add(location);
        }

        if(closingTime < 23) {
          nightLocationsSet.add(location);
        }
      } else if(!location.opened) {
        closedLocationsSet.add(location);
      }
    })
  })

  const closedLocations = Array.from(closedLocationsSet);
  const morningLocations = Array.from(morningLocationsSet);
  const afternoonLocations = Array.from(afternoonLocationsSet);
  const nightLocations = Array.from(nightLocationsSet);

  const morningUnits : UnitData = {...allUnits, locations: morningLocations};
  const afternoonUnits : UnitData = {...allUnits, locations: afternoonLocations};
  const nightUnits : UnitData = {...allUnits, locations: nightLocations};
  const allMorningUnits : UnitData = {...allUnits, locations: [...morningLocations, ...closedLocations]};
  const allAfternoonUnits : UnitData = {...allUnits, locations: [...afternoonLocations, ...closedLocations]};
  const allNightUnits : UnitData = {...allUnits, locations: [...nightLocations, ...closedLocations]};

  return {
    "morningUnits": morningUnits,
    "afternoonUnits": afternoonUnits,
    "nightUnits": nightUnits,
    "allMorningUnits": allMorningUnits,
    "allAfternoonUnits": allAfternoonUnits,
    "allNightUnits": allNightUnits,
  };
}