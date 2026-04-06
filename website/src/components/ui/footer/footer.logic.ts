import type { FooterSettings } from './footer.schema';

import envelopeIcon from '../../../assets/envelope.svg?raw';
import facebookIcon from '../../../assets/facebook.svg?raw';
import instagramIcon from '../../../assets/instagram.svg?raw';
import linkedinIcon from '../../../assets/linkedin.svg?raw';
import telephoneIcon from '../../../assets/telephone.svg?raw';
import tiktokIcon from '../../../assets/tiktok.svg?raw';
import whatsappIcon from '../../../assets/whatsapp.svg?raw';
import xIcon from '../../../assets/x.svg?raw';
import youtubeIcon from '../../../assets/youtube.svg?raw';

type SocialLinkItem = FooterSettings['footerSocialLinks'][number];
type ContactLinkItem = FooterSettings['footerContactLinks'][number];

const socialIconByPlatform = {
  facebook: facebookIcon,
  instagram: instagramIcon,
  linkedin: linkedinIcon,
  tiktok: tiktokIcon,
  x: xIcon,
  youtube: youtubeIcon,
} as const;

const contactIconByType = {
  email: envelopeIcon,
  phone: telephoneIcon,
  whatsapp: whatsappIcon,
} as const;

export const contactHref = (item: ContactLinkItem) => {
  if (!item) return '#';
  if (item.type === 'email' && item.emailAddress) return `mailto:${item.emailAddress}`;
  if (item.type === 'phone' && item.phoneNumber) return `tel:${item.phoneNumber}`;
  if (item.type === 'whatsapp' && item.phoneNumber) {
    const phone = item.phoneNumber.replace(/[^\d+]/g, '').replace('+', '');
    const text = item.prefillMessage ? `?text=${encodeURIComponent(item.prefillMessage)}` : '';
    return `https://wa.me/${phone}${text}`;
  }
  return '#';
};

export const socialLocalIcon = (item: SocialLinkItem) => {
  return socialIconByPlatform[item.platform];
};

export const contactLocalIcon = (item: ContactLinkItem) => {
  return contactIconByType[item.type];
};

export const socialLinkText = (item: SocialLinkItem) => {
  if (item.label) return item.label;
  const hasAnyIcon = Boolean(item.icon?.asset?._ref || socialLocalIcon(item));
  return hasAnyIcon ? undefined : item.title;
};

export const contactLinkText = (item: ContactLinkItem) => {
  if (item.label) return item.label;
  const hasAnyIcon = Boolean(item.icon?.asset?._ref || contactLocalIcon(item));
  return hasAnyIcon ? undefined : item.title;
};
