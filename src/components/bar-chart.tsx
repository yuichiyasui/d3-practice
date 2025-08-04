"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type Props = {
  data: number[];
};

export const BarChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement>(null);

  const width = data.length * 20;
  const height = Math.max(...data) + 20;

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg
      .style("background", "#ddd")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (_d, i) => i * 20)
      .attr("y", (d) => height - d)
      .attr("width", 18)
      .attr("height", (d) => d)
      .attr("fill", "steelblue");
  }, [data, height]);

  return <svg ref={ref} width={width} height={height} />;
};
