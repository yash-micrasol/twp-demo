import React from 'react';
import Chart from 'react-apexcharts';
import { monthArr } from '../../../helpers/constant';

const ChartData = ({ series }) => {
  const options = {
    colors: ['#1E81B0', '#E28743'],
    chart: {
      type: 'bar',
      height: 350,
      border: 2,
      toolbar: {
        show: true,
        tools: {
          download: false
        }
      }
    },
    axisBorder: {
      show: true,
      color: '#78909C',
      height: 1,
      width: '100%',
      offsetX: 0,
      offsetY: 0
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '75%',
        endingShape: 'rounded',
        borderRadius: 2
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      width: 0
    },
    grid: {
      show: false
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          let val = value / 1000;
          return `${val ? val + 'k' : val}`;
        }
      },
      tickAmount: 4
    },
    xaxis: {
      categories: monthArr
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      followCursor: true,
      shared: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        let salesData = {
          month: w.config.xaxis.categories[dataPointIndex],
          0: series[0][dataPointIndex],
          1: series[1][dataPointIndex]
        };

        return `<div class="bg-transparent p-2 text-darkGray">
            <div class="flex flex-col justify-center items-center space-y-1">
              <p class="text-[10px] font-light">${salesData.month}</p>
              <div class="flex justify-center items-center space-x-2">
                <p class="w-2 rounded-sm h-1 bg-[#1E81B0]" />
                <p>${salesData[0]}</p>
              </div>
              <p class="text-[10px] font-light">${salesData.month}</p>
              <div class="flex justify-center items-center space-x-2">
              <p class="w-2 rounded-sm h-1 bg-[#E28743]" />
              <p>${salesData[1]}</p>
              </div>
            </div>
          </div>`;
      }
    }
  };

  return (
    <div>
      <Chart options={options} type="bar" width="650" series={series} />
    </div>
  );
};

export default ChartData;
