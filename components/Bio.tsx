import { Card, Text, Badge } from "stoop";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useState, useEffect } from "react";

export default function Bio() {
    const [nycTime, setNycTime] = useState(new Date());
    // ensure timezone offset so its ALWAYS nyc time
    useEffect(() => {
        const interval = setInterval(() => {
            setNycTime(new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
  return (
      <Card variant="default">
          <Text as="h1">Full-Stack Developer based in New York.</Text>
          <Text as="p" css={{
            fontSize: '19px'
          }}>
              <Balancer>I build things and lead teams that build things. Currently working in the proptech space as engineering lead at <a href="https://consolia.io"><img src="https://consolia.io/favicon.ico" width={20} height={20} />  Consolia</a>, co-founder at <a href="https://cosmogroup.io"><img src="https://cosmogroup.io/favicon.ico" width={20} height={20} /> Cosmo</a>, and working on <a href="https://airindex.app"><img src="https://airindex.app/favicon.ico" width={20} height={20} /> AirIndex</a> in my spare time. I'm drawn to projects where technology serves a clear purpose—whether that's architecting web applications from the ground up or scaling existing systems to handle real growth.</Balancer>
          </Text>
          <Text as="h4" css={{
            transform: "rotate(-90deg)",
            position: "absolute",
            top: 0,
            right: '-8rem',
            bottom: 0,
          }}>
           {nycTime.toLocaleTimeString("en-US", { timeZone: "America/New_York" })}
          </Text>
      </Card>
  );
}