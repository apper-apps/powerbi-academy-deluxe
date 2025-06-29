import { resources } from '@/services/mockData/resourceData'

export const getAllResources = async () => {
  await new Promise(resolve => setTimeout(resolve, 350))
  return [...resources]
}

export const getResourceById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  const resource = resources.find(r => r.Id === id)
  if (!resource) {
    throw new Error('Resource not found')
  }
  return { ...resource }
}

export const getResourcesByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  return resources.filter(resource => resource.category === category)
}

export const downloadResource = async (resourceId) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const resource = resources.find(r => r.Id === resourceId)
  if (!resource) {
    throw new Error('Resource not found')
  }
  
  // Simulate download
  resource.downloads = (resource.downloads || 0) + 1
  return { success: true, downloadUrl: `/downloads/${resource.filename}` }
}