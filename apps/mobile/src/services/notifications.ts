import * as Notifications from 'expo-notifications';
import { PanchangData } from '@panchang/types';

// Setup notification presentation handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function registerForPushNotificationsAsync(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function scheduleDailyPanchangNotification(panchang: PanchangData): Promise<void> {
  // Cancel previous scheduled alarms
  await Notifications.cancelAllScheduledNotificationsAsync();

  // 1. Daily 6:00 AM Panchang summary alert
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🌅 Today's Panchang - ${panchang.cityName}`,
      body: `Tithi: ${panchang.tithi.name} (${panchang.tithi.paksha}). Rahu Kalam: ${panchang.inauspicious.rahuKalam.start} - ${panchang.inauspicious.rahuKalam.end}. Abhijit: ${panchang.auspicious.abhijitMuhurat.start}.`,
      data: { url: `panchang://${panchang.city}/${panchang.date}` }
    },
    trigger: {
      hour: 6,
      minute: 0,
      repeats: true
    }
  });

  // 2. Schedule Rahu Kalam alert (15 minutes prior to start)
  try {
    const [time, period] = panchang.inauspicious.rahuKalam.start.split(' ');
    const [h, m] = time.split(':').map(Number);
    let hrs = h % 12;
    if (period === 'PM') hrs += 12;
    let alarmMin = m - 15;
    let alarmHr = hrs;
    if (alarmMin < 0) {
      alarmMin += 60;
      alarmHr -= 1;
    }

    if (alarmHr >= 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `⚠️ Rahu Kalam Warning (राहु काल)`,
          body: `Rahu Kalam starts in 15 minutes (${panchang.inauspicious.rahuKalam.start} - ${panchang.inauspicious.rahuKalam.end}) in ${panchang.cityName}. Avoid starting new deeds.`,
          data: { url: `panchang://${panchang.city}/${panchang.date}` }
        },
        trigger: {
          hour: alarmHr,
          minute: alarmMin,
          repeats: false
        }
      });
    }
  } catch (e) {}
}