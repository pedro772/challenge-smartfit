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

  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = async () => {
    const res = await fetch(apiURL);
    const jsonData = await res.json();
    
    // Removes units outside pattern from list
    const filteredLocations = jsonData.locations.filter((location: { content: any }) => location.content != undefined)
    const correctedData = {...jsonData, locations: filteredLocations}

    setUnitData(correctedData);
  }

  function clearAll() {
    setUnitData(undefined);
  }

  if(unitData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
    
        <main className="flex-1 mx-20 mb-20">
          <Form findAll={getUnits} clearAll={clearAll} locations={unitData.locations} />
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
          <Form findAll={getUnits} clearAll={clearAll} />
          <Labels />
          <h4 className="font-gothamBlack text-lg flex justify-center mt-6">Nenhuma unidade encontrada</h4>
        </main>
    
        <Footer />
      </div>
    )
  }
  
}

export default App
