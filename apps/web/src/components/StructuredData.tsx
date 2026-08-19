import React from 'react';
import { PanchangData } from '@panchang/types';

interface StructuredDataProps {
  panchang: PanchangData;
}

export function StructuredData({ panchang }: StructuredDataProps) {
  const { date, cityName, tithi, nakshatra, inauspicious, auspicious, solarLunar } = panchang;

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Daily Vedic Panchang for ${cityName} - ${date}`,
    startDate: `${date}T06:00:00+05:30`,
    endDate: `${date}T22:00:00+05:30`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: `${cityName}, India`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: 'IN'
      }
    },
    description: `Panchang details for ${cityName}: ${tithi.name} (${tithi.paksha} Paksha), ${nakshatra.name} Nakshatra. Sunrise: ${solarLunar.sunrise}, Sunset: ${solarLunar.sunset}. Rahu Kalam: ${inauspicious.rahuKalam.start} - ${inauspicious.rahuKalam.end}. Abhijit Muhurat: ${auspicious.abhijitMuhurat.start} - ${auspicious.abhijitMuhurat.end}.`
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the Tithi in ${cityName} on ${date}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The Tithi in ${cityName} on ${date} is ${tithi.name} (${tithi.paksha} Paksha) ending at ${tithi.endTime}.`
        }
      },
      {
        '@type': 'Question',
        name: `What is Rahu Kalam timing in ${cityName} today?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Rahu Kalam in ${cityName} on ${date} is from ${inauspicious.rahuKalam.start} to ${inauspicious.rahuKalam.end}. It is advised to avoid initiating auspicious activities during this time.`
        }
      },
      {
        '@type': 'Question',
        name: `What is the most auspicious Muhurat in ${cityName} today?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The most auspicious Abhijit Muhurat in ${cityName} is from ${auspicious.abhijitMuhurat.start} to ${auspicious.abhijitMuhurat.end}.`
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://vedicpanchang.internal/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${cityName} Panchang`,
        item: `https://vedicpanchang.internal/panchang/${panchang.city}/${date}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}