import parse from 'html-react-parser';

interface UnitProps {
  status: string;
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
    <div className="flex flex-col bg-gray-100 mt-4 mr-4 p-4 drop-shadow-lg rounded max-w-[19.5rem]">
      <div className='max-w-[13.5rem]'>
        <label className="font-gothamBlack text-green-600 text-sm">{props.status}</label>
        <h2 className="mt-2 font-gothamBlack text-gray-700 text-lg">{props.name}</h2>
        <div className="mt-2 font-gothamLight text-gray-500 text-sm">
          {parse(props.location)}
        </div>
      </div>
      <div className="flex mt-6 items-center justify-between">
        {props.rules.map(rule => (
          <img
            src={rule}
            className="object-contain h-12" />
        ))}
      </div>
      <div className="grid grid-cols-2">
        {props.schedules.map(schedule => (
          <div className="mt-4 flex flex-col">
            <h3 className="font-gothamBlack text-gray-700">{schedule.weekdays}</h3>
            <p className="font-gothamLight text-gray-700 text-sm">{schedule.hour}</p>
          </div>
        ))}
      </div>
    </div>
  )
}