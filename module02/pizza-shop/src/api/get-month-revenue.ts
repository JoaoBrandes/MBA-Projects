import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export const getMonthRevenue = async () => {
  const { data } = await api.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
  );

  return data;
};
