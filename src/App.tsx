import { useState } from "react";
import { capitalizeFirst } from "./utils/string";
import { CITIES } from "./weather/constants";
import { City } from "./weather/types";
import { Footer } from "./weather/components/Footer";
import { useCurrentWeather } from "./weather/hooks";
import { kelvinToCelsius } from "./weather/units";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { MainInfo } from "./weather/components/MainInfo";
import { MainInfoSkeleton } from "./weather/components/MainInfoSkeleton";
import { ForecastTable } from "./weather/components/ForecastTable";

function App() {
  const [cityId, setCityId] = useState<number>();
  const [isForecastVisible, setIsForecastVisible] = useState<boolean>(false);

  const [forecastDayDelta, setForecastDayDelta] = useState<number>(0);

  const { data: weatherData, isLoading: isWeatherLoading } = useCurrentWeather({
    cityId,
  });

  return (
    <>
      <Stack sx={{ minHeight: "100vh", minWidth: 1280 }}>
        <Stack sx={{ my: 4, mx: "auto", width: 1280, px: 2 }} spacing={3}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Weather forecast
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 80 }}>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                id="city-select"
                labelId="city-label"
                label="City"
                onChange={(e) => setCityId(e.target.value as number)}
                value={cityId}
              >
                {CITIES.map((city: City) => (
                  <MenuItem value={city.id} key={city.id}>
                    {city.name}, {city.country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {isWeatherLoading ? (
            <>
              <MainInfoSkeleton />
              <MainInfoSkeleton />
            </>
          ) : (
            !!weatherData && (
              <>
                <MainInfo
                  heading={weatherData.weather[0].main}
                  subheading={capitalizeFirst(
                    weatherData.weather[0].description
                  )}
                />
                <MainInfo
                  heading={`${kelvinToCelsius(weatherData.main.temp)} ℃`}
                  subheading={`Wind ${weatherData.main.speed} m/sec`}
                />
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setIsForecastVisible(!isForecastVisible)}
                  >
                    {!isForecastVisible ? "See forecast" : "Close"}
                  </Button>
                </Box>
              </>
            )
          )}
          {!!isForecastVisible && !!cityId && (
            <ForecastTable
              cityId={cityId}
              dayDelta={forecastDayDelta}
              onChangeDayDelta={(delta) => setForecastDayDelta(delta)}
            />
          )}
        </Stack>
        <Footer />
      </Stack>
    </>
  );
}

export default App;
