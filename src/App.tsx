import { Footer } from "./components/Footer"
import { Form } from "./components/Form"
import { Header } from "./components/Header"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-20">
        <Form />
      </main>

      <Footer />
    </div>
  )
}

export default App
