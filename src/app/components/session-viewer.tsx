import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Session } from "../types/session";

interface ChartProps {
    session: Session|undefined,
    width: number,
    height: number,
    length: number,
}

const SessionViewer: React.FC<ChartProps> = ({ session, width = 600, height = 400, length = 100 }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!session) {
            console.error('SessionViewer: Session undefined')
            return;
        }

        if (!svgRef.current) {
            console.error('SessionViewer: svgRef undefined')
            return;
        } 

        const svg = d3.select(svgRef.current);

        const margin = { top: 20, right: 30, bottom: 30, left: 50 };
        const accelerometerRange = 40;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleLinear()
            .domain([0, Math.min(length - 1, session.data.length - 1)])
            .range([0, innerWidth])

        const yScale = d3.scaleLinear()
            .domain([-accelerometerRange, accelerometerRange])
            .range([innerHeight, 0])

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const line = d3.line<number>()
            .x((d, i) => xScale(i) ?? 0)
            .y(d => yScale(d) ?? 0)
            .curve(d3.curveMonotoneX);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append('g')
            .call(d3.axisLeft(yScale));

        // X axis

        g.append('path')
            .datum(session.data.slice(0, length).map(d => d.x))
            .attr('fill', 'none')
            .attr('stroke', color('0'))
            .attr('stroke-width', 1.5)
            .attr('d', line);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', yScale(session.data[Math.min(length - 1, session.data.length - 1)].x))
            .attr('fill', color('0'))
            .text('X');

        // Z

        g.append('path')
            .datum(session.data.slice(0, length).map(d => d.z))
            .attr('fill', 'none')
            .attr('stroke', color('1'))
            .attr('stroke-width', 1.5)
            .attr('d', line);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', yScale(session.data[Math.min(length - 1, session.data.length - 1)].z))
            .attr('fill', color('1'))
            .text('Z');

        // Y

        g.append('path')
            .datum(session.data.slice(0, length).map(d => d.y))
            .attr('fill', 'none')
            .attr('stroke', color('2'))
            .attr('stroke-width', 1.5)
            .attr('d', line);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', yScale(session.data[Math.min(length - 1, session.data.length - 1)].y))
            .attr('fill', color('2'))
            .text('Y');

    }, [session, width, height, length]);

    return (
        <svg ref={svgRef} width={width} height={height}></svg>
    );
};

export default SessionViewer;
