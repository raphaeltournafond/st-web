import { DataLine } from "../components/data-viewer"

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

export function exportSessionData(sessionData: AccelerometerData[]): [number[], number[], number[]] {
    const xValues: number[] = [];
    const yValues: number[] = [];
    const zValues: number[] = [];

    sessionData.forEach((dataPoint) => {
        xValues.push(dataPoint.x);
        yValues.push(dataPoint.y);
        zValues.push(dataPoint.z);
    });

    return [xValues, yValues, zValues];
}

export function sessionDataToDataLines(sessionData: AccelerometerData[]): DataLine[] {
    const [xValues, yValues, zValues] = exportSessionData(sessionData);

    const dataLines: DataLine[] = []
        
    dataLines.push({
        data: xValues,
        color: '#FFDAB9',
        label: 'X'
    });

    dataLines.push({
        data: yValues,
        color: '#ADD8E6',
        label: 'Y'
    });

    dataLines.push({
        data: zValues,
        color: '#FFA07A',
        label: 'Z'
    });

    return dataLines;
}