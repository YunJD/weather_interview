import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Skeleton,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { useWeatherForecast, weatherForecastResponseListItem } from "../hooks";
import { kelvinToCelsius } from "../units";

const groupByDay = (list: weatherForecastResponseListItem[]) => {
  const result: weatherForecastResponseListItem[][] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const prevItem = list[i - 1];
    const itemDate = new Date(item.dt * 1000).getDate();
    const prevItemDate = !!prevItem && new Date(prevItem.dt * 1000).getDate();
    if (itemDate !== prevItemDate) {
      result.push([]);
    }
    result[result.length - 1].push(item);
  }
  return result;
};

type ForecastTableProps = {
  dayDelta: number;
  cityId: number;
  onChangeDayDelta: (delta: number) => void;
};
export const ForecastTable = ({
  dayDelta,
  cityId,
  onChangeDayDelta,
}: ForecastTableProps) => {
  const {
    data: forecastData,
    isFetching: isForecastFetching,
    isLoading: isForecastLoading,
  } = useWeatherForecast({
    cityId,
  });

  if (isForecastLoading || isForecastFetching) {
    return (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "10rem" }} />
    );
  }

  const forecastsGroupedByDay = forecastData
    ? groupByDay(forecastData.list)
    : [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>Date</TableCell>
            <TableCell>Temp</TableCell>
            <TableCell>Min Temp</TableCell>
            <TableCell>Max Temp</TableCell>
            <TableCell>Wind</TableCell>
            <TableCell>Description</TableCell>
          </TableHead>
          <TableBody>
            {!!forecastData &&
              forecastsGroupedByDay[dayDelta]?.map(
                ({ dt, wind, weather, main: { temp, temp_min, temp_max } }) => {
                  const datetime = new Date(dt * 1000);
                  return (
                    <TableRow>
                      <TableCell>{datetime.toLocaleString()}</TableCell>
                      <TableCell>{kelvinToCelsius(temp)} ℃</TableCell>
                      <TableCell>{kelvinToCelsius(temp_min)} ℃</TableCell>
                      <TableCell>{kelvinToCelsius(temp_max)} ℃</TableCell>
                      <TableCell>{wind.speed} m/sec</TableCell>
                      <TableCell>{weather[0].description}</TableCell>
                    </TableRow>
                  );
                }
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={2}>
        {forecastsGroupedByDay.map((items, index) => (
          <Button
            variant={index === dayDelta ? "contained" : "outlined"}
            key={index}
            value={index}
            onClick={() => onChangeDayDelta(index)}
          >
            {new Date(items[0].dt * 1000).toLocaleDateString()}
          </Button>
        ))}
      </Stack>
    </>
  );
};
