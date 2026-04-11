interface ContactLinkBase {
  _key: string;
  value: string;
  title: string;
}

interface WhatsappLinkType extends ContactLinkBase {
  prefillMessage?: string | null | undefined;
  type: 'whatsapp';
}

interface EmailLinkType extends ContactLinkBase {
  subject?: string | null | undefined;
  body?: string | null | undefined;
  type: 'email';
}

interface TikTokLinkType extends ContactLinkBase {
  type: 'tiktok';
}

interface InstagramLinkType extends ContactLinkBase {
  type: 'instagram';
}

interface PhoneLinkType extends ContactLinkBase {
  type: 'phone';
}

export type ContactLink =
  | WhatsappLinkType
  | EmailLinkType
  | TikTokLinkType
  | InstagramLinkType
  | PhoneLinkType;
