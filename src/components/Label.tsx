interface LabelProps {
  title: string;
  icons: string[][];
}

export function Label( props: LabelProps ) {
  return (
    <div className="flex flex-col m-4 items-center">
      <div className="font-gothamBlack text-black">
        <h3>{props.title}</h3>
      </div>
      <div className="flex mt-2">
        {props.icons.map((icon) => (
          <div className="flex flex-col items-center justify-center mx-1">
            <img
              src={icon[0]}
              className="object-contain h-12"
            />
            <p className="font-gothamLight text-xs text-black">{icon[1]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
