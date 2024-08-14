// src/components/Chart.js
import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const Chart = () => {
  const [options, setOptions] = useState({
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0
      },
    },
    series: [
      {
        name: "New users",
        data: [], // initialize data as an empty array
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [], // initialize categories as an empty array
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          const series = data.users.map((user, index) => ({
            name: user.name,
            data: [user.value],
          }));
          const categories = data.users.map((user, index) => user.name);
          const options = {
            ...options,
            series,
            xaxis: {
              ...options.xaxis,
              categories,
            },
          };
          setOptions(options);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div id="area-chart"></div>
    </div>
  );
};

export default Chart;
