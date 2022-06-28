import { Radio } from "./Radio"
import IconHour from "/assets/images/icon-hour.png"

export function Form() {
  const radioOptions = [
    {
      periodo: "Manhã",
      horario: "06:00 às 12:00"
    },
    {
      periodo: "Tarde",
      horario: "12:01 às 18:00"
    },
    {
      periodo: "Noite",
      horario: "18:01 às 23:00"
    },
  ];

  return (
    <form className="mt-20 border-2 border-b-4 rounded border-gray-300">
      <div className="flex flex-col m-4">
        <div className="flex items-center">
          <img 
            src={IconHour} 
            className="object-contain h-8" />
          <label className="ml-4 font-gothamLight text-gray-500">
            Horário
          </label>
        </div>
        
        <fieldset>
          <div className="p-4 border-b border-gray-300">
            <legend className="mt-6 ml-2 text-lg font-gothamLight text-gray-500">Qual período quer treinar?</legend>
          </div>

          <div>
            {radioOptions.map(option => (
              <Radio optionName={option.periodo} timePeriod={option.horario} />
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="exibir"
                name="exibir"
              />
              <label htmlFor="exibir" className="ml-2 hover:cursor-pointer">
                <span className="font-gothamBold text-gray-800">Exibir unidades fechadas</span>
              </label>
            </div>

            <span className="flex font-gothamBold text-gray-800 items-center">
              Resultados Encontrados: 
              <span className="font-gothamBlack text-gray-800 text-2xl ml-1">
                0
              </span>
            </span>
          </div>
          
          <div className="flex items-center justify-center">
            <button type="submit" className="py-4 px-16 rounded bg-yellow-500 mx-5">
              <span className="font-gothamBlack">ENCONTRAR UNIDADE</span>
            </button>

            <button type="submit" className="py-4 px-16 rounded bg-white border-2 border-gray-300 mx-5">
              <span className="font-gothamBlack">LIMPAR</span>
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  )
}
