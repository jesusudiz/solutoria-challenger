import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


export function Card({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [data.nombreIndicador],
          datasets: [
            {
              label: data.unidadMedidaIndicador,
              data: [data.valorIndicador],
              backgroundColor: '#4f46e5',
              borderColor: '#4f46e5',
              borderWidth: 1,
              color:"black"
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-around items-center w-200 h-300 border rounded-xl shadow-lg overflow-hidden gap-2 p-2">
    <div className="w-5/6 m-1 mx-1 my-1 overflow-hidden">
        <canvas ref={chartRef} />
      </div>
    <div className="flex justify-center">
      <span className="text-xs m-2">{data.fechaIndicador}</span>
      <span className="text-xs">{data.origenIndicador}</span>
    </div>
  </div>
  );
}
