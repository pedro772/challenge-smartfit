import { useEffect, useState } from "react"

import requiredMask from '/assets/images/required-mask.png'
import requiredTowel from '/assets/images/required-towel.png'
import forbiddenLockerroom from '/assets/images/forbidden-lockerroom.png'
import partialFountain from '/assets/images/partial-fountain.png'

import { Unit } from "./Unit"

const apiURL = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

interface UnitData {
  locations: {
    content: string;
    opened: boolean;
    title: string;
    schedules: {
      weekdays: string, 
      hour: string
    }[];
  }[];
}

export function Units() {
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
    // Removes units outside pattern from list
    const units = unitData.locations.filter(unit => unit.content != undefined)
    return (
      <div className="flex overflow-x-auto overflow-hidden">
        { units.map(unit => (
          <Unit
            status={unit.opened == true ? "Aberto" : "Fechado"}
            name={unit.title}
            location={unit.content}
            rules={[requiredMask, requiredTowel, partialFountain, forbiddenLockerroom]}
            schedules={unit.schedules}
          />
        )) }
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
