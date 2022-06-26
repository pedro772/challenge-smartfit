interface RadioProps {
  optionName: string;
  timePeriod: string;
}

export function Radio( props: RadioProps ) {
  return (
    <div className="flex mt-4 justify-between p-4 border-b border-gray-300">
      <div>
        <input
          type="radio" 
          id={props.optionName}
          name={props.optionName}
          className="hover:cursor-pointer" />
        <label htmlFor={props.optionName} className="ml-2 hover:cursor-pointer">
          <span className="font-gothamLight text-gray-500">
            { props.optionName }
          </span>
        </label>
      </div>
      <label htmlFor={props.optionName} className="hover:cursor-pointer">
        <span className="font-gothamLight text-gray-500">
          { props.timePeriod }
        </span>
      </label>
    </div>
  )
}
