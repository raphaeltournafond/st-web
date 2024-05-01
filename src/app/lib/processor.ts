import { AccelerometerData } from "../types/session";

function noiseReduction(data: AccelerometerData[], windowSize: number): AccelerometerData[] {
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

function movingAverage(data: AccelerometerData[], windowSize: number): AccelerometerData[] {
    const result: AccelerometerData[] = [];
    let windowSum: AccelerometerData = { x: 0, y: 0, z: 0 };

    // Initialize the window sum with the first window
    for (let i = 0; i < windowSize; i++) {
        windowSum.x += data[i].x;
        windowSum.y += data[i].y;
        windowSum.z += data[i].z;
    }

    // Calculate the moving average for the first data point
    result.push({
        x: windowSum.x / windowSize,
        y: windowSum.y / windowSize,
        z: windowSum.z / windowSize
    });

    // Slide the window and update the moving average for each subsequent data point
    for (let i = windowSize; i < data.length; i++) {
        // Update the window sum by removing the outgoing data point and adding the incoming data point
        windowSum.x += data[i].x - data[i - windowSize].x;
        windowSum.y += data[i].y - data[i - windowSize].y;
        windowSum.z += data[i].z - data[i - windowSize].z;

        // Calculate the average of the current window and store it in the result array
        result.push({
            x: windowSum.x / windowSize,
            y: windowSum.y / windowSize,
            z: windowSum.z / windowSize
        });
    }

    return result;
}

function medianFilter(data: AccelerometerData[], windowSize: number): AccelerometerData[] {
    const result: AccelerometerData[] = [];

    // Helper function to calculate median
    function calculateMedian(arr: number[]): number {
        const sortedArr = arr.slice().sort((a, b) => a - b);
        const mid = Math.floor(sortedArr.length / 2);
        return sortedArr.length % 2 === 0 ? (sortedArr[mid - 1] + sortedArr[mid]) / 2 : sortedArr[mid];
    }

    for (let i = 0; i < data.length; i++) {
        const windowStart = Math.max(0, i - Math.floor(windowSize / 2));
        const windowEnd = Math.min(data.length - 1, i + Math.ceil(windowSize / 2));

        const windowX: number[] = [];
        const windowY: number[] = [];
        const windowZ: number[] = [];

        // Collect values within the window
        for (let j = windowStart; j <= windowEnd; j++) {
            windowX.push(data[j].x);
            windowY.push(data[j].y);
            windowZ.push(data[j].z);
        }

        // Calculate median for each axis
        const medianX = calculateMedian(windowX);
        const medianY = calculateMedian(windowY);
        const medianZ = calculateMedian(windowZ);

        // Store the median values
        result.push({ x: medianX, y: medianY, z: medianZ });
    }

    return result;
}

function removeGravity(data: AccelerometerData[], gravityFactor: number): AccelerometerData[] {
    const filteredData: AccelerometerData[] = [];
    const alpha = 2 * Math.PI * gravityFactor / 1000;

    let gravityX = 0;
    let gravityY = 0;
    let gravityZ = 0;

    for (let i = 0; i < data.length; i++) {
        const current = data[i];

        // Low-pass filter to estimate gravity
        gravityX = alpha * current.x + (1 - alpha) * gravityX;
        gravityY = alpha * current.y + (1 - alpha) * gravityY;
        gravityZ = alpha * current.z + (1 - alpha) * gravityZ;

        // Subtract estimated gravity from current acceleration to obtain dynamic component
        const dynamicX = current.x - gravityX;
        const dynamicY = current.y - gravityY;
        const dynamicZ = current.z - gravityZ;

        filteredData.push({ x: dynamicX, y: dynamicY, z: dynamicZ });
    }

    return filteredData;
}

export {noiseReduction, movingAverage, medianFilter, removeGravity}