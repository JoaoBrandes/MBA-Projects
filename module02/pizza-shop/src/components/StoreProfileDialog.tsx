import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { getRestaurant, GetRestaurantResponse } from "@/api/get-restaurant"
import { updateProfile } from '@/api/update-profile'

import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export const StoreProfileDialog = () => {

    const queryClient = useQueryClient();

    const { data: restaurant } = useQuery({
        queryFn: getRestaurant,
        queryKey: ['restaurant'],
        staleTime: Infinity,
    });

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: restaurant?.name ?? '',
            description: restaurant?.description ?? ''
        }
    });

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({ name, description }) {
            const { cached } = updateRestaurantInfo({ name, description })
            return { previousValue: cached }
        },
        onError(_, __, context) {
            if (context?.previousValue) {
                updateRestaurantInfo(context.previousValue)
            }
        },
    })

    const updateRestaurantInfo = (data: StoreProfileSchema) => {
        const { name, description } = data;
        const cached = queryClient.getQueryData<GetRestaurantResponse>(['restaurant'])
        if (cached) {
            queryClient.setQueryData<GetRestaurantResponse>(['restaurant'], {
                ...cached,
                name,
                description
            })
        }
        return { cached }
    }

    const handleUpdateProfile = async (data: StoreProfileSchema) => {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            })
            toast.success("Perfil atualizado com sucesso!")
        } catch (err) {
            toast.error("Falha ao atualizar o perfil.")
            console.log(err)

        }
    }

    return <DialogContent>
        <DialogHeader>
            <DialogTitle>Perfil da Loja</DialogTitle>
            <DialogDescription>Atualize as informações do seu estabelecimento</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="name">
                        Nome
                    </Label>
                    <Input className="col-span-3" id="name" {...register('name')} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="description">
                        Descrição
                    </Label>
                    <Textarea className="col-span-3" id="description"  {...register('description')} />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost" type="button">Cancelar</Button>
                </DialogClose>
                <Button type="submit" variant="success" disabled={isSubmitting}>Salvar</Button>
            </DialogFooter>
        </form>
    </DialogContent>
}