import { Navbar } from "./Navbar"

export function Header() {
  return (
    <header>
      <Navbar />

      <div className="mt-20 mx-5 md:mx-10 lg:mx-20">
        <div>
          <h1 className="font-gothamBlack text-3xl text-gray-800">
            REABERTURA<br />SMART FIT
          </h1>

          <div className="bg-gray-800 w-[6.25rem] h-2.5 mt-7" />

          <p className="font-gothamBook text-lg mt-10 text-gray-800">
            O horário de funcionamento das nossas unidades está seguindo os decretos de cada município. Por isso, 
            confira aqui se a sua unidade está aberta e as medidas de segurança que estamos seguindo
          </p>
        </div>
      </div>
    </header>
  )
}
