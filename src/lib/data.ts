import type { Project, BlogPost, Message } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image || { imageUrl: 'https://picsum.photos/seed/fallback/600/400', imageHint: 'fallback image' };
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'abstract-vortex',
    title: 'Abstract Vortex',
    category: '3D Art',
    description: 'A mesmerizing spiral of colors and shapes.',
    longDescription: '<p>Abstract Vortex is a piece that explores the relationship between color theory and motion. Created using Cinema 4D and rendered with Octane, it features a complex particle system that generates a swirling vortex of light. The goal was to create a sense of infinite depth and movement, drawing the viewer into the piece.</p><p>The color palette was carefully selected to evoke a sense of otherworldly wonder, shifting from cool blues to warm purples, with sparks of electric magenta. This project was a deep dive into procedural generation and lighting techniques.</p>',
    ...findImage('project-1'),
    publishedAt: '2023-10-26',
  },
  {
    id: '2',
    slug: 'cyber-cityscape',
    title: 'Cyber Cityscape',
    category: 'Environment Design',
    description: 'A sprawling metropolis of the future.',
    longDescription: '<p>Cyber Cityscape is a vision of a futuristic urban environment, inspired by cyberpunk aesthetics. The scene is packed with detail, from flying vehicles to holographic advertisements. Built in Blender and textured in Substance Painter, this project focused on world-building and atmospheric storytelling.</p><p>Lighting plays a crucial role, with neon glows reflecting off wet streets to create a moody, immersive atmosphere. The scale of the city is designed to feel both awe-inspiring and overwhelming.</p>',
    ...findImage('project-2'),
    publishedAt: '2023-09-15',
  },
  {
    id: '3',
    slug: 'android-sentinel',
    title: 'Android Sentinel',
    category: 'Character Design',
    description: 'A guardian of a forgotten digital realm.',
    longDescription: '<p>The Android Sentinel is a character concept for a personal sci-fi project. The design combines organic and mechanical elements to create a figure that is both powerful and elegant. Sculpted in ZBrush and rendered in Marmoset Toolbag, the focus was on creating a compelling silhouette and intricate surface details.</p><p>The materials tell a story of a weathered warrior, with a mix of polished chrome, matte carbon fiber, and glowing emissive parts. The pose is intended to convey a sense of calm readiness.</p>',
    ...findImage('project-3'),
    publishedAt: '2023-08-02',
  },
  {
    id: '4',
    slug: 'chrono-watch',
    title: 'Chrono Watch',
    category: 'Product Visualization',
    description: 'A sleek and modern timepiece concept.',
    longDescription: '<p>This project is a 3D visualization of a luxury watch concept, the "Chrono". The focus was on photorealistic rendering and material creation. Modeled in Fusion 360 for precision and rendered with Keyshot, every detail from the brushed metal casing to the sapphire crystal glass was meticulously crafted.</p><p>The goal was to create a series of marketing shots that highlight the watch\'s design and craftsmanship. Studio lighting setups were used to emphasize the form and material interaction.</p>',
    ...findImage('project-4'),
    publishedAt: '2023-07-21',
  },
  {
    id: '5',
    slug: 'cliffside-haven',
    title: 'Cliffside Haven',
    category: 'Architectural Visualization',
    description: 'A modern home integrated with nature.',
    longDescription: '<p>Cliffside Haven is an architectural visualization of a concept home perched on a rocky coast. The project showcases how modern architecture can coexist with the natural environment. Created with 3ds Max and V-Ray, with foliage from Quixel Megascans, the emphasis was on realistic lighting and natural textures.</p><p>The scene is rendered at sunset to capture the warm glow on the concrete and wood surfaces, and the dramatic play of light and shadow.</p>',
    ...findImage('project-5'),
    publishedAt: '2023-06-11',
  },
  {
    id: '6',
    slug: 'particle-dream',
    title: 'Particle Dream',
    category: 'Motion Graphics',
    description: 'An abstract exploration of particle flow.',
    longDescription: '<p>Particle Dream is a motion graphics piece created with Houdini. It explores the beauty of emergent patterns from simple rules governing a particle simulation. The particles are attracted to and repelled by various forces, creating a dance of light and color.</p><p>The final animation was rendered with Redshift and composited in After Effects to add glow and color grading, resulting in a hypnotic and ethereal visual experience.</p>',
    ...findImage('project-6'),
    publishedAt: '2023-05-29',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'the-art-of-3d-lighting',
    title: 'The Art of 3D Lighting',
    summary: 'A deep dive into how lighting can make or break your 3D scenes.',
    content: '<p>Lighting is one of the most critical aspects of 3D rendering. It sets the mood, defines the form, and guides the viewer\'s eye. In this post, we\'ll explore the fundamentals of 3-point lighting, the power of HDRI environments, and how to use volumetric lighting to create atmospheric and cinematic scenes. We will look at examples from Cinema 4D, Blender, and V-Ray to understand how different render engines handle light.</p>',
    ...findImage('blog-1'),
    publishedAt: '2023-11-05',
  },
  {
    id: '2',
    slug: 'procedural-texturing-with-substance',
    title: 'Procedural Texturing with Substance',
    summary: 'Unlocking infinite possibilities with node-based texturing.',
    content: '<p>Substance Designer has revolutionized the texturing workflow for many 3D artists. Instead of painting textures by hand, you can create complex, tileable, and highly customizable materials using a node-based interface. This article will walk you through the basics of creating your first procedural material, from generating base shapes to adding surface detail and weathering effects. We will show how to expose parameters to make your materials versatile for any project.</p>',
    ...findImage('blog-2'),
    publishedAt: '2023-10-18',
  },
  {
    id: '3',
    slug: 'mastering-hard-surface-modeling',
    title: 'Mastering Hard-Surface Modeling',
    summary: 'Techniques for creating clean and crisp mechanical models.',
    content: '<p>Hard-surface modeling is a discipline that requires precision and a good understanding of topology. This post covers essential techniques for creating clean and detailed models of mechanical objects, from sci-fi robots to realistic products. We will discuss the importance of support loops, the use of booleans and bevels, and strategies for managing complex geometry. Examples will be shown in Blender and Fusion 360.</p>',
    ...findImage('blog-3'),
    publishedAt: '2023-09-30',
  },
];

export const messages: Message[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    message: 'Hello! I saw your portfolio and I\'m very impressed with your work. I have a project in mind and would love to discuss a potential collaboration. Are you available for freelance work?',
    receivedAt: '2023-11-10T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    message: 'Amazing character designs! I\'m a game developer and we are looking for a character artist for our new indie game. Your style seems like a perfect fit. Let me know if you\'d be interested in learning more.',
    receivedAt: '2023-11-09T14:30:00Z',
    read: true,
  },
  {
    id: '3',
    name: 'Emily White',
    email: 'emily.white@example.com',
    message: 'Your product visualizations are stunning. Our company is launching a new line of headphones and we need some high-quality marketing renders. Could you please send me your rate sheet?',
    receivedAt: '2023-11-08T09:15:00Z',
    read: true,
  },
];
