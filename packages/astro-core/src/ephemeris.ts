export function toJulianDay(year: number, month: number, day: number, hourFraction: number = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hourFraction + B - 1524.5;
  return jd;
}

export function getLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const ayanamsha = 23.856667 + (1.3960416 * T) + (0.000308 * T * T);
  return ayanamsha;
}

export function getSolarLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mrad = (M * Math.PI) / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  const trueLong = L0 + C;
  return (trueLong % 360 + 360) % 360;
}

export function getLunarLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T;

  const toRad = (d: number) => (d * Math.PI) / 180;

  const lLong = Lp 
    + 6.288774 * Math.sin(toRad(Mp))
    + 1.274027 * Math.sin(toRad(2 * D - Mp))
    + 0.658314 * Math.sin(toRad(2 * D))
    + 0.213618 * Math.sin(toRad(2 * Mp))
    - 0.185116 * Math.sin(toRad(M))
    - 0.114332 * Math.sin(toRad(2 * F))
    + 0.058793 * Math.sin(toRad(2 * D - 2 * Mp))
    + 0.057066 * Math.sin(toRad(2 * D - M - Mp));

  return (lLong % 360 + 360) % 360;
}

export function calculateSunTimes(year: number, month: number, day: number, lat: number, lng: number): { sunrise: string; sunset: string; dayLengthMinutes: number } {
  const N1 = Math.floor(275 * month / 9);
  const N2 = Math.floor((month + 9) / 12);
  const N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
  const N = N1 - (N2 * N3) + day - 30;

  const lngHour = lng / 15;

  const tRise = N + ((6 - lngHour) / 24);
  const MRise = (0.9856 * tRise) - 3.289;
  let L_Rise = MRise + (1.916 * Math.sin(MRise * Math.PI / 180)) + (0.020 * Math.sin(2 * MRise * Math.PI / 180)) + 282.634;
  L_Rise = (L_Rise % 360 + 360) % 360;

  let RA_Rise = Math.atan(0.91764 * Math.tan(L_Rise * Math.PI / 180)) * 180 / Math.PI;
  RA_Rise = (RA_Rise % 360 + 360) % 360;
  const Lquadrant_Rise = (Math.floor(L_Rise / 90)) * 90;
  const RAquadrant_Rise = (Math.floor(RA_Rise / 90)) * 90;
  RA_Rise = (RA_Rise + (Lquadrant_Rise - RAquadrant_Rise)) / 15;

  const sinDecRise = 0.39782 * Math.sin(L_Rise * Math.PI / 180);
  const cosDecRise = Math.cos(Math.asin(sinDecRise));

  const cosHRise = (Math.sin(-0.833 * Math.PI / 180) - (sinDecRise * Math.sin(lat * Math.PI / 180))) / (cosDecRise * Math.cos(lat * Math.PI / 180));
  const clampedCosH = Math.max(-1, Math.min(1, cosHRise));
  const H_Rise = 360 - (Math.acos(clampedCosH) * 180 / Math.PI);
  const H_Rise_Hours = H_Rise / 15;

  const T_Rise = H_Rise_Hours + RA_Rise - (0.06571 * tRise) - 6.622;
  let UT_Rise = (T_Rise - lngHour) % 24;
  if (UT_Rise < 0) UT_Rise += 24;
  const localRise = (UT_Rise + 5.5) % 24;

  const tSet = N + ((18 - lngHour) / 24);
  const MSet = (0.9856 * tSet) - 3.289;
  let L_Set = MSet + (1.916 * Math.sin(MSet * Math.PI / 180)) + (0.020 * Math.sin(2 * MSet * Math.PI / 180)) + 282.634;
  L_Set = (L_Set % 360 + 360) % 360;

  let RA_Set = Math.atan(0.91764 * Math.tan(L_Set * Math.PI / 180)) * 180 / Math.PI;
  RA_Set = (RA_Set % 360 + 360) % 360;
  const Lquadrant_Set = (Math.floor(L_Set / 90)) * 90;
  const RAquadrant_Set = (Math.floor(RA_Set / 90)) * 90;
  RA_Set = (RA_Set + (Lquadrant_Set - RAquadrant_Set)) / 15;

  const sinDecSet = 0.39782 * Math.sin(L_Set * Math.PI / 180);
  const cosDecSet = Math.cos(Math.asin(sinDecSet));

  const cosHSet = (Math.sin(-0.833 * Math.PI / 180) - (sinDecSet * Math.sin(lat * Math.PI / 180))) / (cosDecSet * Math.cos(lat * Math.PI / 180));
  const H_Set = (Math.acos(Math.max(-1, Math.min(1, cosHSet))) * 180 / Math.PI) / 15;

  const T_Set = H_Set + RA_Set - (0.06571 * tSet) - 6.622;
  let UT_Set = (T_Set - lngHour) % 24;
  if (UT_Set < 0) UT_Set += 24;
  const localSet = (UT_Set + 5.5) % 24;

  const formatHours = (h: number) => {
    const hours = Math.floor(h);
    const minutes = Math.floor((h - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const dayLengthMin = Math.round((localSet - localRise + 24) % 24 * 60);

  return {
    sunrise: formatHours(localRise),
    sunset: formatHours(localSet),
    dayLengthMinutes: dayLengthMin
  };
}

export function parseTimeToMinutes(timeStr: string): number {
  const [time, period] = timeStr.trim().split(' ');
  const [h, m] = time.split(':').map(Number);
  let totalHours = h % 12;
  if (period === 'PM') totalHours += 12;
  return totalHours * 60 + m;
}

export function minutesToFormattedTime(totalMin: number): string {
  const norm = (totalMin % 1440 + 1440) % 1440;
  const hours = Math.floor(norm / 60);
  const minutes = Math.floor(norm % 60);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}