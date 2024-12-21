import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import MapChart from "./MapChart";
import DashboardSummary from "./DashboardSummary";

export default function Statistics({ campaignData, postData, accounts = [] }) {
  // Helper to generate a range of dates in ISO format
  const generateDateRange = (start, end) => {
    const dates = [];
    for (
      let d = new Date(start);
      d <= new Date(end);
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(d.toISOString().split("T")[0]); // ISO format (YYYY-MM-DD)
    }
    return dates;
  };

  // Generate a complete range of labels (x-axis) in ISO format
  const labels = generateDateRange(
    Math.min(
      ...campaignData?.map((item) => new Date(item.startDate).getTime())
    ),
    Math.max(...campaignData?.map((item) => new Date(item.endDate).getTime()))
  );

  // Count active campaigns per date
  const campaignCounts = labels?.map((label) => {
    return campaignData?.filter(
      (item) =>
        label >= new Date(item.startDate).toISOString().split("T")[0] &&
        label <= new Date(item.endDate).toISOString().split("T")[0]
    ).length;
  });

  const barGraphOptions = {
    type: "bar",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Campaigns Over Time",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Campaigns",
        },
      },
    },
  };

  // Bar graph data
  const barGraphData = {
    labels,
    datasets: [
      {
        label: "Number of Active Campaigns",
        data: campaignCounts,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
  ];

  const LineData = {
    labels,
    datasets: campaignData.map((item, index) => {
      const start = new Date(item.startDate).toISOString().split("T")[0];
      const end = new Date(item.endDate).toISOString().split("T")[0];

      // Populate data points for each label
      const datasetData = labels.map((label) =>
        label >= start && label <= end ? item.estimated_cost : 0
      );

      return {
        label: item.name,
        data: datasetData,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        fill: true,
      };
    }),
  };

  const LineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Campaign budget over time",
        color: "black",
        font: {
          size: 24,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Budget",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Company size ratio",
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            console.log(context);
            const value = context.raw || 0;
            return `${pieLabels[context.dataIndex]}: ${value} company`;
          },
        },
      },
    },
  };

  // Process API data to count occurrences of each company size
  const companySizeCounts = postData.reduce((acc, post) => {
    const size = post.company_size || "Unknown";
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {});
  console.log(companySizeCounts);

  // Extract labels (company sizes) and their corresponding counts
  const pieLabels = Object.keys(companySizeCounts);
  const counts = Object.values(companySizeCounts);

  // Define colors dynamically for the pie chart
  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  // Pie chart data
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        label: "# of Posts by Company Size",
        data: counts,
        backgroundColor: backgroundColors.slice(0, pieLabels.length),
        borderColor: borderColors.slice(0, pieLabels.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <DashboardSummary
        applicants={accounts.filter((acc) => acc.role === "2").length}
        campaigns={campaignData.length}
        posts={postData.length}
        users={accounts.length}
        positions={campaignData.reduce((accumulator, current) => {
          const today = new Date();
          const startDate = new Date(current.startDate);
          const endDate = new Date(current.endDate);

          if (today >= startDate && today <= endDate) {
            return accumulator + current.hiring_count;
          }

          return accumulator;
        }, 0)}
      />
      <div className="col-span-8">
        <Bar options={barGraphOptions} data={barGraphData} />
      </div>
      <div className="col-span-3">
        <Pie options={pieOptions} data={pieData} />
      </div>
      <div className="col-span-11">
        <Line options={LineOptions} data={LineData} />
      </div>
      <div className="col-span-11">
        <MapChart postData={postData} />
      </div>
    </>
  );
}
