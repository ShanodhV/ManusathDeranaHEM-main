import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import patientRoutes from "./routes/patient_routes.js";
import campRoutes from "./routes/camp_routes.js";
import labreportRoutes from "./routes/labreport_routes.js";
import schoolRoutes from "./routes/school_routes.js";
import donorRoutes from "./routes/donor_routes.js";
import daruwoRoutes from "./routes/daruwo_routes.js";
import studentRoutes from "./routes/student_routes.js";
import donerVolunteerRoutes from "./routes/donorVolunteer_routes.js";
import volunteerRoutes from "./routes/volunteer_routes.js";
import volunteerEventRoutes from "./routes/volunteerEvent_routes.js";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

// data imports
import Camps from './models/Camps.js';
import Patients from "./models/Patient.js";
import LabReport from "./models/LabReport.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";

import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  labReports,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/patient", patientRoutes);
app.use("/camp", campRoutes);
app.use("/labreport", labreportRoutes);
app.use("/schools", schoolRoutes);
app.use("/donor", donorRoutes);
app.use("/derana-daruwo", daruwoRoutes);
app.use("/student", studentRoutes);
app.use("/donor-volunteer", donerVolunteerRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/volunteer-event", volunteerEventRoutes);
app.use("/dashboard", dashboardRoutes); 

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    // Patients.insertMany(dataPatient);
    //Inserting healthCamps data into MongoDB
    // LabReport.insertMany(labReports)
    //   .then(docs => {
    //     console.log('Data inserted:', docs);
    //   })
    //   .catch(err => {
    //     console.error('Insert error:', err);
    //   });
  })
  .catch((error) => console.log(`${error} did not connect`));
