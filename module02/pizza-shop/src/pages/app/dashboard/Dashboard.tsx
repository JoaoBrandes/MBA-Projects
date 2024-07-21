import { Helmet } from "react-helmet-async"

import { DailyOrdersCard } from "./DailyOrders"
import { MonthlyOrdersCard } from "./MonthlyOrders"
import { MonthlyRevenueCard } from "./MonthlyRevenue"
import { MonthlyCancelledOrdersCard } from "./MonthyCancelledOrders"
import { PopularProductsChart } from "./PopularProductsChart"
import { RevenueChart } from "./RevenueChart"

export const Dashboard = () => {
    return <>
        <Helmet title="Dashboard" />
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="grid grid-cols-4 gap-4">
            <MonthlyRevenueCard />
            <MonthlyOrdersCard />
            <DailyOrdersCard />
            <MonthlyCancelledOrdersCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
            <RevenueChart />
            <PopularProductsChart />
        </div>
    </>
}