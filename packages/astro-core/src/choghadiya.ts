import { ChoghadiyaSlot, ChoghadiyaTimings } from '@panchang/types';
import { DAY_CHOGHADIYA_ORDER, NIGHT_CHOGHADIYA_ORDER, CHOGHADIYA_META } from './constants';
import { parseTimeToMinutes, minutesToFormattedTime } from './ephemeris';

export function calculateChoghadiya(sunrise: string, sunset: string, nextSunrise: string, dayOfWeekIndex: number): ChoghadiyaTimings {
  const riseMin = parseTimeToMinutes(sunrise);
  const setMin = parseTimeToMinutes(sunset);
  const nextRiseMin = parseTimeToMinutes(nextSunrise) + 1440;

  const dayLengthMin = setMin - riseMin;
  const daySlotDuration = dayLengthMin / 8;

  const nightLengthMin = nextRiseMin - setMin;
  const nightSlotDuration = nightLengthMin / 8;

  const daySeq = DAY_CHOGHADIYA_ORDER[dayOfWeekIndex] || DAY_CHOGHADIYA_ORDER[0];
  const nightSeq = NIGHT_CHOGHADIYA_ORDER[dayOfWeekIndex] || NIGHT_CHOGHADIYA_ORDER[0];

  const daySlots: ChoghadiyaSlot[] = daySeq.map((name, i) => {
    const slotStart = riseMin + (i * daySlotDuration);
    const slotEnd = riseMin + ((i + 1) * daySlotDuration);
    const meta = CHOGHADIYA_META[name] || { dev: name, quality: 'neutral', ruler: 'Sun' };
    return {
      name,
      nameDevanagari: meta.dev,
      type: name as any,
      quality: meta.quality,
      ruler: meta.ruler,
      start: minutesToFormattedTime(slotStart),
      end: minutesToFormattedTime(slotEnd)
    };
  });

  const nightSlots: ChoghadiyaSlot[] = nightSeq.map((name, i) => {
    const slotStart = setMin + (i * nightSlotDuration);
    const slotEnd = setMin + ((i + 1) * nightSlotDuration);
    const meta = CHOGHADIYA_META[name] || { dev: name, quality: 'neutral', ruler: 'Moon' };
    return {
      name,
      nameDevanagari: meta.dev,
      type: name as any,
      quality: meta.quality,
      ruler: meta.ruler,
      start: minutesToFormattedTime(slotStart),
      end: minutesToFormattedTime(slotEnd)
    };
  });

  return { day: daySlots, night: nightSlots };
}