"use client";

import { useMemo, useState, type JSX } from "react";
import { Select, Stack } from "stoop-ui";

import type { Matchbook as MatchbookType } from "@/db/schema";

import { Matchbook } from "@/app/matchbooks/components/Matchbook";

const ALL_OPTION_VALUE = "";

export function Filters({ matchbooks }: { matchbooks: MatchbookType[] }): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();

  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(
        matchbooks.map((m) => m.country).filter((country): country is string => Boolean(country)),
      ),
    ).sort();

    return [
      { label: "All Countries", value: ALL_OPTION_VALUE },
      ...uniqueCountries.map((country) => ({
        label: country,
        value: country,
      })),
    ];
  }, [matchbooks]);

  const states = useMemo(() => {
    if (!selectedCountry) return [];
    const countryMatchbooks = matchbooks.filter((m) => m.country === selectedCountry);
    const hasStates = countryMatchbooks.some((m) => m.state);

    if (!hasStates) return [];

    const uniqueStates = Array.from(
      new Set(
        countryMatchbooks.map((m) => m.state).filter((state): state is string => Boolean(state)),
      ),
    ).sort();

    return [
      { label: "All States", value: ALL_OPTION_VALUE },
      ...uniqueStates.map((state) => ({
        label: state,
        value: state,
      })),
    ];
  }, [matchbooks, selectedCountry]);

  const filteredMatchbooks = useMemo(() => {
    return matchbooks.filter((matchbook) => {
      if (selectedCountry && matchbook.country !== selectedCountry) return false;
      if (selectedState && matchbook.state !== selectedState) return false;
      return true;
    });
  }, [matchbooks, selectedCountry, selectedState]);

  const handleCountryChange = (value: string): void => {
    setSelectedCountry(value === ALL_OPTION_VALUE ? undefined : value);
    setSelectedState(undefined);
  };

  const handleStateChange = (value: string): void => {
    setSelectedState(value === ALL_OPTION_VALUE ? undefined : value);
  };

  return (
    <Stack direction="column" gap="large">
      <Stack
        css={{
          bottom: "$medium",
          gap: "$medium",
          left: "$medium",
          position: "fixed",
          zIndex: 1000,
        }}
        direction="row"
        wrap>
        <Stack>
          <Select
            options={countries}
            placeholder="Country"
            value={selectedCountry}
            onSelection={handleCountryChange}
          />
        </Stack>
        {states.length > 0 && (
          <Stack>
            <Select
              options={states}
              placeholder="State"
              value={selectedState}
              onSelection={handleStateChange}
            />
          </Stack>
        )}
      </Stack>
      <Stack
        css={{
          desktop: {
            gridTemplateColumns: "repeat(5, 1fr)",
          },
          display: "grid",
          gap: "$medium",
          gridTemplateColumns: "repeat(3, 1fr)",
          mobile: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
        }}>
        {filteredMatchbooks.map((matchbook: MatchbookType) => (
          <Matchbook key={matchbook.id} matchbook={matchbook} />
        ))}
      </Stack>
    </Stack>
  );
}
