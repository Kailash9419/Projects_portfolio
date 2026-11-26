import { composeMessage, mailtoLink, whatsappLink } from '../../lib/whatsapp';

type Strings = {
  intro: string;
  nameTemplate: string;
  needTemplate: string;
  fallback: string;
  phone: string;
  email: string;
  subject: string;
  locale: 'en' | 'hi';
};

/**
 * WhatsApp / email composer. Builds links from the chosen needs and name.
 * Nothing is sent or stored by the site. Without JS the links carry a default message.
 */
export function initComposer(root: HTMLElement): () => void {
  let s: Strings;
  try {
    s = JSON.parse(root.dataset.strings ?? '') as Strings;
  } catch {
    return () => {};
  }
  const wa = root.querySelector<HTMLAnchorElement>('[data-wa]');
  const mail = root.querySelector<HTMLAnchorElement>('[data-mail]');
  const preview = root.querySelector<HTMLElement>('[data-preview]');
  const nameInput = root.querySelector<HTMLInputElement>('input[name="name"]');
  if (!wa || !mail || !preview) return () => {};

  const list = new Intl.ListFormat(s.locale === 'hi' ? 'hi-IN' : 'en-IN', { style: 'long', type: 'conjunction' });

  const update = () => {
    const needs = Array.from(root.querySelectorAll<HTMLInputElement>('input[name="need"]:checked')).map((i) => i.value);
    const message = composeMessage({
      intro: s.intro,
      name: nameInput?.value,
      nameTemplate: s.nameTemplate,
      needs,
      needTemplate: s.needTemplate,
      fallback: s.fallback,
      join: (items) => list.format(items),
    });
    preview.textContent = message;
    wa.href = whatsappLink(s.phone, message);
    mail.href = mailtoLink(s.email, s.subject, message);
  };

  root.addEventListener('input', update);
  root.addEventListener('change', update);
  update();
  return () => {
    root.removeEventListener('input', update);
    root.removeEventListener('change', update);
  };
}
