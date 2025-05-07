import { type CSS } from "@stitches/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type JSX } from "react";

import { styled } from "../stitches.config";

import { Text } from "./Text";

interface HeaderProps {
  css?: CSS;
}

const HeaderContainer = styled("header", {
  width: "100%",
  marginBottom: "$4",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

const Divider = styled("div", {
  borderTop: "1px solid $border",
  width: "100%",
  margin: "$2 0",
});

const NameRow = styled("div", {
  width: "100%",
  margin: "$2 0",
});

const HomeLink = styled("a", {
  textDecoration: "none",
  color: "inherit",
  display: "inline-block",
  position: "relative",
  width: "100%",
});

const NameContainer = styled("div", {
  position: "relative",
  overflow: "hidden",
  whiteSpace: "nowrap",
  
  "@media (max-width: 768px)": {
    whiteSpace: "normal",
  },
});

const NameText = styled("span", {
  display: "inline-block",
  transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
  transformOrigin: "left",
  
  ".home-link:hover &": {
    transform: "translateY(-100%)",
    opacity: 0,
  },
});

const HomeText = styled("span", {
  position: "absolute",
  bottom: "-100%",
  left: 0,
  opacity: 0,
  transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
  transformOrigin: "left",
  width: "100%",
  
  ".home-link:hover &": {
    transform: "translateY(-100%)",
    opacity: 1,
  },
});

const ContactRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "$2",
  marginBottom: "$2",
  
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "$2",
  },
});

const ContactGroup = styled("div", {
  display: "flex",
  gap: "$2",
  alignItems: "center",
  
  "@media (max-width: 768px)": {
    justifyContent: "flex-start",
  },
});

const SocialLinks = styled("div", {
  display: "flex",
  gap: "$3",
});

export function Header({ css }: HeaderProps): JSX.Element {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const nameStyles = {
    fontSize: "80px",
    fontWeight: "bold",
    lineHeight: 0.9,
    margin: 0,
    whiteSpace: "nowrap",
    width: "100%",
    
    "@media (max-width: 768px)": {
      fontSize: "70px",
    },
  };
  
  return (
    <HeaderContainer css={css}>
      <Divider />
      
      <NameRow>
        {isHomePage ? (
          <Link href="/" legacyBehavior passHref>
            <HomeLink className="home-link">
              <Text as="h1" css={nameStyles}>
                <NameContainer>
                  <NameText>Jackson Dolman</NameText>
                  <HomeText>dolmios</HomeText>
                </NameContainer>
              </Text>
            </HomeLink>
          </Link>
        ) : (
          <Link href="/" legacyBehavior passHref>
            <HomeLink className="home-link">
              <Text as="h1" css={nameStyles}>
                <NameContainer>
                  <NameText>Jackson Dolman</NameText>
                  <HomeText>
                      ☜
                    back to dashboard</HomeText>
                </NameContainer>
              </Text>
            </HomeLink>
          </Link>
        )}
      </NameRow>
      
      <ContactRow>
        <ContactGroup>
          <Text>Inquiries →</Text>
          <Link href="mailto:contact@dolmios.com">Email</Link>
        </ContactGroup>
        
        <SocialLinks>
          <Link href="/matchbooks">Matchbooks</Link>
          <Link href="https://linkedin.com/in/yourprofile" rel="noopener noreferrer" target="_blank">LinkedIn</Link>
          <Link href="https://github.com/yourusername" rel="noopener noreferrer" target="_blank">GitHub</Link>
          <Link href="https://instagram.com/yourhandle" rel="noopener noreferrer" target="_blank">Instagram</Link>
        </SocialLinks>
      </ContactRow>
      
      <Divider />
    </HeaderContainer>
  );
} 