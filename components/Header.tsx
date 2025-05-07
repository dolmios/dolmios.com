'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type JSX } from "react";

import { Typography } from "../ui";
import styles from "./Header.module.css";

export function Header(): JSX.Element {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const nameStyles = {
    fontSize: "80px",
    fontWeight: "bold",
    lineHeight: 0.9,
    margin: 0,
    whiteSpace: "nowrap",
    width: "100%",
  };
  
  return (
    <header className={styles.container}>
      <div className={styles.divider} />
      
      <div className={styles.nameRow}>
        {isHomePage ? (
          <Link href="/" className={styles.homeLink}>
            <Typography as="h1" css={nameStyles}>
              <div className={styles.nameContainer}>
                <span className={styles.nameText}>Jackson Dolman</span>
                <span className={styles.homeText}>dolmios</span>
              </div>
            </Typography>
          </Link>
        ) : (
          <Link href="/" className={styles.homeLink}>
            <Typography as="h1" css={nameStyles}>
              <div className={styles.nameContainer}>
                <span className={styles.nameText}>Jackson Dolman</span>
                <span className={styles.homeText}>
                  ☜
                  back to dashboard
                </span>
              </div>
            </Typography>
          </Link>
        )}
      </div>
      
      <div className={styles.contactRow}>
        <div className={styles.contactGroup}>
          <Typography>Inquiries →</Typography>
          <Link href="mailto:contact@dolmios.com">Email</Link>
        </div>
        
        <div className={styles.socialLinks}>
          <Link href="/matchbooks">Matchbooks</Link>
          <Link href="https://linkedin.com/in/yourprofile" rel="noopener noreferrer" target="_blank">LinkedIn</Link>
          <Link href="https://github.com/yourusername" rel="noopener noreferrer" target="_blank">GitHub</Link>
          <Link href="https://instagram.com/yourhandle" rel="noopener noreferrer" target="_blank">Instagram</Link>
        </div>
      </div>
      
      <div className={styles.divider} />
    </header>
  );
} 