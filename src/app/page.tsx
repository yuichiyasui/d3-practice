import { BarChart } from "@/components/bar-chart";
import { LineChart } from "@/components/line-chart";
import { ScatterPlot } from "@/components/scatter-plot";
import { PieChart } from "@/components/pie-chart";

const lineData = [
  { x: 1, y: 30 },
  { x: 2, y: 80 },
  { x: 3, y: 45 },
  { x: 4, y: 120 },
  { x: 5, y: 160 },
  { x: 6, y: 90 },
];

const scatterData = [
  { x: 10, y: 20, label: "A" },
  { x: 30, y: 40, label: "B" },
  { x: 50, y: 80, label: "C" },
  { x: 70, y: 30, label: "D" },
  { x: 90, y: 70, label: "E" },
];

const pieData = [
  { label: "React", value: 30 },
  { label: "Vue", value: 25 },
  { label: "Angular", value: 20 },
  { label: "Svelte", value: 15 },
  { label: "Other", value: 10 },
];

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">D3 Practice</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">棒グラフ</h2>
          <BarChart data={[40, 80, 150, 160, 230, 420]} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">折れ線グラフ</h2>
          <LineChart data={lineData} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">散布図</h2>
          <ScatterPlot data={scatterData} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">円グラフ</h2>
          <PieChart data={pieData} />
        </div>
      </div>
    </main>
  );
}
