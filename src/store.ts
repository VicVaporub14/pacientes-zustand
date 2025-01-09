import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "./types";

type PatientState = {
    patients: Patient[],
    activeId: Patient['id'],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient['id']) => void,
    getPatientById: (id: Patient['id']) => void,
    updatePatient: (data : DraftPatient) => void
}

const createPatient = (patient : DraftPatient) => {
    return { ...patient, id: uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
    persist((set) => ({
        patients: [],
        activeId: '',
        addPatient: (data) => {
            const newPatient = createPatient(data)
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },
        deletePatient: (id) => {
            set( (state) => ({
                patients: state.patients.filter( patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        },
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map( patient =>  // Se itera sobre los pacientes
                    patient.id === state.activeId ? {     // Si encuentra al paciente por el Id
                        id: state.activeId, ...data        // Le asigna su Id a la data que se recibe
                    } : patient),                           // Si no, se retorna el paciente
                activeId: ''
            }))
        }
    }), {
        name:'patient-storage'
        // storage: createJSONStorage(() => sessionStorage)
    })
))