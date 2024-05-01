import { AccelerometerData } from "../types/session";

function applyNoiseReduction(data: AccelerometerData[], windowSize: number): AccelerometerData[] {
    const result: AccelerometerData[] = [];

    for (let i = 0; i < data.length; i++) {
        const windowStart = Math.max(0, i - Math.floor(windowSize / 2));
        const windowEnd = Math.min(data.length - 1, i + Math.ceil(windowSize / 2));

        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        for (let j = windowStart; j <= windowEnd; j++) {
            sumX += data[j].x;
            sumY += data[j].y;
            sumZ += data[j].z;
        }

        const averagedX = sumX / (windowEnd - windowStart + 1);
        const averagedY = sumY / (windowEnd - windowStart + 1);
        const averagedZ = sumZ / (windowEnd - windowStart + 1);

        result.push({
            x: averagedX,
            y: averagedY,
            z: averagedZ
        });
    }

    return result;
}

export {applyNoiseReduction}