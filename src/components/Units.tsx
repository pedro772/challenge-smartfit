import { useEffect, useState } from "react"

import { Unit } from "./Unit"

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

const permissions: any = {
  mask: {
    "required": '/assets/images/required-mask.png',
    "recommended": '/assets/images/recommended-mask.png'
  },
  towel: {
    "required": '/assets/images/required-towel.png',
    "recommended": '/assets/images/recommended-towel.png'
  },
  fountain: {
    "partial": '/assets/images/partial-fountain.png',
    "not_allowed": '/assets/images/forbidden-fountain.png'
  },
  locker_room: {
    "allowed": '/assets/images/required-lockerroom.png',
    "partial": '/assets/images/partial-lockerroom.png',
    "closed": '/assets/images/forbidden-lockerroom.png'
  }
}

export function Units( props : UnitData ) {
  // Removes units outside pattern from list
  const units = props.locations.filter(unit => unit.content != undefined)
  return (
    <div className="flex overflow-x-auto overflow-hidden">
      { units.map(unit => (
        <Unit
          status={unit.opened == true ? "Aberto" : "Fechado"}
          name={unit.title}
          location={unit.content}
          rules={[
            permissions.mask[unit.mask],
            permissions.towel[unit.towel],
            permissions.fountain[unit.fountain],
            permissions.locker_room[unit.locker_room]
          ]}
          schedules={unit.schedules}
        />
      )) }
    </div>
  )
}
