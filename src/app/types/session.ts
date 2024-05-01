import { DataLine } from "../components/session-viewer"

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
        color: 'red',
        label: 'X'
    });

    dataLines.push({
        data: yValues,
        color: 'green',
        label: 'Y'
    });

    dataLines.push({
        data: zValues,
        color: 'blue',
        label: 'Z'
    });

    return dataLines;
}