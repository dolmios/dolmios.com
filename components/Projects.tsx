import { type CSS } from "@stitches/react";
import Image from "next/image";
import { type JSX } from "react";

import gradient from "../public/gradient.svg";
import { styled } from "../stitches.config";

import { Box } from "./Box";
import { Grid } from "./Grid";
import { Tag } from "./Tag";
import { Text } from "./Text";

interface ProjectProps {
  css?: CSS;
  description: string;
  tags: string[];
  title: string;
  variant?: "portrait" | "landscape";
}

const ProjectsContainer = styled("div", {
  display: "flex",
  overflowX: "auto",
  width: "100%",
  scrollSnapType: "x mandatory",
  gap: "$3",
  padding: "$3",
  paddingBottom: "$4",
  scrollBehavior: "smooth",
  
  // Hide scrollbar but keep functionality
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },

  // Force scrolling by making content wider than container
  '&::after': {
    content: '""',
    paddingRight: '1px',
    flexShrink: 0
  }
});

const ImageContainer = styled("div", {
  width: "100%",
  position: "relative",
  marginBottom: "$3",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  height: "250px", // Consistent height for all variants
});

const TagContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "$2",
  marginTop: "$3",
});

function Project({ title, description, tags, variant = "landscape", css }: ProjectProps): JSX.Element {
  return (
    <Box 
      css={{ 
        width: variant === "portrait" ? "300px" : "420px",
        height: "auto",
        scrollSnapAlign: "start",
        marginRight: "$3",
        padding: 0,
        flexShrink: 0,
        "&:last-child": {
          marginRight: "$3", // Keep margin on last item to force scrolling
        },
        ...css
      }}
    >
      <ImageContainer>
        <Image 
          alt={title} 
          fill
          priority
          src={gradient}
          style={{ objectFit: "cover", opacity: 0.7 }}
        />
      </ImageContainer>
      <Grid css={{ padding: "$3", position: "relative", zIndex: 1 }}>
        <Text as="h3" css={{ fontSize: "18px", fontWeight: "500", marginBottom: "$2" }}>
          {title}
        </Text>
        <Text as="p" css={{ 
          opacity: 0.7, 
          marginBottom: "$3", 
          fontSize: "14px", 
          lineHeight: 1.5,
          height: "63px", // Fixed height for description (3 lines * 14px * 1.5)
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
        }}>
          {description}
        </Text>
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag key={index} small>{tag}</Tag>
          ))}
        </TagContainer>
      </Grid>
    </Box>
  );
}

export function Projects({ css }: { css?: CSS }): JSX.Element {
  // Keep all projects to ensure we have enough for scrolling
  const projects = [
    {
      title: "Financial Dashboard",
      description: "Interactive analytics platform for enterprise clients with real-time data visualization and reporting tools.",
      tags: ["React", "TypeScript", "D3.js", "API"],
      variant: "landscape" as const,
    },
    {
      title: "E-commerce Marketplace",
      description: "Modern shopping experience with AI-powered recommendations and seamless checkout process.",
      tags: ["Next.js", "Redux", "Stripe", "MongoDB"],
      variant: "portrait" as const,
    },
    {
      title: "Healthcare Portal",
      description: "Patient management system with HIPAA compliance and secure data exchange protocols.",
      tags: ["React", "Node.js", "PostgreSQL", "Auth"],
      variant: "landscape" as const,
    },
    {
      title: "Real Estate Platform",
      description: "Property listings with virtual tour integration and neighborhood analytics.",
      tags: ["Vue.js", "Express", "Google Maps", "AWS"],
      variant: "portrait" as const,
    },
    {
      title: "Educational App",
      description: "Interactive learning platform for remote education with progress tracking and gamification.",
      tags: ["React Native", "Firebase", "GraphQL"],
      variant: "portrait" as const,
    },
    {
      title: "Community Forum",
      description: "Scalable discussion platform with realtime features and content moderation tools.",
      tags: ["Next.js", "Socket.io", "Redis", "Docker"],
      variant: "landscape" as const,
    }
  ];

  return (
    <Box border css={{ 
      padding: 0, 
      overflow: "hidden",
      position: "relative",
      height: "auto",
      ...css 
    }}>
      <Text 
        as="h2"
        css={{ 
          fontSize: "14px", 
          fontWeight: "normal", 
          textTransform: "uppercase", 
          margin: 0,
          padding: "$2 $3",
          borderBottom: "1px solid $border"
        }}>
        Selected Projects
      </Text>

      <ProjectsContainer>
        {projects.map((project, index) => (
          <Project 
            key={index} 
            description={project.description} 
            tags={project.tags} 
            title={project.title}
            variant={project.variant}
          />
        ))}
      </ProjectsContainer>
    </Box>
  );
} 