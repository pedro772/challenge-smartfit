import { useEffect, useState } from "react"

import { Footer } from "./components/Footer"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { Labels } from "./components/Labels"
import { Units } from "./components/Units"

const apiURL = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

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

function App() {
  const [unitData, setUnitData] = useState<UnitData>();
  const [selectedOption, setSelectedOption] = useState<string>();
  const [shouldShowClosedUnits, setShouldShowClosedUnits] = useState<boolean>();

  const getAllUnits = async () => {
    const res = await fetch(apiURL);
    const jsonData = await res.json();
    
    // Removes units outside pattern from list
    const filteredLocations = jsonData.locations.filter((location: { opened: boolean }) => location.opened != undefined)

    const correctedData = {...jsonData, locations: filteredLocations}
    return correctedData;
  }

  const getUnitsInDayPeriods = async () => {
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

  const clearAll = () => {
    setUnitData(undefined);
    setSelectedOption(undefined);
    setShouldShowClosedUnits(undefined);
  }

  const findAll = async () => {
    if(selectedOption) {
      switch (selectedOption) {
        case "Manhã":
          if(shouldShowClosedUnits) {
            setUnitData((await getUnitsInDayPeriods()).allMorningUnits);
          } else {
            setUnitData((await getUnitsInDayPeriods()).morningUnits);
          }
          break;
        case "Tarde":
          if(shouldShowClosedUnits) {
            setUnitData((await getUnitsInDayPeriods()).allAfternoonUnits);
          } else {
            setUnitData((await getUnitsInDayPeriods()).afternoonUnits);
          }
          break;
        case "Noite": 
          if(shouldShowClosedUnits) {
            setUnitData((await getUnitsInDayPeriods()).allNightUnits);
          } else {
            setUnitData((await getUnitsInDayPeriods()).nightUnits);
          }
          break;
      }
    } else {
      if(shouldShowClosedUnits) {
        setUnitData(await getAllUnits());
      } else {
        const units = (await getAllUnits());
        const locationsOpened = units.locations.filter((location: { opened: boolean }) => location.opened)
        const unitsOpened = {...units, locations: locationsOpened}
        setUnitData(unitsOpened);
      }
    }
  }

  if(unitData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
    
        <main className="flex-1 mx-20 mb-20">
          <Form 
            findAll={findAll} 
            clearAll={clearAll} 
            locations={unitData.locations} 
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            shouldShowClosedUnits={shouldShowClosedUnits}
            setShouldShowClosedUnits={setShouldShowClosedUnits}  />
          <Labels />
          <Units 
            locations={unitData.locations}
          />
        </main>
    
        <Footer />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
    
        <main className="flex-1 mx-20 mb-20">
          <Form 
            findAll={findAll} 
            clearAll={clearAll}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            shouldShowClosedUnits={shouldShowClosedUnits}
            setShouldShowClosedUnits={setShouldShowClosedUnits}  />
          <Labels />
          <h4 className="font-gothamBlack text-lg flex justify-center mt-6">Nenhuma unidade encontrada</h4>
        </main>
    
        <Footer />
      </div>
    )
  }
  
}

export default App
