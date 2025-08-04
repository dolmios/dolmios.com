'use client';

import Image from "next/image";
import { type JSX } from "react";

import { useSong } from "../hooks/useSong";
import { useWaves } from "../hooks/useWaves";
import { Card, Text, Badge, Stack, Button } from "stoop";


export function Song(): JSX.Element {
  const {
    fallbackURL,
    trackArtist,
    trackCover,
    trackCoverRaw,
    trackName,
    loading,
    error,
    dominantColor,
  } = useSong();

  const waveColor = dominantColor || 'rgb(80,140,200)';
  const waves = useWaves(waveColor);

  if (loading) {
    return (
      <Card variant="default" css={{ position: 'relative', overflow: 'hidden' }}>
        <Text css={{ opacity: 0.7, textAlign: 'center', padding: 'var(--space-3)' }}>Loading song data...</Text>
      </Card>
    );
  }
  if (error || !trackName || !trackArtist) return <></>;

  return (
      <Card variant="default" css={{ position: 'relative', overflow: 'hidden' }}>
      {/* Waves absolutely positioned at the bottom, behind content */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, pointerEvents: 'none' }}>{waves}</div>

      <Stack direction="row" gap="medium" align="center" justify="between" css={{ position: 'relative', zIndex: 2 }}>
    
        {/* Album Art and Track Info */}
        <Stack direction="row" gap="medium" align="center">
          {trackCoverRaw && (
          
              <Image
                alt={`${trackName} by ${trackArtist}`}
                height={60}
                src={trackCover || trackCoverRaw}

                width={60}
              />
          )}
            <Stack>
              <Text as="h6" bottom="smaller">
              {trackName}
            </Text>
            <Text as="p" css={{
              paddingBottom: 0
            }}>
              {trackArtist}
            </Text>
          </Stack>
        </Stack>
        {/* Button on the right */}
        {fallbackURL && (
              <Button size="small">
            <a 
              href={fallbackURL} 
              rel="noopener noreferrer" 
              target="_blank"
            >
              View on Last.fm
            </a>
          </Button>
        )}
        </Stack>
    </Card>
  );
}
