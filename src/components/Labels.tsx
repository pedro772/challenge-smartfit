import requiredMask from '/assets/images/required-mask.png'
import recommendedMask from '/assets/images/recommended-mask.png'
import requiredTowel from '/assets/images/required-towel.png'
import recommendedTowel from '/assets/images/recommended-towel.png'
import requiredLockerRoom from '/assets/images/required-lockerroom.png'
import partialLockerrom from '/assets/images/partial-lockerroom.png'
import forbiddenLockerroom from '/assets/images/forbidden-lockerroom.png'
import forbiddenFountain from '/assets/images/forbidden-fountain.png'
import partialFountain from '/assets/images/partial-fountain.png'

import { Label } from "./Label"

export function Labels() {
  return (
    <div className="bg-gray-100 mt-14 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-evenly">
      <Label title="Máscara" icons={[[requiredMask, "Obrigatório"], [recommendedMask, "Recomendado"]]} />
      <Label title="Toalha" icons={[[requiredTowel, "Obrigatório"], [recommendedTowel, "Recomendado"]]} />
      <Label title="Bebedouro" icons={[[partialFountain, "Parcial"], [forbiddenFountain, "Proibido"]]} />
      <Label title="Vestiários" icons={[[requiredLockerRoom, "Liberado"], [partialLockerrom, "Parcial"], [forbiddenLockerroom, "Proibido"]]} />
    </div>
  )
}
