import { type JSX } from "react";
import { Block, Tag } from "../ui";
import styles from "./Footer.module.css";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <Block className={styles.container}>
        <Tag css={{ background: 'transparent', border: 'none', boxShadow: 'none', color: 'var(--text)' }} small>
          © {currentYear} Jackson Dolman
        </Tag>
      </Block>
    </footer>
  );
} 