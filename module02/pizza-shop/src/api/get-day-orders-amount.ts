import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export const getDayOrdersAmount = async () => {
  const { data } = await api.get<GetDayOrdersAmountResponse>(
    "/metrics/day-orders-amount",
  );

  return data;
};
