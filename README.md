# FoodApp

A modern, real-time food delivery app built with React Native (Expo) and Firebase Firestore.

## Features
- Beautiful, user-friendly interface for browsing food items
- Real-time menu and order updates using Firebase Firestore
- Add items to cart, adjust quantities, and place orders
- Order history and status tracking
- Error handling and loading states

## Project Structure

```
project/
├── app/                # App screens and layouts
│   └── (tabs)/         # Main tab screens (Menu, Cart, Orders)
├── assets/             # Images and static assets
│   └── images/
├── contexts/           # React context providers (e.g., CartContext)
├── hooks/              # Custom React hooks
├── services/           # Firebase and other service logic
├── node_modules/       # Project dependencies
├── .expo/              # Expo build/cache (auto-generated)
├── .gitignore
├── .prettierrc
├── app.json            # Expo app config
├── expo-env.d.ts
├── package.json
├── package-lock.json
├── tsconfig.json       # TypeScript config
└── README.md           # Project documentation
```

## Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd FoodApp/project
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up Firebase
- Create a Firebase project at https://console.firebase.google.com/
- Enable Firestore Database
- Download your service account key if you want to use admin scripts
- Update `services/firebaseConfig.ts` with your Firebase config

### 4. Run the app
```sh
npx expo start
```
- Scan the QR code with Expo Go or run on an emulator

## Firestore Structure
- `menuItems` collection: Stores menu items (name, description, price, image, category)
- `orders` collection: Stores orders (created automatically by the app)

## Expo Deployment

### For Expo Go
You can share your project with others using:
```sh
npx expo start
```
- Share the QR code with testers or teammates. They can scan it using the Expo Go app on their mobile device.

### For EAS Build/Submit (App Store/Play Store)
- Use [EAS Build](https://docs.expo.dev/build/introduction/) to create production builds for iOS and Android.
- Use [EAS Submit](https://docs.expo.dev/submit/introduction/) to upload your builds to the App Store or Play Store.
- Follow the [Expo deployment guide](https://docs.expo.dev/eas-update/getting-started/) for detailed steps.

## Customization
- Add or update menu items in Firestore for real-time updates
- Tweak UI in `app/(tabs)/index.tsx`, `cart.tsx`, and `orders.tsx`

## License
MIT 
