import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "Patients",
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
    getPatients: build.query({
      query: () => `patient/gets`,
      providesTags: ["Patients"],
    }),
    getPatient: build.query({
      query: (id) => `patient/get/${id}`,
      providesTags: ["Patients"],
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
    deletePatient: build.mutation({
      query: (patientId) => ({
        url: `patient/delete/${patientId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Patients"], // Invalidate the cache for "Donors" after deletion
    }),
    addPatient: build.mutation({
      query: ({ name, NIC, phone, address, city }) => ({
        url: `patient/add`,
        method: "post",
        body: { name, NIC, phone, address, city },
      }),
      providesTags: ["Patients"],
    }),
  }),
});

export const {
  useGetPatientsQuery,
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
  useAddPatientMutation,
} = api;
