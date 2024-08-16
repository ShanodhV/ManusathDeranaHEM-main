import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "VolunteerEvents",
    "Volunteers",
    "DonorVolunteers",
    "Students",
    "DeranaDaruwoPrograms",
    "Donors",
    "Schools",
    "Patients",
    "Camps",
    "LabReports",
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
// Patients
getPatients: build.query({
  query: () => "patient/gets",
  providesTags: ["Patients"],
}),
getPatient: build.query({
  query: (id) => `patient/get/${id}`,
  providesTags: ["Patients"],
}),
addPatient: build.mutation({
  query: ({ patientId, name, NIC, phone, address, emergencyPhone, healthCamp }) => ({
    url: "patient/add",
    method: "POST",
    body: { patientId, name, NIC, phone, address, emergencyPhone, healthCamp },
  }),
  invalidatesTags: ["Patients"],
}),
deletePatient: build.mutation({
  query: (patientId) => ({
    url: `patient/delete/${patientId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Patients"],
}),
updatePatient: build.mutation({
  query: ({ id, patientId, name, NIC, phone, address, emergencyPhone, healthCamp }) => ({
    url: `patient/update/${id}`,
    method: "PUT",
    body: { patientId, name, NIC, phone, address, emergencyPhone, healthCamp },
  }),
  invalidatesTags: ["Patients"],
}),
getLastPatient: build.query({
  query: () => "patient/last",
  providesTags: ["Patients"],
}),
getPatientsByCamp: build.query({
  query: (campId) => `patient/camp/${campId}`,
  providesTags: ["Patients"],
}),

// Camps
deleteCamp: build.mutation({
  query: (campId) => ({
    url: `camp/delete/${campId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Camps"],
}),
addCamp: build.mutation({
  query: ({
    CampId,
    Province,
    District,
    Town,
    Date,
    MOH,
    ContactPersons,
    Sponsors,
  }) => ({
    url: `camp/add`,
    method: "POST",
    body: {
      CampId,
      Province,
      District,
      Town,
      Date,
      MOH,
      ContactPersons,
      Sponsors,
    },
  }),
  providesTags: ["Camps"],
}),
updateCamp: build.mutation({
  query: ({
    id,
    CampId,
    Province,
    District,
    Town,
    Date,
    MOH,
    ContactPersons,
    Sponsors,
  }) => ({
    url: `camp/update/${id}`,
    method: "PUT",
    body: {
      CampId,
      Province,
      District,
      Town,
      Date,
      MOH,
      ContactPersons,
      Sponsors,
    },
  }),
  invalidatesTags: ["Camps"],
}),
getCamps: build.query({
  query: () => `camp/gets`,
  providesTags: ["Camps"],
}),
getCamp: build.query({
  query: (id) => `camp/get/${id}`,
  providesTags: ["Camps"],
}),
getLastCamp: build.query({
  query: () => `camp/last`,
  providesTags: ["Camps"],
}),
    // New endpoints for fetching filtered camps and patients by camp
    getFilteredCamps: build.query({
      query: ({ province, district, town }) => ({
        url: "camp/filtered",
        method: "GET",
        params: { province, district, town },
      }),
      providesTags: ["Camps"],
    }),
    getPatientsByCampdv: build.query({
      query: ({ campIds, infected }) => ({
        url: "camp/patients-camp",
        method: "GET",
        params: {
          campIds,   // Ensure this is correctly passed as a string of comma-separated values
          infected,
        },
      }),
      providesTags: ["Patients"],
    }),

//lab Report
getLabReports: build.query({
  query: () => 'labreport/gets',
  providesTags: ['LabReports'],
}),
getLabReport: build.query({
  query: (id) => `labreport/get/${id}`,
  providesTags: ['LabReports'],
}),
getLabReportsByCamp: build.query({
  query: (campId) => `labreport/gets/${campId}`,
  providesTags: ['LabReports'],
}),
addLabReport: build.mutation({
  query: ({ patient, gender, kidneySerum, sugarLevel, cholesterolLevel, bloodPressure, camp }) => ({
    url: 'labreport/add',
    method: 'POST',
    body: { patient, gender, kidneySerum, sugarLevel, cholesterolLevel, bloodPressure, camp },
  }),
  invalidatesTags: ['LabReports'],
}),
deleteLabReport: build.mutation({
  query: (labReportId) => ({
    url: `labreport/delete/${labReportId}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['LabReports'],
}),
updateLabReport: build.mutation({
  query: ({ id, data }) => ({
    url: `labreport/update/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: ['LabReports'],
}),

getHighKidneySerumByDistrict: build.query({
  query: () => 'labreport/high-kidney-serum-by-district',
  providesTags: ['LabReports'],
}),
getHighKidneySerumByTown: build.query({
  query: () => 'labreport/high-kidney-serum-by-town',
  providesTags: ['LabReports'],
}),

//Lab-prediction
getNextCampLocationsByPatients: build.query({
  query: () => "labreport/next-camp-locations-by-patients",
  providesTags: ["Camps"],
}),
getNextCampLocationsByCamps: build.query({
  query: () => "labreport/next-camp-locations-by-camps",
  providesTags: ["Camps"],
}),

    // Schools
    getSchools: build.query({
      query: () => "schools",
      providesTags: ["Schools"],
    }),
    getSchool: build.query({
      query: (id) => `schools/${id}`,
      providesTags: ["Schools"],
    }),
    getLastSchool: build.query({
      query: () => "schools/last",
      providesTags: ["Schools"],
    }),
    addSchool: build.mutation({
      query: (school) => ({
        url: "schools",
        method: "POST",
        body: school,
      }),
      invalidatesTags: ["Schools"],
    }),
    deleteSchool: build.mutation({
      query: (id) => ({
        url: `schools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schools"],
    }),
    updateSchool: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `schools/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Schools"],
    }),
    getFilteredSchools: build.query({
      query: ({ province, district, town }) => ({
        url: `schools/filter`,
        method: "GET",
        params: { province, district, town },
      }),
      providesTags: ["Schools"],
    }),
    getStudentsBySchool: build.query({
      query: ({ schoolIds }) => ({
        url: `schools/students`,
        method: "GET",
        params: { schoolIds },
      }),
      providesTags: ["Schools"],
    }),
    
   // Donor-related API calls
deleteDonor: build.mutation({
  query: (id) => ({
    url: `donor/delete/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Donors'],
}),

addDonor: build.mutation({
  query: ({
    donorId, donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation,
  }) => ({
    url: 'donor/add',
    method: 'POST',
    body: {
      donorId, donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation,
    },
  }),
  invalidatesTags: ['Donors'],
}),

getDonors: build.query({
  query: () => 'donor/gets',
  providesTags: ['Donors'],
}),

getDonor: build.query({
  query: (donorId) => `donor/get/${donorId}`,
  providesTags: ['Donors'],
}),

updateDonor: build.mutation({
  query: ({ donorId, donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation, }) => ({
    url: `donor/update/${donorId}`,
    method: 'PUT',
    body: {donorId, donorNIC, donorName, donorAddress, dateOfBirth, mobileNumber, occupation},
  }),
  invalidatesTags: ['Donors'],
}),

getLastDonor: build.query({
  query: () => 'donor/last',
  providesTags: ['Donors'],
}),

    // Derana Daruwo Programs
    deleteDeranaDaruwoProgram: build.mutation({
      query: (programId) => ({
        url: `derana-daruwo/delete/${programId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeranaDaruwoPrograms"],
    }),
    addDeranaDaruwoProgram: build.mutation({
      query: ({ programId, programName,Date, province,district,town,name,mobileNumber }) => ({
        url: `derana-daruwo/add`,
        method: "POST",
        body: { programId, programName,Date, province,district,town,name,mobileNumber},
      }),
      providesTags: ["DeranaDaruwoPrograms"],
    }),
    getDeranaDaruwoPrograms: build.query({
      query: () => `derana-daruwo/gets`,
      providesTags: ["DeranaDaruwoPrograms"],
    }),
    getDeranaDaruwoProgram: build.query({
      query: (id) => `derana-daruwo/get/${id}`,
      providesTags: ["DeranaDaruwoPrograms"],
    }),
    UpdateDeranDaruwoProgram: build.mutation({
      query: ({
        programId,
        programName,
        province,
        district,
        town,
        name,
        mobileNumber,
        
      }) => ({
        url: `derana-daruwo/update/${programId}`,
        method: "PUT",
        body: {
          programName,
          province,
          district,
          town,
          name,
          mobileNumber,
         
        },
      }),
      invalidatesTags: ["DeranaDaruwoPrograms"],
    }),
    getLastProgram: build.query({
      query: () => `derana-daruwo/last`,
      providesTags: ["DeranaDaruwoPrograms"],
    }),
    
    // Students
    deleteStudent: build.mutation({
      query: (studentId) => ({
        url: `student/delete/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    addStudent: build.mutation({
      query: ({
        studentName,
        studentAddress,
        studentID,
        parentName,
        parentContactDetails,
        bankAccountDetails,
        accountNumber,
        deranaDaruwProgram,
      }) => ({
        url: `student/add`,
        method: "POST",
        body: {
          studentName,
          studentAddress,
          studentID,
          parentName, 
          parentContactDetails,
          bankAccountDetails,
          accountNumber,
          deranaDaruwProgram,
        },
      }),
      providesTags: ["Students"],
    }),
    getStudents: build.query({
      query: () => `student/gets`,
      providesTags: ["Students"],
    }),
    getStudent: build.query({
      query: (id) => `student/get/${id}`,
      providesTags: ["Students"],
    }),
    
    updateStudents: build.mutation({
      query: ({
        studentID,
        studentName,
        studentAddress,
        parentName,
        parentContactDetails,
        bankAccountDetails,
        accountNumber,
        deranaDaruwProgram,
      }) => ({
        url: `student/update/${studentID}`,
        method: "PUT",
        body: {
          
          studentName,
          studentAddress,
          parentName,
          parentContactDetails,
          bankAccountDetails,
          accountNumber,
          deranaDaruwProgram,
        },
      }),
      invalidatesTags: ["Students"],
    }),
    
    getStudentsByDeranaDaruwoProgram: build.query({
      query: (programId) => `student/program/${programId}`,
      providesTags: ["Students"],
    }),

    getLastStudent: build.query({
      query: () => `student/last`,
      providesTags: ["Students"],
    }),
    
    
    // Donor Volunteers
    deleteDonorVolunteer: build.mutation({
      query: (donorID) => ({
        url: `donor-volunteer/delete/${donorID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DonorVolunteers"],
    }),
    addDonorVolunteer: build.mutation({
      query: ({
        donorID,
        donorName,
        donorAddress,
        countryCode,
        contactNumber,
        emailAddress,
      }) => ({
        url: `donor-volunteer/add`,
        method: "POST",
        body: { 
        donorID,
        donorName,
        donorAddress,
        countryCode,
        contactNumber,
        emailAddress,
        },
      }),
      providesTags: ["DonorVolunteers"],
    }),
    getDonorVolunteers: build.query({
      query: () => `donor-volunteer/gets`,
      providesTags: ["DonorVolunteers"],
    }),
    getDonorVolunteer: build.query({
      query: (_id) => `donor-volunteer/get/${_id}`,
      providesTags: ["DonorVolunteers"],
    }),

    UpdateDonorVolunteer: build.mutation({
      query: ({
        donorID,
        donorName,
        donorAddress,
        countryCode,
        contactNumber,
        emailAddress,
        
      }) => ({
        url: `donor-volunteer/update/${donorID}`,
        method: "PUT",
        body: {
   
          donorID,
        donorName,
        donorAddress,
        countryCode,
        contactNumber,
        emailAddress,
        
        },
      }),
      invalidatesTags: ["DonorVolunteers"],
    }),
    getLastDonorVolunteer: build.query({
      query: () => `donor-volunteer/last`,
      providesTags: ["DonorVolunteers"],
    }),
    // Volunteers
    deleteVolunteer: build.mutation({
      query: (volunteerId) => ({
        url: `volunteer/delete/${volunteerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Volunteers"],
    }),
    addVolunteer: build.mutation({
      query: ({
        volunteerNIC,
        volunteerName,
        dateOfBirth,
        contactNumber,
        volunteerAddress,
        location,
        occupation,
        status,
      }) => ({
        url: `volunteer/add`,
        method: "POST",
        body: {
          volunteerNIC,
          volunteerName,
          dateOfBirth,
          contactNumber,
          volunteerAddress,
          location,
          occupation,
          status,
        },
      }),
      providesTags: ["Volunteers"],
    }),
    getVolunteers: build.query({
      query: () => `volunteer/gets`,
      providesTags: ["Volunteers"],
    }),
    getVolunteer: build.query({
      query: (id) => `volunteer/get/${id}`,
      providesTags: ["Volunteers"],
    }),

    updateVolunteer: build.mutation({
      query: ({
        id,
        volunteerNIC,
        volunteerName,
        dateOfBirth,
        contactNumber,
        volunteerAddress,
        location,
        occupation,
        status,
      }) => ({
        url: `volunteer/update/${id}`,
        method: "PUT",
        body: {
          volunteerNIC,
          volunteerName,
          dateOfBirth,
          contactNumber,
          volunteerAddress,
          location,
          occupation,
          status,
        },
      }),
      invalidatesTags: ["Volunteers"],
    }),

    // Volunteer Events
    
    deleteVolunteerEvent: build.mutation({
      query: (volunteerEventId) => ({
        url: `volunteer-event/delete/${volunteerEventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VolunteerEvents"],
    }),
    addVolunteerEvent: build.mutation({
      query: ({
        eventName,
        eventCategory,
        eventDate,
        venue,
        location,
        relatedOccupations,
        description,
      }) => ({
        url: `volunteer-event/add`,
        method: "POST",
        body: {
          eventName,
          eventCategory,
          eventDate,
          venue,
          location,
          relatedOccupations,
          description,
        },
      }),
      providesTags: ["VolunteerEvents"],
    }),
    getVolunteerEvents: build.query({
      query: () => `volunteer-event/gets`,
      providesTags: ["VolunteerEvents"],
    }),
    getVolunteerEvent: build.query({
      query: (id) => `volunteer-event/get/${id}`,
      providesTags: ["VolunteerEvents"],
    }),
    updateVolunteerEvent: build.mutation({
      query: ({ id, ...updateData }) => ({
        url: `volunteer-event/update/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['VolunteerEvents'],
    }),

    getTotalCamps: build.query({
      query: () => 'dashboard/totalCamp',
      providesTags: ['Camps'],
    }),
    getTotalPatients: build.query({
      query: () => 'dashboard/total',
      providesTags: ['Patients'],
    }),
    getPatientInfectionStatus: build.query({
      query: () => 'dashboard/infection-status',
      providesTags: ['Patients'],
    }),
    getTopCampLocations: build.query({
      query: () => 'dashboard/top-locations',
      providesTags: ['Camps'],
    }),
    getTotalVolunteers: build.query({
      query: () => 'dashboard/vol',
      providesTags: ['Volunteers'],
    }),
    getGenderDistribution: build.query({
      query: () => 'dashboard/gender',
      providesTags: ['LabReports'],
    }),

  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  useGetPatientsQuery,
  useGetPatientQuery,
  useAddPatientMutation,
  useDeletePatientMutation,
  useUpdatePatientMutation,
  useGetLastPatientQuery,
  useGetPatientsByCampQuery,


  useDeleteCampMutation,
  useGetCampQuery,
  useGetCampsQuery,
  useAddCampMutation,
  useUpdateCampMutation,
  useGetLastCampQuery,

  useLazyGetFilteredCampsQuery,
  useLazyGetPatientsByCampdvQuery,

  useGetLabReportsQuery,
  useGetLabReportQuery,
  useGetLabReportsByCampQuery,
  useAddLabReportMutation,
  useDeleteLabReportMutation,
  useUpdateLabReportMutation,
  useGetHighKidneySerumByDistrictQuery, 
  useGetHighKidneySerumByTownQuery,
  useGetNextCampLocationsByPatientsQuery,
  useGetNextCampLocationsByCampsQuery,


  useGetSchoolsQuery,
  useGetSchoolQuery,
  useGetLastSchoolQuery,
  useAddSchoolMutation,
  useDeleteSchoolMutation,
  useUpdateSchoolMutation,

  useLazyGetFilteredSchoolsQuery,
  useLazyGetStudentsBySchoolQuery,

  useDeleteDonorMutation,
  useAddDonorMutation,
  useGetDonorsQuery,
  useGetDonorQuery,
  useUpdateDonorMutation,
  useGetLastDonorQuery,

  useDeleteDeranaDaruwoProgramMutation,
  useAddDeranaDaruwoProgramMutation,
  useGetDeranaDaruwoProgramsQuery,
  useGetDeranaDaruwoProgramQuery,
  useUpdateDeranDaruwoProgramMutation,
  useGetLastProgramQuery,
  

  useDeleteStudentMutation,
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentsMutation,
  useGetLastStudentQuery,
  useGetStudentsByDeranaDaruwoProgramQuery,


  useDeleteDonorVolunteerMutation,
  useAddDonorVolunteerMutation,
  useGetDonorVolunteersQuery,
  useGetDonorVolunteerQuery,
  useUpdateDonorVolunteerMutation,
  useGetLastDonorVolunteerQuery,


  useDeleteVolunteerMutation,
  useAddVolunteerMutation,
  useGetVolunteersQuery,
  useGetVolunteerQuery,
  useUpdateVolunteerMutation,

  useDeleteVolunteerEventMutation,
  useAddVolunteerEventMutation,
  useGetVolunteerEventsQuery,
  useGetVolunteerEventQuery,
  useUpdateVolunteerEventMutation,

  useGetTotalCampsQuery,
  useGetTotalPatientsQuery,
  useGetPatientInfectionStatusQuery,
  useGetTopCampLocationsQuery,
  useGetTotalVolunteersQuery,
  useGetGenderDistributionQuery,
  
} = api;
