import { ArrowRight, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { TableCell, TableRow } from "@/components/ui/table"

import { OrderDetails } from "./order-details"

export const OrderTableRow = () => {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="xs">
                            <Search className="h-3 w-3">
                                <span className="sr-only">Detalhes do pedido</span>
                            </Search>
                        </Button>
                    </DialogTrigger>
                    <OrderDetails />
                </Dialog>
            </TableCell>
            <TableCell className="font-mono text-sm font-medium">asdasqwe123</TableCell>
            <TableCell className="text-muted-foreground">a 15 minutos</TableCell>
            <TableCell >
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
            </TableCell>
            <TableCell className="font-medium">João Eduardo</TableCell>
            <TableCell className="font-medium">
                R$150,00
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className="h-3 w-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}