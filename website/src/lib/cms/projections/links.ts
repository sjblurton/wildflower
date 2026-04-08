export const navLinkProjection = /* groq */ `
  _key,
  _type,
  label,
  "slug": page->slug.current
`;

export const contactLinkProjection = /* groq */ `
  _key,
  ...@->{
    "contactLinkType": contactType[0]._type,
    _type,
    "type": select(
      contactType[0]._type == "emailLink" => "email",
      contactType[0]._type == "phoneLink" => "phone",
      contactType[0]._type == "whatsappLink" => "whatsapp",
      contactType[0]._type == "instagramLink" => "instagram",
      contactType[0]._type == "ticTocLink" => "tiktok",
      null
    ),
    "title": contactType[0].title,
    "url": contactType[0].url,
    "phoneNumber": contactType[0].phoneNumber,
    "emailAddress": contactType[0].email,
    "prefillMessage": contactType[0].message,
    "subject": contactType[0].subject,
    "body": contactType[0].body
  }
`;
