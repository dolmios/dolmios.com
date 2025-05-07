'use client';

import { useEffect, useState, useRef, type JSX } from "react";
import { Card, Block, Tag, Typography } from "../ui";
import styles from "./AnalogClock.module.css";

export function AnalogClock(): JSX.Element {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    const updateClock = (): void => {
      setTime(new Date());
      requestRef.current = requestAnimationFrame(updateClock);
    };
    
    requestRef.current = requestAnimationFrame(updateClock);
    
    return (): void => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  
  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
  const hoursRotation = ((hours + minutes / 60) / 12) * 360;
  
  const formattedTime = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return (
    <Card border header="Time">
      <div className={styles.clockContainer}>
        <div className={styles.clockFace}>
          <div className={styles.clockCenter} />
          <div 
            className={styles.hourHand}
            style={{ transform: `rotate(${hoursRotation}deg)` }}
          />
          <div 
            className={styles.minuteHand}
            style={{ transform: `rotate(${minutesRotation}deg)` }}
          />
          <div 
            className={styles.secondHand}
            style={{ transform: `rotate(${secondsRotation}deg)` }}
          />
        </div>
        <div className={styles.digitalTime}>{formattedTime}</div>
        <Block css={{ display: "flex", justifyContent: "center", marginTop: "var(--space-2)" }}>
          <Tag small>Queens, NY</Tag>
        </Block>
      </div>
    </Card>
  );
} 