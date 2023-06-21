import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

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
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
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
    <div>
      <canvas ref={chartRef} />
      {data.nombreIndicador}
      {data.unidadMedidaIndicador}
      {data.valorIndicador}
      {data.fechaIndicador}
      {data.origenIndicador}
    </div>
  );
}
