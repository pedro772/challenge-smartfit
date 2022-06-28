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
    setUnitData(jsonData);
  }

  if(unitData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
    
        <main className="flex-1 mx-20 mb-20">
          <Form />
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
          <Form />
          <Labels />
        </main>
    
        <Footer />
      </div>
    )
  }
  
}

export default App
