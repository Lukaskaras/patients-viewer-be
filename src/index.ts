import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
type Query {
  patient(id: ID!): Patient
  allPatients: [Patient!]
}

type Patient {
  id: ID!
  basicInfo: BasicInfo!
  medicalHistory: MedicalHistory!
  recentVitals: RecentVitals!
}

type BasicInfo {
  name: String!
  age: Int!
  gender: String!
  bloodType: String
}

type MedicalHistory {
  chronicConditions: [String!]!
  allergies: [String!]!
  currentMedications: [String!]!
}

type RecentVitals {
  bloodPressure: String!
  heartRate: Int!
  temperature: Float!
}
`;

const patient1 = {
  id: "1",
  basicInfo: {
    name: "John Doe",
    age: 30,
    gender: "Male",
    bloodType: "O+",
  },
  medicalHistory: {
    chronicConditions: ["Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Latex"],
    currentMedications: ["Metformin", "Aspirin"],
  },
  recentVitals: {
    bloodPressure: "120/80",
    heartRate: 80,
    temperature: 36.9,
  },
};

const patient2 = {
  id: "2",
  basicInfo: {
    name: "Susan Smith",
    age: 25,
    gender: "Female",
    bloodType: "A+",
  },
  medicalHistory: {
    chronicConditions: ["Hypothyroidism"],
    allergies: ["Shellfish"],
    currentMedications: ["Levothyroxine"],
  },
  recentVitals: {
    bloodPressure: "130/90",
    heartRate: 70,
    temperature: 37.2,
  },
};

const patient3 = {
  id: "3",
  basicInfo: {
    name: "Andrew Mason",
    age: 40,
    gender: "Male",
    bloodType: "AB+",
  },
  medicalHistory: {
    chronicConditions: ["Asthma", "High Cholesterol"],
    allergies: ["Peanuts", "Shellfish"],
    currentMedications: ["Metformin", "Insulin"],
  },
  recentVitals: {
    bloodPressure: "140/90",
    heartRate: 75,
    temperature: 36.6,
  },
};

const patient4 = {
  id: "4",
  basicInfo: {
    name: "Patricia Doe",
    age: 28,
    gender: "Female",
    bloodType: "B+",
  },
  medicalHistory: {
    chronicConditions: ["Hypothyroidism"],
    allergies: ["Peanuts"],
    currentMedications: ["Levothyroxine"],
  },
  recentVitals: {
    bloodPressure: "130/80",
    heartRate: 70,
    temperature: 37.1,
  },
};

const patient5 = {
  id: "5",
  basicInfo: {
    name: "Peter Parker",
    age: 30,
    gender: "Male",
    bloodType: "O+",
  },
  medicalHistory: {
    chronicConditions: ["Diabetes", "Hypertension"],
    allergies: ["Penicillin", "Latex"],
    currentMedications: ["Metformin", "Aspirin"],
  },
  recentVitals: {
    bloodPressure: "120/80",
    heartRate: 80,
    temperature: 36.9,
  },
};

const patients = [patient1, patient2, patient3, patient4, patient5];

export const resolvers = {
  Query: {
    patient: (_parent, { id }: { id: string }) =>
      patients.find((patient) => patient.id === id),
    allPatients: () => patients,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
