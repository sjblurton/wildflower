import type { CtaButton } from '../../../../lib/schemas/buttons/ctaButtonSchema';
import { getBtnClassNames } from '../../../../styles/btn-maps';
import { mapLinkReferences } from './mapLinkReferences';
import type { SanityImage } from '../../../../lib/schemas/shared/primitives';
import type { ContactLinkReference } from '../../../../lib/links/contact-links.schema';
import type { NavLinkSlug } from '../../../../lib/schemas/links/navLink';

export type MappedProductCardIcon =
  | {
      _type: 'internal';
      link: string | null;
    }
  | SanityImage;

export type ProductCardButton = {
  _key: string;
  label: string;
  url: string;
  class: string;
  icon: MappedProductCardIcon | null;
  iconPosition: 'left' | 'right' | null;
};

export type CtaProps = {
  label: string;
  buttons: ProductCardButton[];
  _key: string;
};

type MappedLinkReference = {
  url: string;
  icon: MappedProductCardIcon | null;
};

type FetchLinkReference = {
  page: (id: string) => Promise<{ success: boolean; data: NavLinkSlug }>;
  contact: (id: string) => Promise<{ success: boolean; data: ContactLinkReference }>;
};

export const getCtaProps = async (
  cta: CtaButton[] | null,
  fetchLinkReference: FetchLinkReference,
): Promise<CtaProps[] | null> => {
  if (!cta) return null;
  const props: CtaProps[] | null = await Promise.all(
    cta.map(
      async ({
        _key,
        colour,
        label,
        hasIcon,
        iconPosition,
        size,
        style,
        width,
        links,
        customIcon,
      }) => {
        const classNames = getBtnClassNames({
          colour,
          size,
          width,
          style,
        });

        // Pass fetchLinkReference to mapLinkReferences
        const mappedLinks: MappedLinkReference[] = await Promise.all(
          links.map((link) => mapLinkReferences(link, customIcon, fetchLinkReference)),
        ).then((results) =>
          results.flat().filter((item): item is MappedLinkReference => item !== null),
        );

        return {
          _key,
          label,
          buttons: mappedLinks.map((l) => ({
            _key,
            label,
            url: l.url,
            class: classNames,
            icon: l.icon,
            iconPosition: hasIcon ? iconPosition : null,
          })),
        } satisfies CtaProps;
      },
    ),
  );
  return props;
};
