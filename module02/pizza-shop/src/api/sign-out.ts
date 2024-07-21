import { api } from "@/lib/axios";

export const SignOut = async () => {
  await api.post("/sign-out");
};
