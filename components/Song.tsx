'use client';

import Image from "next/image";
import { type JSX } from "react";

import { Button, Card, Stack, Text } from "@/ui";

import { useSong } from "../hooks/useSong";
import { useWaves } from "../hooks/useWaves";

export function Song(): JSX.Element {
  const {
    dominantColor,
    error,
    fallbackURL,
    loading,
    trackArtist,
    trackCover,
    trackCoverRaw,
    trackName,
  } = useSong();

  const waveColor = dominantColor || 'rgb(80,140,200)';
  const waves = useWaves(waveColor);

  if (loading) {
    return (
      <Card css={{ overflow: 'hidden', position: 'relative' }}>
        <Text css={{ fontSize: '0.875rem', opacity: 0.7, textAlign: 'center' }}>Loading song data...</Text>
      </Card>
    );
  }
  if (error || !trackName || !trackArtist) return null;

  return (
      <Card css={{ overflow: 'hidden', position: 'relative' }}>
      {/* Waves absolutely positioned at the bottom, behind content */}
      <div style={{ bottom: 0, left: 0, pointerEvents: 'none', position: 'absolute', right: 0, top: 0 }}>{waves}</div>

      <Stack align="center" css={{ position: 'relative', zIndex: 2 }} direction="row" gap="medium" justify="between">

        {/* Album Art and Track Info */}
        <Stack align="center" direction="row" gap="medium">
          {trackCoverRaw && (
              <div style={{ borderRadius: '8px', flexShrink: 0, overflow: 'hidden' }}>
                <Image
                  alt={`${trackName} by ${trackArtist}`}
                  height={48}
                  src={trackCover || trackCoverRaw}
                  width={48}
                />
              </div>
          )}
            <Stack css={{ gap: '$smaller' }}>
              <Text as="small" css={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>
              {trackName}
            </Text>
            <Text as="small" css={{ fontSize: '0.75rem', margin: 0, opacity: 0.6 }}>
              {trackArtist}
            </Text>
          </Stack>
        </Stack>
        {/* Button on the right */}
        {fallbackURL && (
              <Button
                as="a"
                href={fallbackURL}
                rel="noopener noreferrer"
                size="small"
                target="_blank"
                variant="minimal"
              >
                Listen
              </Button>
        )}
        </Stack>
    </Card>
  );
}
