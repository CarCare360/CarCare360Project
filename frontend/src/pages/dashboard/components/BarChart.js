import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export default function BarChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend()
      .then((backendData) => {
        setChartData(backendData);
      })
      .catch((error) => {
        console.error('Error fetching data from backend:', error);
      });
  }, []); 

  const fetchDataFromBackend = async () => {
    const response = await fetch('https://car-care-360.onrender.com/api/components/barchart');
    const data = await response.json();
    return data;
  };

  return <Chart chartType='Bar' width='100%' height='350px' data={chartData} />;
}
