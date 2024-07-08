import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const OrderDetails = () => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Pedido: 1asd123</DialogTitle>
                <DialogDescription>Detalhes do pedido</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                                    <span className="font-medium text-muted-foreground">Pendente</span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Cliente</TableCell>
                            <TableCell className="flex justify-end">
                                João Eduardo
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Telefone</TableCell>
                            <TableCell className="flex justify-end">
                                (19) 99999-9999
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">E-Mail</TableCell>
                            <TableCell className="flex justify-end">
                                joao@email.com
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="text-muted-foreground">Realizado a</TableCell>
                            <TableCell className="flex justify-end">
                                3 minutos
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Qtd.</TableHead>
                        <TableHead className="text-right">Preço</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pizza Marguerita</TableCell>
                            <TableCell className="text-right">2</TableCell>
                            <TableCell className="text-right">R$70,00</TableCell>
                            <TableCell className="text-right">R$140,00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pizza Caipira</TableCell>
                            <TableCell className="text-right">1</TableCell>
                            <TableCell className="text-right">R$89,00</TableCell>
                            <TableCell className="text-right">R$89,00</TableCell>
                        </TableRow>

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total do Pedido</TableCell>
                            <TableCell className="text-right font-medium">R$229,00</TableCell>

                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>
    )
}