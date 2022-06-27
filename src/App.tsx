import { useEffect, useState } from "react"
import { Footer } from "./components/Footer"
import { Form } from "./components/Form"
import { Header } from "./components/Header"
import { Labels } from "./components/Labels"

const apiURL = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"

function App() {
  const [unitData, setUnitData] = useState({});

  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = async () => {
    const res = await fetch(apiURL);
    const jsonData = await res.json();
    setUnitData(jsonData);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-20 mb-20">
        <Form />
        <Labels />
      </main>

      <Footer />
    </div>
  )
}

export default App
