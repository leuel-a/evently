export interface Event {
  id: number 
  title: string
  imageUrl?: string  | null
  description: string | null
  location: string | null
  startTime: string
  endTime?: string | null
  date: Date
  category: string
  createdBy: string
  virtual: boolean
  
  // timestamps
  createdAt: Date
  updatedAt: Date
}
