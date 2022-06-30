import { ChangeEvent } from "react";

interface RadioProps {
  optionName: string;
  timePeriod: string;
  selectedOption?: string;
  setSelectedOption: Function;
}

export function Radio( props: RadioProps ) {
  const handleOptionChange = (e : ChangeEvent<HTMLInputElement>) => {
    props.setSelectedOption(e.target.value)
  }

  return (
    <div className="flex mt-2 sm:mt-4 justify-between p-2 sm:p-4 border-b border-gray-300">
      <div>
        <label htmlFor={props.optionName} className="hover:cursor-pointer">
          <input
            type="radio" 
            id={props.optionName}
            name="dayPeriod"
            value={props.optionName}
            checked={props.selectedOption === props.optionName}
            onChange={handleOptionChange}
            className="mr-2" />
        
          <span className="font-gothamBook text-sm sm:text-base text-gray-500">
            { props.optionName }
          </span>
        </label>
      </div>
      <label htmlFor={props.optionName} className="hover:cursor-pointer">
        <span className="font-gothamBook text-sm sm:text-base text-gray-500">
          { props.timePeriod }
        </span>
      </label>
    </div>
  )
}
