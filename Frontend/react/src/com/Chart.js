import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../App.css';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({innerData}) {
    const data = {
         labels: [ 'פסולת מעורבת','קרטון, נייר', 'פלסטיק, מתכת','זכוכית'],
        datasets: [
          {
            label: '# of Votes',
            data:innerData,
            backgroundColor: [
              '#2ed410',
              '#1d73cc',
              '#f07c19',
              '#ca72e6',
            ],
            borderColor: [
              'white',
              'white',
              'white',
              'white',
            ],
            borderWidth: 1,
          },
        ],
      };
    return (
        <Doughnut
            data={data}
            width={150}
            height={150}
            options={{ maintainAspectRatio: false }}
        />
    )
}