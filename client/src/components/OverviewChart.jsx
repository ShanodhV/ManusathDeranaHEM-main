import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetTotalCampsQuery, useGetTotalPatientsQuery } from "state/api";

const OverviewChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const { data: campsData, isLoading: loadingCamps } = useGetTotalCampsQuery();
  const { data: patientsData, isLoading: loadingPatients } = useGetTotalPatientsQuery();

  const chartData = useMemo(() => {
    if (!Array.isArray(campsData) || !Array.isArray(patientsData)) {
      return [];
    }

    return [
      {
        id: "Total Camps",
        color: theme.palette.secondary.main,
        data: campsData?.map((camp, index) => ({ x: `Camp ${index + 1}`, y: camp.totalCamps })),
      },
      {
        id: "Total Patients",
        color: theme.palette.secondary[600],
        data: patientsData?.map((patient, index) => ({ x: `Patient ${index + 1}`, y: patient.totalPatients })),
      }
    ];
  }, [campsData, patientsData, theme]);

  if (loadingCamps || loadingPatients) return "Loading...";

  if (chartData.length === 0) return "No data available";

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => v,
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "X Axis",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Y Axis",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};

export default OverviewChart;
