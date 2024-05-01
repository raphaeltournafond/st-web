import { AccelerometerData } from "../types/session";

const samplingFrequency = 0.1;

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

    for (let i = 0; i < windowSize; i++) {
        windowSum.x += data[i].x;
        windowSum.y += data[i].y;
        windowSum.z += data[i].z;
    }

    result.push({
        x: windowSum.x / windowSize,
        y: windowSum.y / windowSize,
        z: windowSum.z / windowSize
    });

    for (let i = windowSize; i < data.length; i++) {
        windowSum.x += data[i].x - data[i - windowSize].x;
        windowSum.y += data[i].y - data[i - windowSize].y;
        windowSum.z += data[i].z - data[i - windowSize].z;

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

        for (let j = windowStart; j <= windowEnd; j++) {
            windowX.push(data[j].x);
            windowY.push(data[j].y);
            windowZ.push(data[j].z);
        }

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

        gravityX = alpha * current.x + (1 - alpha) * gravityX;
        gravityY = alpha * current.y + (1 - alpha) * gravityY;
        gravityZ = alpha * current.z + (1 - alpha) * gravityZ;

        const dynamicX = current.x - gravityX;
        const dynamicY = current.y - gravityY;
        const dynamicZ = current.z - gravityZ;

        filteredData.push({ x: dynamicX, y: dynamicY, z: dynamicZ });
    }

    return filteredData;
}

function highPassFilter(data: AccelerometerData[], cutoffFrequency: number, samplingFrequency: number = 0.1): AccelerometerData[] {
    const RC = 1.0 / (cutoffFrequency * 2 * Math.PI);
    const dt = samplingFrequency;

    let alpha = RC / (RC + dt);
    let filteredData: AccelerometerData[] = [];

    let prevX = data[0].x;
    let prevY = data[0].y;
    let prevZ = data[0].z;

    filteredData.push({ x: prevX, y: prevY, z: prevZ });

    for (let i = 1; i < data.length; i++) {
        const newX = alpha * (prevX + data[i].x - data[i - 1].x);
        const newY = alpha * (prevY + data[i].y - data[i - 1].y);
        const newZ = alpha * (prevZ + data[i].z - data[i - 1].z);

        filteredData.push({ x: newX, y: newY, z: newZ });

        prevX = newX;
        prevY = newY;
        prevZ = newZ;
    }

    return filteredData;
}

function computeMagnitude(data: AccelerometerData[]): number[] {
    return data.map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z));
}

function normalizeData(data: AccelerometerData[]): AccelerometerData[] {
    const magnitudes = computeMagnitude(data);

    const maxMagnitude = Math.max(...magnitudes);

    const normalizedData: AccelerometerData[] = data.map(({ x, y, z }, index) => ({
        x: x / maxMagnitude,
        y: y / maxMagnitude,
        z: z / maxMagnitude
    }));

    return normalizedData;
}

function thresholdData(data: AccelerometerData[], threshold: number): AccelerometerData[] {
    const thresholdedData: AccelerometerData[] = [];

    for (let i = 0; i < data.length; i++) {
        const { x, y, z } = data[i];
        
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        
        if (magnitude >= threshold) {
            thresholdedData.push({ x, y, z });
        } else {
            thresholdedData.push({ x: 0, y: 0, z: 0 });
        }
    }

    return thresholdedData;
}

function extractPeaks(data: AccelerometerData[]): number[] {
    const peaksIndices: number[] = [];
    const gravity = 9.81;
    const highPassThreshold = 0.1;
    const normalizedThreshold = 0.25;
    const peakThreshold = 0.1;

    let processedData = removeGravity(data, gravity);
    processedData = highPassFilter(processedData, highPassThreshold, samplingFrequency);
    processedData = normalizeData(processedData);
    processedData = thresholdData(processedData, normalizedThreshold);
    const magnitudes = computeMagnitude(processedData);

    for (let i = 0; i < processedData.length; i++) {
        if (magnitudes[i] > peakThreshold || magnitudes[i] < -peakThreshold) {
            peaksIndices.push(magnitudes[i]);
        } else {
            peaksIndices.push(0)
        }
    }
    
    return peaksIndices;
}

function extractStepsStats(magnitudes: number[]): { stepCount: number; stepFrequency: number } {
    let stepCount = 0;
    let passedMaximum = false;
    let previousStepTime = 0;
    let totalStepTimeDifference = 0;

    for (let i = 1; i < magnitudes.length - 1; i++) {
        if (magnitudes[i] > magnitudes[i - 1] && magnitudes[i] > magnitudes[i + 1]) {
            passedMaximum = true;
        }
        else if (passedMaximum && magnitudes[i] < magnitudes[i - 1]) {
            stepCount++;
            const currentStepTime = i;
            if (previousStepTime !== 0) {
                totalStepTimeDifference += currentStepTime - previousStepTime;
                console.log(totalStepTimeDifference)
            }
            previousStepTime = currentStepTime;
            passedMaximum = false;
        }
    }

    const stepFrequency = totalStepTimeDifference / (stepCount - 1) * samplingFrequency; // exclude the first step, in seconds

    return { stepCount, stepFrequency };
}

export {noiseReduction, movingAverage, medianFilter, removeGravity, highPassFilter, normalizeData, computeMagnitude, thresholdData, extractPeaks, extractStepsStats}