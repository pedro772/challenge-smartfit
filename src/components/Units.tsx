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
    schedules: [];
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
  return (
    <div className="flex">
      <Unit
        status={unitData.locations[0].opened == true ? "Aberto" : "Fechado"}
        name={unitData.locations[0].title}
        location={unitData.locations[0].content}
        rules={[requiredMask, requiredTowel, partialFountain, forbiddenLockerroom]}
        schedules={unitData.locations[0].schedules}
      />
      <Unit
        status={unitData.locations[0].opened == true ? "Aberto" : "Fechado"}
        name={unitData.locations[0].title}
        location={unitData.locations[0].content}
        rules={[requiredMask, requiredTowel, partialFountain, forbiddenLockerroom]}
        schedules={unitData.locations[0].schedules}
      />
      <Unit
        status={unitData.locations[0].opened == true ? "Aberto" : "Fechado"}
        name={unitData.locations[0].title}
        location={unitData.locations[0].content}
        rules={[requiredMask, requiredTowel, partialFountain, forbiddenLockerroom]}
        schedules={unitData.locations[0].schedules}
      />
    </div>
  )
  } else {
    return (
      <div></div>
    )
  }
}
