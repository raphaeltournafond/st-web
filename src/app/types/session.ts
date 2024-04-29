export interface AccelerometerData {
    x: number
    y: number
    z: number
}

export interface Session {
    id: number
    startDate: string
    endDate: string
    data: AccelerometerData[]
    user: number
}