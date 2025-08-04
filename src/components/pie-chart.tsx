"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type DataPoint = {
  label: string;
  value: number;
};

type Props = {
  data: DataPoint[];
  width?: number;
  height?: number;
};

export const PieChart = ({ data, width = 400, height = 400 }: Props) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 40;
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<DataPoint>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<DataPoint>>().innerRadius(0).outerRadius(radius);

    const labelArc = d3
      .arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(radius + 10)
      .outerRadius(radius + 10);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i.toString()))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
        
        const tooltip = g
          .append("text")
          .attr("class", "tooltip")
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("fill", "black");

        tooltip
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "-0.5em")
          .text(d.data.label);

        tooltip
          .append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em")
          .text(`${d.data.value} (${((d.data.value / d3.sum(data, (d) => d.value)) * 100).toFixed(1)}%)`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        g.select(".tooltip").remove();
      });

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.data.label);
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};