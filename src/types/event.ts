export interface Event {
  id: string
  title: string
  imageUrl?: string 
  description: string | null
  location: string
  startTime: Date
  endTime: Date
  category: string
  createdBy: string
  
  // timestamps
  createdAt: Date
  updatedAt: Date
}
