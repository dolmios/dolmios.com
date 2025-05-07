import { type CSS } from "@stitches/react";
import Image from "next/image";
import { type JSX } from "react";

import { useSong } from "../hooks/useSong";
import { styled, keyframes } from "../stitches.config";

import { Box } from "./Box";
import { Grid } from "./Grid";
import { Tag } from "./Tag";
import { Text } from "./Text";

// Create moderate ripple animations with balanced height variations
const rippleAnimation1 = keyframes({
  '0%': { transform: 'scaleY(1.0)' },
  '50%': { transform: 'scaleY(1.2)' },
  '100%': { transform: 'scaleY(1.0)' }
});

const rippleAnimation2 = keyframes({
  '0%': { transform: 'scaleY(1.0)' },
  '50%': { transform: 'scaleY(1.3)' },
  '100%': { transform: 'scaleY(1.0)' }
});

const WaveContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '50px', // Medium height
  overflow: 'hidden',
  zIndex: 1 // Ensure waves stay in background
});

const Wave = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '50px', // Medium height
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'cover',
  transformOrigin: 'center bottom',
  
  variants: {
    animation: {
      one: { animation: `${rippleAnimation1} 4s ease-in-out infinite` },
      two: { animation: `${rippleAnimation2} 5s ease-in-out infinite` }
    },
    speed: {
      slow: { animationDuration: '5s' },
      medium: { animationDuration: '4s' }
    },
    pattern: {
      one: { animationDelay: '0s' },
      two: { animationDelay: '2.5s' }
    }
  },
  
  defaultVariants: {
    speed: 'medium',
    pattern: 'one',
    animation: 'one'
  }
});

export function Song({ css }: { css?: CSS }): JSX.Element {
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

  // If there's an error with the Last.fm API, return empty fragment
  if (loading) return <Box border css={{ padding: "$3", ...css }}><Text>Loading song data...</Text></Box>;
  if (error) return <></>;
  
  // Only proceed if we have basic track information
  if (!trackName || !trackArtist) return <></>;

  // Create SVG wave with balanced sine patterns
  const getWaveWithColor = (waveType: 'low' | 'medium', color: string, opacity: number = 1) => {
    // Balanced wave paths with moderate ripples
    let wavePath = "";
    
    if (waveType === 'medium') {
      // Medium frequency wave with moderate variation
      wavePath = "M0,50 C100,35 200,25 300,35 C400,45 500,30 600,35 C700,40 800,25 900,35 C1000,45 1100,30 1200,35 L1200,50 L0,50 Z";
    } else {
      // Low frequency, gentle waves
      wavePath = "M0,50 C200,30 400,25 600,30 C800,35 1000,25 1200,30 L1200,50 L0,50 Z";
    }
    
    // Create the SVG with embedded color and opacity
    return `url("data:image/svg+xml,%3Csvg width='1200' height='50' viewBox='0 0 1200 50' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='${wavePath}' fill='${encodeURIComponent(color)}' opacity='${opacity}'/%3E%3C/svg%3E")`;
  };

  // Use the color from the hook, which is now optimized for dark mode
  const waveColor = dominantColor || 'rgb(80,140,200)';

  return (
    <Box border css={{ padding: 0, position: 'relative', overflow: 'hidden', ...css }}>
      {/* Position waves as background at bottom */}
      <WaveContainer>
        <Wave 
          animation="one"
          css={{ 
            backgroundImage: getWaveWithColor('medium', waveColor, 0.2),
            bottom: 0
          }}
          pattern="one" 
        />
        <Wave 
          animation="two"
          css={{ 
            backgroundImage: getWaveWithColor('low', waveColor, 0.15),
            bottom: 0
          }}
          pattern="two" 
        />
      </WaveContainer>

      <Text
        as="h2"
        css={{
          fontSize: "14px",
          fontWeight: "normal",
          textTransform: "uppercase",
          margin: 0,
          padding: "$2 $3",
          borderBottom: "1px solid $border",
          position: 'relative',
          zIndex: 2
        }}>
        Currently Listening
      </Text>

      <Grid
        css={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "$3",
          alignItems: "center",
          padding: "$3",
          position: 'relative',
          zIndex: 2 // Ensure content stays above waves
        }}>
        {trackCoverRaw && (
          <Box css={{ 
            padding: '$2',
            position: 'relative',
            overflow: 'hidden',
           backgroundColor: dominantColor
          }}>
            <Image
              alt={`${trackName} by ${trackArtist}`}
              height={30}
              src={trackCover || trackCoverRaw}
              style={{ 
                objectFit: "cover",
                width: '100%',
                height: '100%'
              }}
              width={30}
            />
          </Box>
        )}

        <Grid css={{ display: "flex", flexDirection: "column", gap: "$1" }}>
          <Text as="h3" css={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>
            {trackName}
          </Text>
          <Text css={{ opacity: 0.7, margin: 0, fontSize: "14px" }}>
            {trackArtist}
          </Text>
        </Grid>

        {fallbackURL && (
          <Tag css={{ 
            height: "fit-content", 
            justifySelf: "end",
            transition: "opacity 0.2s ease",
            "&:hover": {
              opacity: 0.85
            }
          }}>
            <a 
              href={fallbackURL} 
              rel="noopener noreferrer" 
              target="_blank"
            >
              View on Last.fm
            </a>
          </Tag>
        )}
      </Grid>
    </Box>
  );
}
