// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Sarah Bowles';
export const SITE_DESCRIPTION = 'Doctoral research in clinical psychology at the Salomons Institute for Applied Psychology, Canterbury Christ Church University.';

export const CV_URL = '';

export const CONTACT = {
  organization: 'Sarah Bowles',
  addressLines: [
    'Salomons Institute for Applied Psychology',
    'Canterbury Christ Church University',
  ],
  emails: [
    'sb2144@canterbury.ac.uk',
  ],
};

export type SocialIcon = 'website' | 'scholar' | 'email' | 'github' | 'linkedin' | 'twitter';

export const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  icon: SocialIcon;
}> = [
  {
    label: 'Email',
    href: 'mailto:sb2144@canterbury.ac.uk',
    icon: 'email',
  },
];

export const FOOTER_CREDIT = {
  designerName: 'Shravan Goswami',
  designerUrl: 'https://shravangoswami.com',
  sourceLabel: 'Astro Scholar',
  sourceUrl: 'https://github.com/shravanngoswamii/astro-scholar',
};
