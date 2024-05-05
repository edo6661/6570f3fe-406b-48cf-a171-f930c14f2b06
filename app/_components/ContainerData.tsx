
import { getAllData } from "@/services/data"
import WrapperData from "./WrapperData"



export default async function ContainerData() {
  const data = await getAllData()

  return (
    <div>
      <WrapperData
        data={data!}
      />
    </div>
  )
}
