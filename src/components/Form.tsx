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
          <label className="ml-2 sm:ml-4 font-gothamBook text-gray-500">
            Horário
          </label>
        </div>
        
        <fieldset>
          <div className="p-4 border-b border-gray-300">
            <legend className="mt-2 sm:mt-6 ml-2 text-lg font-gothamBook text-gray-500">Qual período quer treinar?</legend>
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

          <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-10">
            <div className="flex my-2 md:my-0 items-center">
              <input 
                type="checkbox"
                id="exibir"
                name="exibir"
                value="exibir"
                checked={props.shouldShowClosedUnits}
                onChange={handleCheckChange}
              />
              <label htmlFor="exibir" className="ml-2 hover:cursor-pointer">
                <span className="font-gothamBook text-gray-800 text-sm sm:text-base">Exibir unidades fechadas</span>
              </label>
            </div>

            <span className="flex font-gothamBook text-gray-800 items-center text-sm sm:text-base">
              Resultados Encontrados: 
              <span className="font-gothamBlack text-gray-800 text-lg sm:text-2xl ml-1">
                {props.locations ? props.locations.length : "0"}
              </span>
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center">
            <button
              type="submit"
              className="self-stretch md:self-auto font-gothamBlack py-4 mt-4 md:px-16 rounded bg-yellow-500 md:mx-5 hover:opacity-90 cursor-pointer transition-opacity"
            >
              ENCONTRAR UNIDADE
            </button>

            <input 
              type="reset"
              value="LIMPAR"
              onClick={handleClear}
              className="self-stretch md:self-auto font-gothamBlack py-4 mt-4 md:px-16 rounded bg-white border-2 border-gray-300 md:mx-5 cursor-pointer hover:bg-gray-100 transition-colors" />
          </div>
        </fieldset>
      </div>
    </form>
  )
}
