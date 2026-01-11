"use client";

import { useMemo, useState, type JSX } from "react";
import { Select, Stack } from "stoop-ui";

import type { Matchbook as MatchbookType } from "@/db/schema";

import { Matchbook } from "@/app/matchbooks/components/Matchbook";

type MatchbookWithBlur = MatchbookType & {
  primaryBlurDataURL: string;
  secondaryBlurDataURL: string;
};

export function Filters({ matchbooks }: { matchbooks: MatchbookWithBlur[] }): JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [selectedState, setSelectedState] = useState<string | undefined>();

  // Extract unique countries
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(
        matchbooks.map((m) => m.country).filter((country): country is string => Boolean(country)),
      ),
    ).sort();

    return uniqueCountries.map((country) => ({
      label: country,
      value: country,
    }));
  }, [matchbooks]);

  // Extract unique states for selected country
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

    return uniqueStates.map((state) => ({
      label: state,
      value: state,
    }));
  }, [matchbooks, selectedCountry]);

  // Filter matchbooks based on selections
  const filteredMatchbooks = useMemo(() => {
    return matchbooks.filter((matchbook) => {
      if (selectedCountry && matchbook.country !== selectedCountry) return false;
      if (selectedState && matchbook.state !== selectedState) return false;

      return true;
    });
  }, [matchbooks, selectedCountry, selectedState]);

  // Reset state when country changes
  const handleCountryChange = (value: string, _label: string): void => {
    setSelectedCountry(value);
    setSelectedState(undefined);
  };

  const handleStateChange = (value: string, _label: string): void => {
    setSelectedState(value);
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
        {filteredMatchbooks.map((matchbook: MatchbookWithBlur) => (
          <Matchbook key={matchbook.id} matchbook={matchbook} />
        ))}
      </Stack>
    </Stack>
  );
}
