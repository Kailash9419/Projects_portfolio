/** Pure helpers that build contact links. No network, no storage. */

export function whatsappLink(phoneE164: string, message: string): string {
  const digits = phoneE164.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(email: string, subject: string, body: string): string {
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${email}?${params}`;
}

export type MessageParts = {
  intro: string;
  name?: string;
  nameTemplate: string;
  needs: string[];
  needTemplate: string;
  fallback: string;
  join: (items: string[]) => string;
};

/** Compose the pre-filled inquiry message. */
export function composeMessage(p: MessageParts): string {
  const lines = [p.intro];
  const name = p.name?.trim().slice(0, 60);
  if (name) lines.push(p.nameTemplate.replace('{name}', name));
  lines.push(p.needs.length ? p.needTemplate.replace('{need}', p.join(p.needs)) : p.fallback);
  return lines.join(' ');
}
