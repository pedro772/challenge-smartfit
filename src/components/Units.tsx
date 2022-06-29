import { Unit } from "./Unit"

import { UnitData } from "../utils/interfaceUnitData"

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

export function Units( { locations } : UnitData ) {
  return (
    <div className="flex overflow-x-auto overflow-hidden">
      { locations.map(unit => (
        <Unit
          key={unit.title}
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
