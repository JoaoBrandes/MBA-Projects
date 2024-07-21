import { api } from "@/lib/axios";

export interface ApproveOrder {
  orderId: string;
}

export const approveOrder = async ({ orderId }: ApproveOrder) => {
  await api.patch(`/orders/${orderId}/approve`);
};
