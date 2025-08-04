import { projects } from "@/data/projects";
import { Card, Badge, Text, Stack } from "stoop";
import Image from "next/image";

export function Projects() {
  return (
    <Stack>
      <Stack
        style={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",

          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        direction="row"
        gap="medium"
      >
        {projects.map((project, index) => (
          <Stack key={index} css={{
            width: "33%",
            flexShrink: 0,
            scrollSnapAlign: "start",
          }}>
          <Card
            key={index}
           padding="minimal"
           css={{
            padding: 0,
            border: 0
           }}
          >
            <Stack css={{
              height: "20rem",
              width: "100%",
              position: "relative", 
              img: {
                objectFit: "cover",
                objectPosition: "center",
                height: "100%",
                width: "100%",
              }
            }}>
                <Image src="https://cdn.prod.website-files.com/6450bd5a51a4509928f3d530/6560d086fbb07020b486cb65_Studio-Kiln-Alexander-Brand-Identity-App-Genre-Characters.png" alt={project.title} fill />
            </Stack>
            <Stack css={{
              padding: "$medium"
            }}>

              <Text as="h5">
                {project.title}
              </Text>
              <Text
                as="small"
              >
                {project.description}
              </Text>
                <Stack direction="row" gap="small" top="small">
                {project.tags.map((tag, i) => (
                  <Badge key={i}>
                      {tag}
                  </Badge>
                    ))}
                </Stack>
              </Stack>
          </Card>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
} 