# Expo Mobile App (EAS Build) Deployment Guide

This guide details building production Android App Bundles (.aab) for Google Play and iOS Archive (.ipa) for the Apple App Store using Expo Application Services (EAS).

---

## 1. Prerequisites
- [EAS CLI](https://docs.expo.dev/build/introduction/): Install via `npm install -g eas-cli`
- Expo account: Login via `eas login`
- Google Play Developer Account ($25 one-time)
- Apple Developer Program Membership ($99/year)

---

## 2. Configuring `eas.json`
Inside `apps/mobile/`, ensure `eas.json` is configured:
```json
{
  "cli": {
    "version": ">= 9.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-play-service-account.json",
        "track": "production"
      },
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "XXXXXXXXXX"
      }
    }
  }
}
```

---

## 3. Building Binaries

```bash
cd apps/mobile

# Build Android Production Bundle (.aab)
eas build --platform android --profile production

# Build iOS Production App (.ipa)
eas build --platform ios --profile production

# Build both platforms simultaneously
eas build --platform all --profile production
```

---

## 4. Setting Up Push Notifications (FCM & APNs)
1. **Android (Firebase Cloud Messaging)**:
   - Create project in Firebase Console.
   - Add Android App with package `com.vedicpanchang.app`.
   - Download `google-services.json` and place in `apps/mobile/`.
   - In Expo Dashboard, upload Firebase Server Key under **Credentials -> FCM Server Key**.
2. **iOS (Apple Push Notification Service)**:
   - Generate an **APNs Key (.p8)** in Apple Developer Portal.
   - Run `eas credentials` and let EAS automatically configure your Apple Push Notifications certificate.