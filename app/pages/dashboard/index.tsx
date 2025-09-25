import MonthlyRevenueChart from "~/components/ui/monthly-revenue-chart";
import DataCard from "~/components/ui/summary-card";

export default function Dashboard() {
  const monthlyData = [
    { month: "Jan", revenue: 45000, fullMonth: "January" },
    { month: "Feb", revenue: 52000, fullMonth: "February" },
    { month: "Mar", revenue: 48000, fullMonth: "March" },
    { month: "Apr", revenue: 61000, fullMonth: "April" },
    { month: "May", revenue: 55000, fullMonth: "May" },
    { month: "Jun", revenue: 67000, fullMonth: "June" },
    { month: "Jul", revenue: 72000, fullMonth: "July" },
    { month: "Aug", revenue: 69000, fullMonth: "August" },
    { month: "Sep", revenue: 58000, fullMonth: "September" },
    { month: "Oct", revenue: 64000, fullMonth: "October" },
    { month: "Nov", revenue: 71000, fullMonth: "November" },
    { month: "Dec", revenue: 78000, fullMonth: "December" },
  ];
  return (
    <>
      <div className="grid py-4 px-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard
          label="Monthly Revenue"
          value="$124,592"
          variant="primary"
          description="Revenue this month"
        />
        <DataCard
          label="VAT Collected"
          value="$18,689"
          variant="success"
          description="Total tax received this month"
        />
        <DataCard
          label="Invoices Paid"
          value="147"
          variant="success"
          description="Settled this month"
        />
        <DataCard
          label="Invoices Pending"
          value="23"
          variant="warning"
          description="Pending client payment"
        />
      </div>
      <MonthlyRevenueChart
        onBarClick={(d) => console.log(d)}
        monthlyData={monthlyData}
      />
    </>
  );
}
