import { BrowserRouter, Routes, Route } from "react-router-dom";
import Database from "./context/Database";
import ModalProvider from "./context/Modal";
import { ListPatients } from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";

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
