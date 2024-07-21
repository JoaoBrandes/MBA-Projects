
import { useQuery } from "@tanstack/react-query"

import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { MetricCardSkeleton } from "./metric-card-skeleton"

export const MonthlyCancelledOrdersCard = () => {

    const { data: monthCanceledOrdersAmount } = useQuery({
        queryKey: ['metrics', 'month-canceled-orders-amount'],
        queryFn: getMonthCanceledOrdersAmount
    })
    return (
        <Card>
            <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
                {monthCanceledOrdersAmount ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-500">{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação ao mês passado
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-500">+{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação ao mês passado
                                </>
                            )}
                        </p>
                    </>

                ) : <MetricCardSkeleton />}
            </CardContent>
        </Card>
    )
}