import { Helmet } from "react-helmet-async"

import { DailyOrdersCard } from "./daily-orders-card"
import { MonthlyCancelledOrdersCard } from "./monthly-cancelled-orders-card"
import { MonthlyOrdersCard } from "./monthly-orders-amount-card"
import { MonthlyRevenueCard } from "./monthly-revenue-card"
import { PopularProductsChart } from "./popular-products-chart"
import { RevenueChart } from "./revenue-chart"

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