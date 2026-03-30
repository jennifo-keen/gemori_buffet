import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueBarChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [{
            label: 'Doanh thu (Triệu)',
            data: data.map(item => item.revenue),
            backgroundColor: data.map(d =>
                d.revenue === Math.max(...data.map(v => v.revenue)) && d.revenue > 0
                    ? '#6C0D0A' : '#F2D3D3'
            ),
            borderRadius: 6,
            hoverBackgroundColor: '#6C0D0A',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, ticks: { callback: (value) => value + 'M' } },
            x: { grid: { display: false } }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default RevenueBarChart;