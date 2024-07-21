import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export const getMonthCanceledOrdersAmount = async () => {
  const { data } = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return data;
};
