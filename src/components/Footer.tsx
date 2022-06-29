import { Logo } from "./Logo"

export function Footer() {
  return (
    <footer className="bg-gray-800 allign-bottom">
      <div className="py-10 flex flex-col items-center">
        <Logo />
        <label className="font-gothamBook text-white mt-4 text-sm">Todos os direitos reservados - 2020</label>
      </div>
    </footer>
  )
}
