import { BrowserRouter, Routes, Route } from "react-router-dom";
import Database from "./context/Database";
import ModalProvider from "./context/Modal";
import { ListPatients } from "./components/Patients";
import PatientDetail from "./components/PatientDetail";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Database>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<ListPatients />} />
              <Route path="/patients/:patientId" element={<PatientDetail />} />
            </Routes>
          </ModalProvider>
        </Database>
      </main>
    </BrowserRouter>
  );
}

export default App;
