export interface Event {
  id: number 
  title: string
  imageUrl?: string 
  description: string | null
  location: string
  startTime: string
  endTime: string 
  date: Date
  category: string
  createdBy: string
  
  // timestamps
  createdAt: Date
  updatedAt: Date
}
