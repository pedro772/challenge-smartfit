import { useState } from "react"

import { Footer } from "./components/Footer"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { Labels } from "./components/Labels"
import { Units } from "./components/Units"

import { getAllUnits } from "./utils/getAllUnits"
import { getUnitsInDayPeriods } from "./utils/getUnitsInDayPeriods"
import { UnitData } from "./utils/interfaceUnitData"

function App() {
  const [unitData, setUnitData] = useState<UnitData>();
  const [selectedOption, setSelectedOption] = useState<string>();
  const [shouldShowClosedUnits, setShouldShowClosedUnits] = useState<boolean>();

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
