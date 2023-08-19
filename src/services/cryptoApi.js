import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";
const crptoApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_CRPTO_COIN_RANKING,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: crptoApiHeaders });

export const crptoApi = createApi({
  reducerPath: "crptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCrptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCoinDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`),
    }),
    getExchangeData: builder.query({
      query: () => createRequest(`/stats`),
    }),
  }),
});

export const {
  useGetCrptosQuery,
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
  useGetExchangeDataQuery,
} = crptoApi;
