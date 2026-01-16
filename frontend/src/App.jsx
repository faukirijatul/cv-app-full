import { Routes, Route } from 'react-router-dom'
import Home from '../compnents/Home'
import ExperienceForm from '../compnents/ExperienceForm'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<ExperienceForm />} />
      <Route path="/form/:id" element={<ExperienceForm />} />
    </Routes>
  )
}

export default App
