"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type DataPoint = {
  x: number;
  y: number;
  label?: string;
};

type Props = {
  data: DataPoint[];
  width?: number;
  height?: number;
};

export const ScatterPlot = ({ data, width = 500, height = 300 }: Props) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y) as [number, number])
      .range([innerHeight, 0]);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    g.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("r", 8).attr("opacity", 1);
        
        if (d.label) {
          g
            .append("text")
            .attr("class", "tooltip")
            .attr("x", xScale(d.x))
            .attr("y", yScale(d.y) - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "black")
            .text(d.label);
        }
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", 5).attr("opacity", 0.7);
        g.select(".tooltip").remove();
      });
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};