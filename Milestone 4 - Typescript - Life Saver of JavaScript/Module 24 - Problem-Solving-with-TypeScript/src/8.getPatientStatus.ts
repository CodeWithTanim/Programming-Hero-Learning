interface GeneralPatient {
    name: string
    age: number
    type: 'general'
}

interface EmergencyPatient {
    name: string
    age: number
    type: 'emergency'
    emergencyLevel: 1 | 2 | 3
}



const getPatientStatus = (patient: GeneralPatient | EmergencyPatient):string => {
    if (patient.type === 'general') {
        return 'General Patient'
    } else if (patient.type === "emergency") {
        if (patient.emergencyLevel === 1) {
            return 'Critical Emergency'
        } else if (patient.emergencyLevel === 2) {
            return 'Serious Emergency'
        }
    }
    
    return 'Moderate Emergency'
}


console.log(getPatientStatus({ name: "Rahim", age: 35, type: "general" }));
console.log(getPatientStatus({ name: "Karim", age: 60, type: "emergency", emergencyLevel: 1 }));
console.log(getPatientStatus({ name: "Hasan", age: 45, type: "emergency", emergencyLevel: 3 }));
console.log(getPatientStatus({ name: "Karim", age: 60, type: "emergency", emergencyLevel: 2 }));