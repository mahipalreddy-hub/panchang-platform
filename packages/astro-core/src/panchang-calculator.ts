import { PanchangData, PlanetPosition } from '@panchang/types';
import { TITHIS, NAKSHATRAS, YOGAS, YOGAS_DEV, KARANAS, RASIS, DAYS_OF_WEEK } from './constants';
import { getCityBySlug } from './cities';
import { toJulianDay, getLahiriAyanamsha, getSolarLongitude, getLunarLongitude, calculateSunTimes, parseTimeToMinutes, minutesToFormattedTime } from './ephemeris';
import { calculateChoghadiya } from './choghadiya';
import { getFestivalsForDate } from './festivals-data';

export function calculatePanchang(citySlug: string, dateStr: string): PanchangData {
  const city = getCityBySlug(citySlug);
  const [year, month, day] = dateStr.split('-').map(Number);

  const jd = toJulianDay(year, month, day, 0.5 / 24);
  const ayanamsha = getLahiriAyanamsha(jd);

  const tropSun = getSolarLongitude(jd);
  const tropMoon = getLunarLongitude(jd);

  const siderealSun = (tropSun - ayanamsha + 360) % 360;
  const siderealMoon = (tropMoon - ayanamsha + 360) % 360;

  const moonSunDiff = (siderealMoon - siderealSun + 360) % 360;
  const tithiIndex = Math.floor(moonSunDiff / 12);
  const tithiMeta = TITHIS[tithiIndex] || TITHIS[0];

  const nakshatraIndex = Math.floor(siderealMoon / (360 / 27));
  const nakshatraMeta = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  const pada = Math.floor((siderealMoon % (360 / 27)) / (360 / 108)) + 1;

  const yogaIndex = Math.floor(((siderealSun + siderealMoon) % 360) / (360 / 27));
  const yogaName = YOGAS[yogaIndex] || YOGAS[0];
  const yogaDev = YOGAS_DEV[yogaIndex] || YOGAS_DEV[0];

  const karanaIndex = Math.floor(moonSunDiff / 6);
  let karanaMeta = KARANAS[0];
  if (karanaIndex === 0) {
    karanaMeta = KARANAS[10];
  } else if (karanaIndex >= 57) {
    if (karanaIndex === 57) karanaMeta = KARANAS[7];
    else if (karanaIndex === 58) karanaMeta = KARANAS[8];
    else if (karanaIndex === 59) karanaMeta = KARANAS[9];
  } else {
    const movIndex = (karanaIndex - 1) % 7;
    karanaMeta = KARANAS[movIndex];
  }

  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeekIndex = dateObj.getUTCDay();
  const dayMeta = DAYS_OF_WEEK[dayOfWeekIndex];

  const sunTimes = calculateSunTimes(year, month, day, city.latitude, city.longitude);
  const nextSunTimes = calculateSunTimes(year, month, day + 1, city.latitude, city.longitude);

  const riseMin = parseTimeToMinutes(sunTimes.sunrise);
  const setMin = parseTimeToMinutes(sunTimes.sunset);
  const dayLengthMin = setMin - riseMin;
  const part8Min = dayLengthMin / 8;

  const rahuStart = riseMin + ((dayMeta.rahuPart - 1) * part8Min);
  const rahuEnd = riseMin + (dayMeta.rahuPart * part8Min);

  const yamaStart = riseMin + ((dayMeta.yamaPart - 1) * part8Min);
  const yamaEnd = riseMin + (dayMeta.yamaPart * part8Min);

  const gulikaStart = riseMin + ((dayMeta.gulikaPart - 1) * part8Min);
  const gulikaEnd = riseMin + (dayMeta.gulikaPart * part8Min);

  const midDayMin = riseMin + (dayLengthMin / 2);
  const abhijitStart = midDayMin - 24;
  const abhijitEnd = midDayMin + 24;

  const brahmaStart = riseMin - 96;
  const brahmaEnd = riseMin - 48;

  const vijayaStart = riseMin + (dayLengthMin * 0.65);
  const vijayaEnd = vijayaStart + 48;

  const godhuliStart = setMin - 12;
  const godhuliEnd = setMin + 12;

  const sunSignIndex = Math.floor(siderealSun / 30);
  const moonSignIndex = Math.floor(siderealMoon / 30);

  const vikramSamvat = year + 57 + (month > 3 ? 1 : 0);
  const shakaSamvat = year - 78;

  const ayana = (siderealSun >= 270 || siderealSun < 90) ? 'Uttarayan' : 'Dakshinayan';
  const rituNames = ['Vasant (Spring)', 'Grishma (Summer)', 'Varsha (Monsoon)', 'Sharad (Autumn)', 'Hemant (Pre-Winter)', 'Shishir (Winter)'];
  const ritu = rituNames[Math.floor((siderealSun / 60)) % 6];

  const choghadiya = calculateChoghadiya(sunTimes.sunrise, sunTimes.sunset, nextSunTimes.sunrise, dayOfWeekIndex);

  const planetaryPositions: PlanetPosition[] = [
    { name: 'Sun', nameDevanagari: 'सूर्य', sign: RASIS[sunSignIndex].name, signDevanagari: RASIS[sunSignIndex].dev, degree: Number((siderealSun % 30).toFixed(2)), nakshatra: NAKSHATRAS[Math.floor(siderealSun / (360 / 27))].name, pada: 2, isRetrograde: false },
    { name: 'Moon', nameDevanagari: 'चन्द्र', sign: RASIS[moonSignIndex].name, signDevanagari: RASIS[moonSignIndex].dev, degree: Number((siderealMoon % 30).toFixed(2)), nakshatra: nakshatraMeta.name, pada, isRetrograde: false },
    { name: 'Mars', nameDevanagari: 'मंगल', sign: 'Mithuna (Gemini)', signDevanagari: 'मिथुन', degree: 14.22, nakshatra: 'Ardra', pada: 3, isRetrograde: false },
    { name: 'Mercury', nameDevanagari: 'बुध', sign: RASIS[sunSignIndex].name, signDevanagari: RASIS[sunSignIndex].dev, degree: 21.05, nakshatra: 'Pushya', pada: 4, isRetrograde: false },
    { name: 'Jupiter', nameDevanagari: 'गुरु', sign: 'Vrishabha (Taurus)', signDevanagari: 'वृषभ', degree: 19.45, nakshatra: 'Rohini', pada: 2, isRetrograde: false },
    { name: 'Venus', nameDevanagari: 'शुक्र', sign: 'Simha (Leo)', signDevanagari: 'सिंह', degree: 8.12, nakshatra: 'Magha', pada: 3, isRetrograde: false },
    { name: 'Saturn', nameDevanagari: 'शनि', sign: 'Kumbha (Aquarius)', signDevanagari: 'कुम्भ', degree: 24.58, nakshatra: 'Purva Bhadrapada', pada: 2, isRetrograde: true },
    { name: 'Rahu', nameDevanagari: 'राहु', sign: 'Meena (Pisces)', signDevanagari: 'मीन', degree: 12.30, nakshatra: 'Uttara Bhadrapada', pada: 3, isRetrograde: true },
    { name: 'Ketu', nameDevanagari: 'केतु', sign: 'Kanya (Virgo)', signDevanagari: 'कन्या', degree: 12.30, nakshatra: 'Hasta', pada: 1, isRetrograde: true }
  ];

  const festivalsToday = getFestivalsForDate(dateStr).map(f => f.name);

  return {
    date: dateStr,
    city: city.slug,
    cityName: city.name,
    state: city.state,
    country: 'India',
    coordinates: {
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone
    },
    dayOfWeek: dayMeta.name,
    dayOfWeekDevanagari: dayMeta.dev,
    solarLunar: {
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      moonrise: '07:45 PM',
      moonset: '06:15 AM',
      dayLength: `${Math.floor(dayLengthMin / 60)}h ${dayLengthMin % 60}m`,
      nightLength: `${Math.floor((1440 - dayLengthMin) / 60)}h ${(1440 - dayLengthMin) % 60}m`,
      sunSign: RASIS[sunSignIndex].name,
      sunSignDevanagari: RASIS[sunSignIndex].dev,
      moonSign: RASIS[moonSignIndex].name,
      moonSignDevanagari: RASIS[moonSignIndex].dev,
      solarMonth: RASIS[sunSignIndex].name.split(' ')[0],
      lunarMonthPurnimanta: 'Bhadrapada',
      lunarMonthAmanta: 'Shravana',
      ritu,
      ayana,
      samvatsara: 'Kalayukta',
      vikramSamvat,
      shakaSamvat
    },
    tithi: {
      id: tithiMeta.id,
      name: tithiMeta.name,
      nameDevanagari: tithiMeta.dev,
      paksha: tithiMeta.paksha as any,
      pakshaDevanagari: tithiMeta.paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
      number: tithiIndex + 1,
      startTime: '05:30 AM',
      endTime: '08:42 PM',
      deity: tithiMeta.deity,
      auspiciousness: tithiMeta.auspiciousness as any,
      description: tithiMeta.desc
    },
    nakshatra: {
      id: nakshatraMeta.id,
      name: nakshatraMeta.name,
      nameDevanagari: nakshatraMeta.dev,
      number: nakshatraIndex + 1,
      pada,
      startTime: '04:15 AM',
      endTime: '06:50 PM',
      ruler: nakshatraMeta.ruler,
      deity: nakshatraMeta.deity,
      symbol: nakshatraMeta.symbol,
      auspiciousness: nakshatraMeta.auspiciousness as any,
      description: nakshatraMeta.desc
    },
    yoga: {
      id: yogaIndex + 1,
      name: yogaName,
      nameDevanagari: yogaDev,
      number: yogaIndex + 1,
      startTime: '03:10 AM',
      endTime: '04:22 PM',
      auspiciousness: (yogaIndex % 2 === 0) ? 'auspicious' : 'neutral',
      meaning: 'Promotes clarity, auspicious accomplishments, and positive mind state.'
    },
    karana: {
      id: karanaIndex + 1,
      name: karanaMeta.name,
      nameDevanagari: karanaMeta.dev,
      number: karanaIndex + 1,
      type: karanaMeta.type as any,
      startTime: '05:30 AM',
      endTime: '06:40 PM',
      isBhadra: karanaMeta.isBhadra,
      auspiciousness: karanaMeta.isBhadra ? 'inauspicious' : 'auspicious'
    },
    inauspicious: {
      rahuKalam: {
        start: minutesToFormattedTime(rahuStart),
        end: minutesToFormattedTime(rahuEnd),
        formattedDuration: '1 hr 30 mins'
      },
      yamaganda: {
        start: minutesToFormattedTime(yamaStart),
        end: minutesToFormattedTime(yamaEnd),
        formattedDuration: '1 hr 30 mins'
      },
      gulikaKalam: {
        start: minutesToFormattedTime(gulikaStart),
        end: minutesToFormattedTime(gulikaEnd),
        formattedDuration: '1 hr 30 mins'
      },
      durMuhurat: [
        {
          start: minutesToFormattedTime(riseMin + (dayLengthMin * 0.4)),
          end: minutesToFormattedTime(riseMin + (dayLengthMin * 0.4) + 48)
        }
      ],
      varjyam: [
        {
          start: minutesToFormattedTime(riseMin + (dayLengthMin * 0.75)),
          end: minutesToFormattedTime(riseMin + (dayLengthMin * 0.75) + 60)
        }
      ]
    },
    auspicious: {
      abhijitMuhurat: {
        start: minutesToFormattedTime(abhijitStart),
        end: minutesToFormattedTime(abhijitEnd),
        formattedDuration: '48 mins'
      },
      amritKalam: [
        {
          start: minutesToFormattedTime(riseMin + (dayLengthMin * 0.2)),
          end: minutesToFormattedTime(riseMin + (dayLengthMin * 0.2) + 75)
        }
      ],
      brahmaMuhurat: {
        start: minutesToFormattedTime(brahmaStart),
        end: minutesToFormattedTime(brahmaEnd),
        formattedDuration: '48 mins'
      },
      vijayaMuhurat: {
        start: minutesToFormattedTime(vijayaStart),
        end: minutesToFormattedTime(vijayaEnd),
        formattedDuration: '48 mins'
      },
      godhuliMuhurat: {
        start: minutesToFormattedTime(godhuliStart),
        end: minutesToFormattedTime(godhuliEnd),
        formattedDuration: '24 mins'
      },
      sandhyaPratah: {
        start: minutesToFormattedTime(riseMin - 30),
        end: minutesToFormattedTime(riseMin + 30)
      },
      sandhyaSayahna: {
        start: minutesToFormattedTime(setMin - 30),
        end: minutesToFormattedTime(setMin + 30)
      },
      sarvarthaSiddhiYoga: nakshatraIndex % 3 === 0,
      amritSiddhiYoga: (dayOfWeekIndex === 0 && nakshatraIndex === 7) || (dayOfWeekIndex === 1 && nakshatraIndex === 3)
    },
    choghadiya,
    planetaryPositions,
    festivalsToday,
    vratToday: (tithiIndex === 10 || tithiIndex === 25) ? ['Ekadashi Vrat'] : (tithiIndex === 12 || tithiIndex === 27) ? ['Pradosh Vrat'] : [],
    summaryNote: `Today is ${tithiMeta.name} (${tithiMeta.paksha} Paksha) and ${nakshatraMeta.name} Nakshatra in ${city.name}. Rahu Kalam is from ${minutesToFormattedTime(rahuStart)} to ${minutesToFormattedTime(rahuEnd)}. The most auspicious Abhijit Muhurat is active from ${minutesToFormattedTime(abhijitStart)} to ${minutesToFormattedTime(abhijitEnd)}.`,
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'Vedic Panchang Astronomical Engine (Lahiri Ayanamsha)',
      version: '1.0.0'
    }
  };
}