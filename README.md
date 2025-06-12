# 🍔 FoodApp

A modern, real-time food delivery app built with React Native (Expo) and Firebase Firestore.

![Expo](https://img.shields.io/badge/Expo-^49.0.0-blue?logo=expo)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-yellow?logo=firebase)
![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Features

- 🖼️ **Beautiful, user-friendly interface** for browsing food items
- ⚡ **Real-time menu and order updates** using Firebase Firestore
- 🛒 **Add to cart, adjust quantities, and place orders**
- 📦 **Order history and status tracking**
- 🚦 **Error handling and loading states**

---

## 📱 Screenshots

| Menu Screen | Cart Screen | Order History |
|-------------|-------------|--------------|
| ![Menu](assets/images/menu-demo.gif) | ![Cart](assets/images/cart-demo.gif) | ![Orders](assets/images/orders-demo.gif) |

> _Tip: You can use GIFs or static images. Place them in `assets/images/` and update the paths above._

---

## 🗂️ Project Structure

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

---

## 🚀 Getting Started

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

---

## 🔥 Firestore Structure

- `menuItems` collection: Stores menu items (name, description, price, image, category)
- `orders` collection: Stores orders (created automatically by the app)

---

## 📦 Expo Deployment

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

---

## 🛠️ Tech Stack

| Technology      | Description                |
|-----------------|---------------------------|
| React Native    | Cross-platform UI         |
| Expo            | Fast development workflow |
| Firebase        | Backend & real-time DB    |
| TypeScript      | Type safety               |

---

## 🗺️ Roadmap

- [ ] User authentication
- [ ] Favorites & ratings
- [ ] Live order tracking
- [ ] Push notifications
- [ ] Dark mode

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT

---

> _Made with ❤️ for food lovers!_ 
