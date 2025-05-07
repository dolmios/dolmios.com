'use client';

import Image from "next/image";
import { type JSX } from "react";

import { useSong } from "../hooks/useSong";
import { useWaves } from "../hooks/useWaves";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Typography } from "../ui/Typography";
import { Block } from "@/ui";

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
      <Card border header="Currently Listening" css={{ position: 'relative', overflow: 'hidden' }}>
        <Typography css={{ opacity: 0.7, textAlign: 'center', padding: 'var(--space-3)' }}>Loading song data...</Typography>
      </Card>
    );
  }
  if (error || !trackName || !trackArtist) return <></>;

  return (
    <Card border header="Currently Listening" css={{ position: 'relative', overflow: 'hidden' }}>
      {/* Waves absolutely positioned at the bottom, behind content */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>{waves}</div>
      <Block direction="row" align="center" justify="between" css={{ position: 'relative', zIndex: 2, minHeight: 80 }}>
        {/* Album Art and Track Info */}
        <Block direction="row" gap={3} align="center" css={{ flex: 1, minWidth: 0 }}>
          {trackCoverRaw && (
            <div style={{ width: 60, height: 60, minWidth: 60, minHeight: 60, borderRadius: 8, overflow: 'hidden', background: dominantColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                alt={`${trackName} by ${trackArtist}`}
                src={trackCover || trackCoverRaw}
                width={60}
                height={60}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          )}
          <Block css={{ minWidth: 0 }}>
            <Typography as="h6" bottom={1} css={{ fontSize: 20, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {trackName}
            </Typography>
            <Typography as="p" css={{ opacity: 0.7, fontSize: 16, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {trackArtist}
            </Typography>
          </Block>
        </Block>
        {/* Button on the right */}
        {fallbackURL && (
          <Tag bold small css={{ whiteSpace: "nowrap", marginLeft: 'var(--space-3)', fontSize: 18, padding: '8px 18px', borderRadius: 8, fontWeight: 500 }}>
            <a 
              href={fallbackURL} 
              rel="noopener noreferrer" 
              target="_blank"
            >
              View on Last.fm
            </a>
          </Tag>
        )}
      </Block>
    </Card>
  );
}
