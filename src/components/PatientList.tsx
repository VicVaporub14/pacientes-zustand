import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

export default function PatientList() {

  const patients = usePatientStore(state => state.patients)

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        <>
          <h2 className="text-center font-black text-2xl">Listado de Pacientes</h2>
          <p className="text-lg mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {patients.map( patient => (
            <PatientDetails 
              key={patient.id}
              patient={patient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="text-center font-black text-2xl">No hay Pacientes</h2>
          <p className="text-lg mt-5 mb-10 text-center"> 
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}
    </div>
  )
}
