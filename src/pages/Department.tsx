import { useParams, Navigate } from 'react-router-dom'
import {
  DepartmentHero,
  DepartmentContent,
  departmentConfigs,
  getProductsByDepartment,
} from '@/features/department'

function Department() {
  const { department } = useParams<{ department: string }>()

  const config = department ? departmentConfigs[department] : undefined

  if (!config) {
    return <Navigate to="/" replace />
  }

  const products = getProductsByDepartment(department!)

  return (
    <>
      <DepartmentHero config={config} />
      <DepartmentContent config={config} products={products} />
    </>
  )
}

export const Component = Department
