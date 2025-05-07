import { type CSS } from "@stitches/react";
import { useEffect, useState, useRef, type JSX } from "react";

import { styled, keyframes } from "../stitches.config";

import { Box } from "./Box";
import { Grid } from "./Grid";
import { Tag } from "./Tag";
import { Text } from "./Text";

interface ClockProps {
  css?: CSS;
}

// Add a subtle pulse animation for the clock center
const pulse = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.1)' },
  '100%': { transform: 'scale(1)' }
});

// Simple clock face with clean design
const ClockFace = styled("div", {
  width: "100%",
  height: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  aspectRatio: "1/1",
  borderRadius: "50%",
  backgroundColor: "$background",
  border: "1px solid $border",
  padding: "8px",
  boxShadow: "$1",
});

const ClockCenter = styled("div", {
  position: "absolute",
  width: "8px",
  height: "8px",
  backgroundColor: "$text",
  borderRadius: "50%",
  zIndex: 10,
  animation: `${pulse} 2s ease-in-out infinite`,
});

const ClockHand = styled("div", {
  position: "absolute",
  bottom: "50%",
  left: "50%",
  transformOrigin: "bottom center",
  borderRadius: "2px",
  transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  
  variants: {
    type: {
      hour: {
        width: "3px",
        height: "22%",
        marginLeft: "-1.5px",
        backgroundColor: "$text",
      },
      minute: {
        width: "2px",
        height: "30%",
        marginLeft: "-1px",
        backgroundColor: "$text",
      },
      second: {
        width: "1px",
        height: "35%",
        marginLeft: "-0.5px",
        backgroundColor: "$text",
        transition: "none", // No transition for smooth continuous movement
      },
    },
  },
});

const ClockContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  maxWidth: "150px",
  margin: "0 auto",
});

const DigitalTime = styled("div", {
  marginTop: "$2",
  fontSize: "12px",
  fontFamily: "monospace",
  letterSpacing: "0.5px",
  color: "$text",
  opacity: 0.8,
});

export function AnalogClock({ css }: ClockProps): JSX.Element {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number | null>(null);
  
  // Set up the animation loop to update the clock
  useEffect(() => {
    const updateClock = (): void => {
      setTime(new Date());
      requestRef.current = requestAnimationFrame(updateClock);
    };
    
    requestRef.current = requestAnimationFrame(updateClock);
    
    // Clean up animation frame on unmount
    return (): void => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Calculate the rotation angles for the clock hands
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  
  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
  const hoursRotation = ((hours + minutes / 60) / 12) * 360;
  
  // Format time for digital display
  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return (
    <Box border css={css}>
      <Text
        as="h2"
        css={{
          fontSize: "14px",
          fontWeight: "normal",
          textTransform: "uppercase",
          margin: 0,
          padding: "$2 $3",
          borderBottom: "1px solid $border",
        }}>
        Time
      </Text>
      <Grid css={{ padding: "$3" }}>
        <ClockContainer>
          <ClockFace>
            <ClockCenter />
            <ClockHand 
              css={{ transform: `rotate(${hoursRotation}deg)` }} 
              type="hour" 
            />
            <ClockHand 
              css={{ transform: `rotate(${minutesRotation}deg)` }} 
              type="minute" 
            />
            <ClockHand 
              css={{ transform: `rotate(${secondsRotation}deg)` }} 
              type="second" 
            />
          </ClockFace>
          <DigitalTime>{formattedTime}</DigitalTime>
          <Grid css={{ display: "flex", justifyContent: "center", marginTop: "$2" }}>
            <Tag small>Queens, NY</Tag>
          </Grid>
        </ClockContainer>
      </Grid>
    </Box>
  );
} 