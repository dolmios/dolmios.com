// type project inline
export const projects: {
    description: string;
    tags: string[];
    title: string;
    variant: "landscape" | "portrait";
}[] = [
    {
        title: "Financial Dashboard",
        description: "Interactive analytics platform for enterprise clients with real-time data visualization and reporting tools.",
        tags: ["React", "TypeScript", "D3.js", "API"],
        variant: "landscape",
    },
    {
        title: "E-commerce Marketplace",
        description: "Modern shopping experience with AI-powered recommendations and seamless checkout process.",
        tags: ["Next.js", "Redux", "Stripe", "MongoDB"],
        variant: "portrait",
    },
    {
        title: "Healthcare Portal",
        description: "Patient management system with HIPAA compliance and secure data exchange protocols.",
        tags: ["React", "Node.js", "PostgreSQL", "Auth"],
        variant: "landscape",
    },
    {
        title: "Real Estate Platform",
        description: "Property listings with virtual tour integration and neighborhood analytics.",
        tags: ["Vue.js", "Express", "Google Maps", "AWS"],
        variant: "portrait",
    },
    {
        title: "Educational App",
        description: "Interactive learning platform for remote education with progress tracking and gamification.",
        tags: ["React Native", "Firebase", "GraphQL"],
        variant: "portrait",
    },
    {
        title: "Community Forum",
        description: "Scalable discussion platform with realtime features and content moderation tools.",
        tags: ["Next.js", "Socket.io", "Redis", "Docker"],
        variant: "landscape",
    }
]