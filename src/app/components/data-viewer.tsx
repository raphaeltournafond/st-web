import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export interface DataLine {
    data: number[];
    color: string;
    label: string;
}

interface ChartProps {
    data: DataLine[];
    width: number;
    height: number;
    showAxes?: boolean;
}

const DataViewer: React.FC<ChartProps> = ({ data, width, height, showAxes = true }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!data) {
            setError('DataViewer: Data undefined')
            console.error(error);
            return;
        }

        if (!svgRef.current) {
            setError('DataViewer: svgRef undefined')
            console.error(error);
            return;
        }

        const svg = d3.select(svgRef.current);

        const margin = { top: 20, right: 30, bottom: 30, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const maxX = Math.max(...data.map(line => line.data.length));
        const minY = Math.min(...data.map(line => Math.min(...line.data))) * 1.2;
        const maxY = Math.max(...data.map(line => Math.max(...line.data))) * 1.2;

        const xScale = d3.scaleLinear()
            .domain([0, maxX - 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([minY, maxY])
            .range([innerHeight, 0]);

        const line = d3.line<number>()
            .x((d, i) => xScale(i) ?? 0)
            .y((d) => yScale(d) ?? 0)
            .curve(d3.curveMonotoneX);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        if (showAxes) {
            g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

            g.append('g')
                .call(d3.axisLeft(yScale));
        }

        data.forEach((lineData) => {
            g.append('path')
                .datum(lineData.data)
                .attr('fill', 'none')
                .attr('stroke', lineData.color)
                .attr('stroke-width', 1.5)
                .attr('d', line);

            g.append('text')
                .attr('x', 0)
                .attr('y', yScale(lineData.data[0]) - 10)
                .attr('fill', lineData.color)
                .text(lineData.label.toUpperCase());
        });

    }, [data, width, height, showAxes, error]);

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}></svg>
            {error && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
export default DataViewer;
