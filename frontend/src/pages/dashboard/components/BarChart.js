import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
  ['Days', 'Customer'],
  ['M', 15],
  ['T', 10],
  ['W', 22],
  ['T', 21],
  ['F', 19],
  ['S', 25],
  ['S', 30],
];

export default function BarChart() {
  return <Chart chartType='Bar' width='100%' height='320px' data={data} />;
}
