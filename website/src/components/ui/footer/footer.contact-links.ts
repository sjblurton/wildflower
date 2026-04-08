import envelopeIcon from '../../../assets/envelope.svg?raw';
import instagramIcon from '../../../assets/instagram.svg?raw';
import telephoneIcon from '../../../assets/telephone.svg?raw';
import tiktokIcon from '../../../assets/tiktok.svg?raw';
import whatsappIcon from '../../../assets/whatsapp.svg?raw';
import type { ContactLink } from '../../../lib/schemas/links/contactLinks';

type ContactLinkType = ContactLink['type'];

const socialIconByPlatformMap: Record<ContactLinkType, { icon: string; label: string }> = {
  instagram: { icon: instagramIcon, label: 'Instagram' },
  tiktok: { icon: tiktokIcon, label: 'TikTok' },
  email: { icon: envelopeIcon, label: 'Email' },
  phone: { icon: telephoneIcon, label: 'Phone' },
  whatsapp: { icon: whatsappIcon, label: 'WhatsApp' },
} as const;

type HrefMap = {
  [K in ContactLinkType]: (item: Extract<ContactLink, { type: K }>) => string;
};

const contactHrefMap: HrefMap = {
  email: (item) => `mailto:${item.emailAddress}`,
  phone: (item) => `tel:${item.phoneNumber}`,
  whatsapp: (item) => {
    const phone = item.phoneNumber.replace(/[^\d+]/g, '').replace('+', '');
    const text = item.prefillMessage ? `?text=${encodeURIComponent(item.prefillMessage)}` : '';
    return `https://wa.me/${phone}${text}`;
  },
  tiktok: (item) => item.url,
  instagram: (item) => item.url,
};

const contactLinkService = {
  getIcon(item: ContactLink) {
    return socialIconByPlatformMap[item.type].icon;
  },

  getLabel(item: ContactLink) {
    return socialIconByPlatformMap[item.type].label;
  },

  getHref(item: ContactLink) {
    switch (item.type) {
      case 'email':
        return contactHrefMap.email(item);
      case 'phone':
        return contactHrefMap.phone(item);
      case 'whatsapp':
        return contactHrefMap.whatsapp(item);
      case 'tiktok':
        return contactHrefMap.tiktok(item);
      case 'instagram':
        return contactHrefMap.instagram(item);
      default:
        return '#';
    }
  },
};

export const getIconForContactLink = (item: ContactLink) => contactLinkService.getIcon(item);
export const getLabelForContactLink = (item: ContactLink) => contactLinkService.getLabel(item);
export const getContactHref = (item: ContactLink) => contactLinkService.getHref(item);
