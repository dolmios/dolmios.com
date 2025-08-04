"use client";

import Link from "next/link";
import { type JSX, useState, useEffect } from "react";

import { Button, Card, Section, Select, Stack, Text, useTheme, useBreakpoints, Menu } from "stoop";

export function Header(): JSX.Element {
  const { isSmall } = useBreakpoints();

  const menu = [
    {
      label: "Contact",
      href: "mailto:contact@dolmios.com"
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile"
    },  
    {
      label: "GitHub",
      href: "https://github.com/yourusername"
    },
    {
      label: "Instagram",
      href: "https://instagram.com/yourhandle"
    }
  ]

    return (

      
      <Section top="medium" bottom="medium" wide as="header">
        <Stack direction="row" align="center" alignContent="center" justify="between" wrap={false}
       >
        <Stack>
          <Card padding="small">
        <Stack direction="row" align="center" gap="small">
            <img src="/favicon.ico" width={28} height={28} />
            <Link
              href="/">
              
              <Text as='h6' css={{
                paddingBottom: 0
              }}>
                    Jackson Dolman
              </Text>
         
            </Link>
        </Stack>
          </Card>
          </Stack>
              
        <Stack direction="row" alignContent="center" justify="end" gap="small">
          {isSmall ? (
         <Menu trigger={<Button size="small" variant="secondary">Menu</Button>}
         options={menu.map((item) => ({
          label: item.label,
          value: item.href
         }))}
         onSelection={(value) => {
          window.open(value, '_blank');
         }}
         /> 
          ) : (
            menu.map((item) => (
              <Link href={item.href} rel="noopener noreferrer" target="_blank"><Button size="small" variant="secondary">{item.label}</Button></Link>
            ))
          )}
            
        </Stack>
        </Stack>
      </Section>
  );
} 