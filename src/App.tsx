import { Footer } from "./components/Footer"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { Labels } from "./components/Labels"
import { Units } from "./components/Units"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
  
      <main className="flex-1 mx-20 mb-20">
        <Form />
        <Labels />
        <Units />
      </main>
  
      <Footer />
    </div>
  )
}

export default App
