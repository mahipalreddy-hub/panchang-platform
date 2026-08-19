export function formatAuspiciousnessBadge(quality: 'auspicious' | 'inauspicious' | 'neutral' | 'highly-auspicious' | 'moderate' | string): {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
} {
  switch (quality) {
    case 'highly-auspicious':
    case 'auspicious':
    case 'best':
    case 'good':
    case 'gain':
      return {
        label: 'Auspicious (शुभ)',
        bgColor: 'bg-emerald-950/40',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-700/50',
      };
    case 'inauspicious':
    case 'bad':
    case 'loss':
      return {
        label: 'Inauspicious (अशुभ)',
        bgColor: 'bg-rose-950/40',
        textColor: 'text-rose-400',
        borderColor: 'border-rose-700/50',
      };
    case 'moderate':
    case 'neutral':
    default:
      return {
        label: 'Neutral (मध्यम / चर)',
        bgColor: 'bg-amber-950/40',
        textColor: 'text-amber-300',
        borderColor: 'border-amber-700/50',
      };
  }
}

export function formatDateToIndian(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}