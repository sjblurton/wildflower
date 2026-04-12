import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';
import type { CtaButton } from '../../../../lib/schemas/buttons/ctaButtonSchema';
import { getBtnClassNames } from '../../../../styles/btn-maps';
import type { CTAButtonViewProps, MappedLinkReference } from '../types/CTAButton.interfaces';
import { mapLinkReferences } from './mapLinkReferences';

export const getCtaProps = async (
  cta: CtaButton[] | null,
  fetchLinkReference: FetchLinkReference,
): Promise<CTAButtonViewProps[] | null> => {
  if (!cta) return null;
  const props: CTAButtonViewProps[] = [];

  for (const {
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
  } of cta) {
    const classNames = getBtnClassNames({
      colour,
      size,
      width,
      style,
    });

    const mappedLinks: MappedLinkReference[] = (
      await Promise.all(
        links.map((link) => mapLinkReferences(link, customIcon, fetchLinkReference)),
      )
    )
      .flat()
      .filter((item): item is MappedLinkReference => item !== null);

    for (const l of mappedLinks) {
      props.push({
        _key,
        label,
        url: l.url,
        class: classNames,
        icon: l.icon,
        iconPosition: hasIcon ? iconPosition : null,
      });
    }
  }
  return props;
};
