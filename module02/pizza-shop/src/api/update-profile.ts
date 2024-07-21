import { api } from "@/lib/axios";

export interface UpdateProfileBody {
  name: string;
  description: string | null;
}

export const updateProfile = async ({
  description,
  name,
}: UpdateProfileBody) => {
  await api.put("/profile", { name, description });
};
