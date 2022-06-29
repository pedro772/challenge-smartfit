import { FormEvent } from "react";
import { Radio } from "./Radio"
import IconHour from "/assets/images/icon-hour.png"

interface FormProps {
  findAll: Function;
  clearAll: Function;
  selectedOption?: string;
  shouldShowClosedUnits?: boolean;
  setSelectedOption: Function;
  setShouldShowClosedUnits: Function;
  locations?: {
    opened: boolean;
    schedules: {
      weekdays: string, 
      hour: string
    }[];
  }[];
}

export function Form( props : FormProps ) {
  const handleCheckChange = () => {
    props.setShouldShowClosedUnits((prevState: boolean) => !prevState)
  }

  const radioOptions = [
    {
      dayPeriod: "Manhã",
      horario: "06:00 às 12:00"
    },
    {
      dayPeriod: "Tarde",
      horario: "12:01 às 18:00"
    },
    {
      dayPeriod: "Noite",
      horario: "18:01 às 23:00"
    },
  ];

  function handleFind(e : FormEvent) {
    e.preventDefault();
    props.findAll()
  }

  function handleClear(e : FormEvent) {
    props.clearAll();
  }

  return (
    <form onSubmit={handleFind} className="mt-20 border-2 border-b-4 rounded border-gray-300">
      <div className="flex flex-col m-4">
        <div className="flex items-center">
          <img 
            src={IconHour} 
            className="object-contain h-8" />
          <label className="ml-4 font-gothamBook text-gray-500">
            Horário
          </label>
        </div>
        
        <fieldset>
          <div className="p-4 border-b border-gray-300">
            <legend className="mt-6 ml-2 text-lg font-gothamBook text-gray-500">Qual período quer treinar?</legend>
          </div>

          <div>
            {radioOptions.map(option => (
              <Radio
                key={option.dayPeriod}
                optionName={option.dayPeriod} 
                timePeriod={option.horario}
                selectedOption={props.selectedOption}
                setSelectedOption={props.setSelectedOption} />
            ))}
          </div>

          <div className="flex justify-between mt-10">
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="exibir"
                name="exibir"
                value="exibir"
                checked={props.shouldShowClosedUnits}
                onChange={handleCheckChange}
              />
              <label htmlFor="exibir" className="ml-2 hover:cursor-pointer">
                <span className="font-gothamBook text-gray-800">Exibir unidades fechadas</span>
              </label>
            </div>

            <span className="flex font-gothamBook text-gray-800 items-center">
              Resultados Encontrados: 
              <span className="font-gothamBlack text-gray-800 text-2xl ml-1">
                {props.locations ? props.locations.length : "0"}
              </span>
            </span>
          </div>
          
          <div className="flex items-center justify-center">
            <input 
              type="submit" 
              value="ENCONTRAR UNIDADE"
              className="font-gothamBlack py-4 px-16 rounded bg-yellow-500 mx-5 hover:opacity-90 cursor-pointer transition-opacity" />

            <input 
              type="reset"
              value="LIMPAR"
              onClick={handleClear}
              className="font-gothamBlack py-4 px-16 rounded bg-white border-2 border-gray-300 mx-5 cursor-pointer hover:bg-gray-300 hover:border-gray-500 transition-colors" />
          </div>
        </fieldset>
      </div>
    </form>
  )
}
