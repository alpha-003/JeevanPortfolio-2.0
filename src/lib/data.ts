import type { Project, BlogPost, Message } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image || { imageUrl: 'https://picsum.photos/seed/fallback/600/400', imageHint: 'fallback image' };
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'corporate-brand-film',
    title: 'Corporate Brand Film',
    category: 'Corporate Video',
    description: 'A compelling brand story for a tech startup.',
    longDescription: '<p>This project involved editing a 3-minute brand film for a fast-growing tech startup. The goal was to create a dynamic and inspiring narrative that showcased their company culture and innovative products. I worked with 4K footage, multi-cam interviews, and b-roll to craft a seamless story. The edit was done in Premiere Pro, with color grading in DaVinci Resolve to achieve a clean, modern look.</p>',
    ...findImage('project-1'),
    publishedAt: '2023-10-26',
  },
  {
    id: '2',
    slug: 'indie-music-video',
    title: 'Indie Music Video',
    category: 'Music Video',
    description: 'A vibrant and energetic edit for an indie pop band.',
    longDescription: '<p>This was a fun, fast-paced project for an up-and-coming indie band. I was given creative freedom to experiment with split screens, quick cuts, and stylized color grading to match the song\'s energetic vibe. The video combines performance footage with abstract visuals to create a visually engaging experience. Edited in Final Cut Pro with motion graphics created in After Effects.</p>',
    ...findImage('project-2'),
    publishedAt: '2023-09-15',
  },
  {
    id: '3',
    slug: 'travel-documentary-short',
    title: 'Travel Documentary Short',
    category: 'Documentary',
    description: 'A journey through the mountains of Patagonia.',
    longDescription: '<p>For this short documentary, I edited hours of breathtaking drone and ground footage into a cohesive 5-minute travel film. The challenge was to build a narrative arc that captured the beauty and solitude of the Patagonian landscape. Sound design and a subtle, natural color grade were key to immersing the viewer in the environment.</p>',
    ...findImage('project-3'),
    publishedAt: '2023-08-02',
  },
  {
    id: '4',
    slug: 'luxury-real-estate-tour',
    title: 'Luxury Real Estate Tour',
    category: 'Real Estate',
    description: 'A high-end virtual tour of a modern mansion.',
    longDescription: '<p>This project required a smooth and elegant editing style to showcase a luxury property. I used gimbal footage, slow-motion shots, and seamless transitions to create a walkthrough that feels both sophisticated and inviting. The color grade was focused on creating a warm, aspirational mood, highlighting the architectural details and high-end finishes.</p>',
    ...findImage('project-4'),
    publishedAt: '2023-07-21',
  },
  {
    id: '5',
    slug: 'social-media-ad-campaign',
    title: 'Social Media Ad Campaign',
    category: 'Commercial',
    description: 'A series of snappy ads for a new fitness app.',
    longDescription: '<p>I edited a campaign of 15 and 30-second video ads for a mobile fitness app, optimized for platforms like Instagram and TikTok. The edits are high-energy, with bold text overlays, and designed to grab attention in the first few seconds. I created multiple versions to A/B test different hooks and calls-to-action.</p>',
    ...findImage('project-5'),
    publishedAt: '2023-06-11',
  },
  {
    id: '6',
    slug: 'short-film-the-getaway',
    title: 'Short Film - "The Getaway"',
    category: 'Narrative Film',
    description: 'A suspenseful short film about a heist gone wrong.',
    longDescription: '<p>As the lead editor on "The Getaway," I was responsible for the pacing and tension of the entire film. Working closely with the director, we crafted a narrative that keeps the audience on the edge of their seats. The project involved complex action sequences, dialogue scenes, and a dramatic final act. The color grade was stylized to create a gritty, noir-inspired look.</p>',
    ...findImage('project-6'),
    publishedAt: '2023-05-29',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'the-psychology-of-color-grading',
    title: 'The Psychology of Color Grading',
    summary: 'How color can profoundly impact the emotional tone of a video.',
    content: '<p>Color grading is more than just making footage look pretty; it\'s a powerful storytelling tool. In this post, we explore how different color palettes can evoke specific emotions and guide the audience\'s perception of a scene. We\'ll break down iconic looks from films and discuss how to apply these concepts in DaVinci Resolve to enhance your own projects.</p>',
    ...findImage('blog-1'),
    publishedAt: '2023-11-05',
  },
  {
    id: '2',
    slug: 'pacing-and-rhythm-in-editing',
    title: 'Pacing and Rhythm in Editing',
    summary: 'Finding the heartbeat of your story through the art of the cut.',
    content: '<p>The rhythm of your edits can be the difference between a video that drags and one that captivates. This article delves into the theory of pacing, discussing how the length of shots and the style of transitions can create tension, excitement, or reflection. We will analyze scenes from different genres to understand what makes their pacing effective and how you can apply these techniques in your editing software.</p>',
    ...findImage('blog-2'),
    publishedAt: '2023-10-18',
  },
  {
    id: '3',
    slug: 'essential-keyboard-shortcuts-for-premiere-pro',
    title: 'Top 10 Keyboard Shortcuts for Premiere Pro',
    summary: 'Speed up your workflow with these essential keyboard shortcuts.',
    content: '<p>Efficiency is key in the world of video editing. Shaving seconds off repetitive tasks can add up to hours saved on a project. This guide covers the top 10 most useful keyboard shortcuts in Adobe Premiere Pro that will transform your workflow, from navigating the timeline to trimming clips and adding effects. Mastering these will make you a faster, more fluid editor.</p>',
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
    message: 'Amazing work on that music video! I\'m a director and we are looking for an editor for our new short film. Your style seems like a perfect fit. Let me know if you\'d be interested in learning more.',
    receivedAt: '2023-11-09T14:30:00Z',
    read: true,
  },
  {
    id: '3',
    name: 'Emily White',
    email: 'emily.white@example.com',
    message: 'Your color grading is stunning. Our company needs a colorist for our upcoming commercial campaign. Could you please send me your rate sheet?',
    receivedAt: '2023-11-08T09:15:00Z',
    read: true,
  },
];
