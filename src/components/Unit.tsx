import parse from 'html-react-parser';

interface UnitProps {
  status: "Aberto" | "Fechado";
  name: string;
  location: string;
  rules: string[];
  schedules: {
    weekdays: string;
    hour: string;
  }[];
}

export function Unit( props: UnitProps ) {
  return (
    <div className="flex flex-col bg-gray-100 my-4 mr-4 md:mr-8 p-4 drop-shadow-lg rounded min-w-[13.5rem] max-w-[19.5rem]">
      <div className='max-w-[13.5rem]'>
        {
          props.status === "Aberto" ? 
            <label className="font-gothamBold text-green-600 text-sm">{props.status}</label>
            :
            <label className="font-gothamBold text-red-700 text-sm">{props.status}</label>
        }
        <h2 className="mt-2 font-gothamBlack text-gray-700 text-lg">{props.name}</h2>
        <div className="mt-2 font-gothamBook text-gray-500 text-sm">
          {parse(props.location)}
        </div>
      </div>
      { props.status === "Aberto" ?
        <div>
          <div className="bg-gray-200 w-full h-[1px] mt-4" />

          <div className="flex mt-4 items-center justify-evenly md:justify-between">
            {props.rules.map(rule => (
              <img
                src={rule}
                className="object-contain h-12" />
            ))}
          </div>
          <div className="grid grid-cols-2">
            {props.schedules.map(schedule => (
              <div className="mt-4 flex flex-col">
                <h3 className="font-gothamBlack text-gray-700 text-sm sm:text-base">{schedule.weekdays}</h3>
                <p className="font-gothamBook text-gray-700 text-xs sm:text-sm">{schedule.hour}</p>
              </div>
            ))}
          </div>
        </div>
        :
        <div></div>
      }
    </div>
  )
}
