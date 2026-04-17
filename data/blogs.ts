import type { BlogPost } from "@/types/blog";

/**
 * Backend-ready blog data layer.
 * For now this returns static data.
 * Later replace these with DB/API calls without changing the page UI.
 */
const BLOGS: BlogPost[] = [
  {
    id: "5-ways-to-mend-a-broken-tooth-and-restore-your-confident-smile",
    title: "5 Ways to Mend a Broken Tooth and Restore Your Confident Smile",
    date: "Recent",
    author: "Sarangi Dentistry",
    category: "Restorative Dentistry",
    image: "/assets/dental-check-up-fleet-hampshire.jpg",
    excerpt:
      "New-age restorative dentistry can repair broken teeth while bringing back comfort, aesthetics, and confidence in your smile.",
    readTime: "6 min read",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Broken or cracked teeth can affect more than your appearance. They may create sensitivity, pain while chewing, and a real loss of confidence in your smile. The good news is that modern restorative dentistry offers several precise solutions depending on the severity and type of damage.",
      },
      {
        type: "heading",
        text: "Understanding cracked or broken teeth",
      },
      {
        type: "list",
        items: [
          "Craze lines are tiny surface-level enamel cracks that are usually cosmetic.",
          "A fractured cusp often affects the chewing surface and may not always cause severe pain.",
          "A cracked tooth can extend deeper and needs early treatment to prevent worsening.",
          "A split tooth is more advanced and may not always be preserved intact.",
          "Vertical root fractures often begin below the gum line and may go unnoticed initially.",
        ],
      },
      {
        type: "heading",
        text: "Five effective ways to restore the tooth",
      },
      {
        type: "paragraph",
        text: "Composite bonding is often ideal for smaller chips and visible surface repairs. It is fast, conservative, and can be shaped to blend naturally with your teeth.",
      },
      {
        type: "paragraph",
        text: "Veneers are a more refined option when front teeth need aesthetic enhancement along with structural improvement. They create a balanced, polished result for visible smile zones.",
      },
      {
        type: "paragraph",
        text: "Crowns are one of the most dependable solutions for teeth that are weakened, heavily filled, or structurally compromised. They protect the tooth while restoring shape and strength.",
      },
      {
        type: "paragraph",
        text: "When a crack reaches the pulp, root canal treatment may be necessary to remove infection, preserve the natural tooth, and prepare it for final restoration with a crown.",
      },
      {
        type: "paragraph",
        text: "In severe situations where the tooth cannot be preserved safely, extraction followed by implant or bridge planning may be the most stable long-term solution.",
      },
      {
        type: "quote",
        text: "Early diagnosis is often the difference between a simple repair and a much more complex treatment plan.",
      },
      {
        type: "paragraph",
        text: "The right treatment depends on the location of the tooth, the depth of the crack, the amount of remaining tooth structure, and your long-term oral health goals.",
      },
    ],
  },
  {
    id: "what-is-a-crossbite",
    title: "What is a Crossbite? Symptoms and Treatments",
    date: "Recent",
    author: "Sarangi Dentistry",
    category: "Orthodontics",
    image: "/assets/dental-care-professional-stockcake.webp",
    excerpt:
      "A crossbite is a common bite misalignment that can affect chewing, comfort, wear patterns, and overall dental function.",
    readTime: "5 min read",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "A crossbite happens when one or more upper teeth sit inside the lower teeth when the mouth closes. This differs from a healthy bite relationship, where the upper teeth slightly overlap the lower teeth.",
      },
      {
        type: "heading",
        text: "Common signs of a crossbite",
      },
      {
        type: "list",
        items: [
          "Misaligned bite pattern",
          "Uneven wear on certain teeth",
          "Difficulty chewing or biting comfortably",
          "Jaw pain or muscular tension",
          "Speech issues in some cases",
        ],
      },
      {
        type: "heading",
        text: "How crossbite is treated",
      },
      {
        type: "paragraph",
        text: "Traditional braces remain one of the most effective methods for correcting bite discrepancies and gradually guiding the teeth into healthier positions.",
      },
      {
        type: "paragraph",
        text: "Palatal expanders are often used in younger patients to widen the upper jaw and improve upper-lower jaw relationships during growth.",
      },
      {
        type: "paragraph",
        text: "Clear aligners and removable appliances may be suitable in selected cases where gentle, progressive tooth movement is appropriate.",
      },
      {
        type: "paragraph",
        text: "In more severe skeletal cases, orthodontic treatment may need to be combined with jaw surgery to properly address the structural relationship of the jaws.",
      },
      {
        type: "paragraph",
        text: "For mild adult cases, bonding or crowns can sometimes help reshape biting surfaces, but they usually do not correct the underlying alignment issue.",
      },
      {
        type: "quote",
        text: "The earlier a crossbite is evaluated, the easier it is to guide treatment in a healthier direction.",
      },
    ],
  },
  {
    id: "the-ultimate-guide-to-daily-oral-hygiene-5-essential-practices",
    title: "The Ultimate Guide to Daily Oral Hygiene: 5 Essential Practices",
    date: "Recent",
    author: "Sarangi Dentistry",
    category: "Oral Health",
    image: "/assets/3-Qualities-To-Look-For.jpg",
    excerpt:
      "Daily oral hygiene is about more than clean teeth. It is the foundation of long-term protection against decay, gum disease, and bad breath.",
    readTime: "7 min read",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "A healthy smile is closely linked with overall wellness. Daily habits play a major role in protecting teeth, supporting gum health, and preventing avoidable dental problems over time.",
      },
      {
        type: "heading",
        text: "Five essential oral hygiene practices",
      },
      {
        type: "paragraph",
        text: "Brush with care and precision, not just habit. Effective brushing removes plaque, food debris, and bacteria from the teeth and gum line.",
      },
      {
        type: "paragraph",
        text: "Floss every day. A toothbrush cannot fully reach the narrow spaces between teeth, which is where plaque and food particles often remain.",
      },
      {
        type: "paragraph",
        text: "Use a mouthwash when appropriate. Antimicrobial or fluoride rinses can add another level of protection depending on your needs.",
      },
      {
        type: "paragraph",
        text: "Eat foods that support oral health. Crunchy vegetables, dairy products, and less sugary beverage choices can make a meaningful difference.",
      },
      {
        type: "paragraph",
        text: "Stay hydrated throughout the day. Saliva is essential for neutralizing acids, washing away particles, and protecting enamel naturally.",
      },
      {
        type: "heading",
        text: "Smile-friendly daily choices",
      },
      {
        type: "list",
        items: [
          "Choose water over sugary drinks whenever possible.",
          "Include calcium-rich foods regularly.",
          "Reduce frequent snacking on sticky sweets.",
          "Keep routine dental checkups as part of prevention.",
        ],
      },
      {
        type: "quote",
        text: "Consistency matters more than intensity when it comes to oral hygiene.",
      },
    ],
  },
];

export async function getAllBlogs(): Promise<BlogPost[]> {
  return BLOGS;
}

export async function getFeaturedBlog(): Promise<BlogPost | undefined> {
  return BLOGS.find((blog) => blog.featured) ?? BLOGS[0];
}

export async function getBlogById(id: string): Promise<BlogPost | undefined> {
  return BLOGS.find((blog) => blog.id === id);
}

export async function getRelatedBlogs(
  currentId: string,
  limit = 2,
): Promise<BlogPost[]> {
  return BLOGS.filter((blog) => blog.id !== currentId).slice(0, limit);
}
