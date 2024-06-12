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
    deletePatient: build.mutation({
      query: (patientId) => ({
        url: `patient/delete/${patientId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patients"],
    }),
    addPatient: build.mutation({
      query: ({ name, NIC, phone, address, city }) => ({
        url: `patient/add`,
        method: "POST",
        body: { name, NIC, phone, address, city },
      }),
      providesTags: ["Patients"],
    }),
    getPatients: build.query({
      query: () => `patient/gets`,
      providesTags: ["Patients"],
    }),
    getPatient: build.query({
      query: (id) => `patient/get/${id}`,
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
        MOH,
        ContactPersons,
        Sponsor,
      }) => ({
        url: `camp/add`,
        method: "POST",
        body: {
          CampId,
          Province,
          District,
          Town,
          MOH,
          ContactPersons,
          Sponsor,
        },
      }),
      providesTags: ["Camps"],
    }),
    getCamps: build.query({
      query: () => `camp/gets`,
      providesTags: ["Camps"],
    }),
    getCamp: build.query({
      query: (id) => `camp/get/${id}`,
      providesTags: ["Camps"],
    }),
    // Lab Reports
    deleteLabReport: build.mutation({
      query: (labReportId) => ({
        url: `labreport/delete/${labReportId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LabReports"],
    }),
    addLabReport: build.mutation({
      query: ({
        patientNIC,
        kidneySerum,
        sugarLevel,
        cholesterolLevel,
        bloodPressure,
      }) => ({
        url: `labreport/add`,
        method: "POST",
        body: {
          patientNIC,
          kidneySerum,
          sugarLevel,
          cholesterolLevel,
          bloodPressure,
        },
      }),
      providesTags: ["LabReports"],
    }),
    getLabReports: build.query({
      query: () => `labreport/gets`,
      providesTags: ["LabReports"],
    }),
    getLabReport: build.query({
      query: (id) => `labreport/get/${id}`,
      providesTags: ["LabReports"],
    }),
    // Schools
    deleteSchool: build.mutation({
      query: (schoolId) => ({
        url: `school/delete/${schoolId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schools"],
    }),
    addSchool: build.mutation({
      query: ({
        schoolID,
        schoolName,
        schoolAddress,
        location,
        schoolMobileNumber,
        principalContact,
      }) => ({
        url: `school/add`,
        method: "POST",
        body: {
          schoolID,
          schoolName,
          schoolAddress,
          location,
          schoolMobileNumber,
          principalContact,
        },
      }),
      providesTags: ["Schools"],
    }),
    getSchools: build.query({
      query: () => `school/gets`,
      providesTags: ["Schools"],
    }),
    getSchool: build.query({
      query: (id) => `school/get/${id}`,
      providesTags: ["Schools"],
    }),
    // Donors
    deleteDonor: build.mutation({
      query: (donorId) => ({
        url: `donor/delete/${donorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Donors"],
    }),
    addDonor: build.mutation({
      query: ({
        donorNIC,
        donorName,
        donorAddress,
        dateOfBirth,
        mobileNumber,
        occupation,
      }) => ({
        url: `donor/add`,
        method: "POST",
        body: {
          donorNIC,
          donorName,
          donorAddress,
          dateOfBirth,
          mobileNumber,
          occupation,
        },
      }),
      providesTags: ["Donors"],
    }),
    getDonors: build.query({
      query: () => `donor/gets`,
      providesTags: ["Donors"],
    }),
    getDonor: build.query({
      query: (id) => `donor/get/${id}`,
      providesTags: ["Donors"],
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
      query: ({ programID, location, areaOfficerDetails }) => ({
        url: `derana-daruwo/add`,
        method: "POST",
        body: { programID, location, areaOfficerDetails },
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
        programID,
        parentName,
        parentContactDetails,
        bankAccountDetails,
        accountNumber,
      }) => ({
        url: `student/add`,
        method: "POST",
        body: {
          studentName,
          studentAddress,
          studentID,
          programID,
          parentName,
          parentContactDetails,
          bankAccountDetails,
          accountNumber
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
    // Donor Volunteers
    deleteDonorVolunteer: build.mutation({
      query: (donorVolunteerId) => ({
        url: `donor-volunteer/delete/${donorVolunteerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DonorVolunteers"],
    }),
    addDonorVolunteer: build.mutation({
      query: ({
        donorName,
        donorAddress,
        donorContactNumber,
        donorID,
        assignedStudentID,
        programID,
      }) => ({
        url: `donor-volunteer/add`,
        method: "POST",
        body: {
          donorName,
          donorAddress,
          donorContactNumber,
          donorID,
          assignedStudentID,
          programID,
        },
      }),
      providesTags: ["DonorVolunteers"],
    }),
    getDonorVolunteers: build.query({
      query: () => `donor-volunteer/gets`,
      providesTags: ["DonorVolunteers"],
    }),
    getDonorVolunteer: build.query({
      query: (id) => `donor-volunteer/get/${id}`,
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

  useDeletePatientMutation,
  useGetPatientQuery,
  useGetPatientsQuery,
  useAddPatientMutation,

  useDeleteCampMutation,
  useGetCampQuery,
  useGetCampsQuery,
  useAddCampMutation,

  useDeleteLabReportMutation,
  useGetLabReportQuery,
  useGetLabReportsQuery,
  useAddLabReportMutation,

  useDeleteSchoolMutation,
  useAddSchoolMutation,
  useGetSchoolsQuery,
  useGetSchoolQuery,

  useDeleteDonorMutation,
  useAddDonorMutation,
  useGetDonorsQuery,
  useGetDonorQuery,

  useDeleteDeranaDaruwoProgramMutation,
  useAddDeranaDaruwoProgramMutation,
  useGetDeranaDaruwoProgramsQuery,
  useGetDeranaDaruwoProgramQuery,

  useDeleteStudentMutation,
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,

  useDeleteDonorVolunteerMutation,
  useAddDonorVolunteerMutation,
  useGetDonorVolunteersQuery,
  useGetDonorVolunteerQuery,

  useDeleteVolunteerMutation,
  useAddVolunteerMutation,
  useGetVolunteersQuery,
  useGetVolunteerQuery,

  useDeleteVolunteerEventMutation,
  useAddVolunteerEventMutation,
  useGetVolunteerEventsQuery,
  useGetVolunteerEventQuery,
} = api;
