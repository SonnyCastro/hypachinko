import { Suspense } from "react"
import { getServerAggregatedData } from "@/lib/server/contracts"
import { MachinesPage } from "@/components/features/MachinesPage"
import { getSortedMachineIds } from "@/constants/machines"
import { MachinesPageSkeleton } from "@/components/features/MachinesPage/MachinesPageSkeleton"

async function MachinesPageContent() {
  // Server-side data fetching
  const machineIds = getSortedMachineIds()
  const result = await getServerAggregatedData(machineIds)

  return (
    <MachinesPage
      serverMachinesData={result.machinesData}
      serverAggregatedData={{
        totalTickets: result.totalTickets,
        totalBalance: result.totalBalance,
        totalPballs: result.totalPballs,
      }}
      serverError={result.error}
    />
  )
}

export default function MachinesPageRoute() {
  return (
    <Suspense fallback={<MachinesPageSkeleton />}>
      <MachinesPageContent />
    </Suspense>
  )
}
