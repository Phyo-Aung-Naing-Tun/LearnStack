---
title: "Ready to Apply: Using SVG Icon in React Native"
description: "Expo project တွေမှာ SVG icon setup လုပ်ပြီး အသုံးချနည်း အပြည့်အစုံ guide."
date: 2026-09-13
tags: ["react-native", "expo", "svg", "icon"]
---

# Ready to Apply: Using SVG Icon in React Native (Expo)

React Native (Expo) project တွေမှာ SVG icon ကို setup လုပ်ပြီး အသုံးချနည်း အပြည့်အစုံ guide။

---

## 1. Expo ဆိုတာဘာလဲ (အနှစ်ချုပ်)

Expo ဆိုတာ React Native အပေါ်မှာ တည်ဆောက်ထားတဲ့ framework/platform တစ်ခုဖြစ်ပြီး app develop, build, deploy လုပ်ရာမှာ ပိုလွယ်ကူအောင် ကူညီပေးပါတယ်။

| Feature | ရှင်းလင်းချက် |
|---|---|
| Setup | Native config (Xcode/Android Studio) ကိုယ်တိုင်မထိရဘဲ `npx create-expo-app` နဲ့ project စလို့ရ |
| Expo Go app | Phone ထဲ install ထားပြီး QR code scan ရုံနဲ့ app ကို run ကြည့်နိုင် |
| Built-in APIs | Camera, Location, Notifications စသည်တို့ကို native code ရေးစရာမလိုဘဲ သုံးလို့ရ |
| EAS Build | App Store/Play Store အတွက် build ကို cloud ပေါ်မှာ လုပ်ပေး (Mac မလိုဘဲ iOS build ရ) |
| OTA Updates | App store review မစောင့်ဘဲ JS code update ကို တိုက်ရိုက် push လုပ်နိုင် |

---

## 2. Package များ Install လုပ်ခြင်း

```bash
npx expo install react-native-svg
npm install --save-dev react-native-svg-transformer
```

> `expo install` က Expo SDK version နဲ့ compatible ဖြစ်တဲ့ version ကို အလိုအလျောက်ရွေးပေးပါတယ်။

---

## 3. metro.config.js Setup

Expo project အသစ်တွေမှာ `metro.config.js` default အနေနဲ့ မရှိတတ်လို့ အရင်ဆုံး generate လုပ်ပါ:

```bash
npx expo customize metro.config.js
```

ပြီးရင် ဒီအတိုင်းပြင်ပါ:

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
```

---

## 4. TypeScript သုံးရင် (Optional)

Root folder မှာ `declarations.d.ts` ဖန်တီးပါ:

```ts
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
```

---

## 5. Cache Clear ပြီး Dev Server Restart

```bash
npx expo start -c
```

`-c` flag က Metro bundler cache ကို clear လုပ်ပေးပါတယ် — config ပြောင်းပြီးတိုင်း ဒါလုပ်ပေးဖို့ လိုအပ်ပါတယ်။

---

## 6. SVG File များ ဘယ်ကရနိုင်လဲ

SVG ကို ကိုယ်တိုင် code ရေးစရာ **မလိုပါဘူး** — အောက်ပါ source တွေကနေ download/copy ယူရုံပါပဲ။

### Free Icon Libraries
- [Feather Icons](https://feathericons.com/) — ရိုးရှင်း၊ light-weight
- [Heroicons](https://heroicons.com/) — Tailwind team ဆောက်တာ
- [Lucide Icons](https://lucide.dev/) — Feather ရဲ့ fork၊ icon အများကြီးရှိ
- [Material Icons](https://fonts.google.com/icons) — Google standard icons
- [Iconify](https://icon-sets.iconify.design/) — icon set 100+ ကို တစ်နေရာတည်းရှာလို့ရ

### Figma Design
Designer က Figma ထဲမှာ ဆွဲထားရင် **Export as SVG** နဲ့ တိုက်ရိုက် download ရ။

### ဘယ်အချိန် ကိုယ်တိုင်ရေးရလဲ
- Library ထဲမှာမရှိတဲ့ custom design (company logo, unique illustration) ဖြစ်နေရင်
- ရှိပြီးသား SVG ကို path အနည်းငယ် adjust လုပ်ချင်ရင်

ဒီအခြေအနေမျိုးမှာတောင် Figma/Illustrator လို design tool နဲ့ ဆွဲပြီး export လုပ်တာက ကုတ်ရေးတာထက် ပိုအဆင်ပြေတယ်။

---

## 7. Folder Structure အကြံပြု

```
my-app/
├── assets/
│   └── icons/
│       ├── home.svg
│       ├── search.svg
│       ├── settings.svg
│       └── heart.svg
├── components/
│   └── icons/
│       └── index.js          👈 icon အားလုံးကို central export
├── metro.config.js
├── declarations.d.ts          (TypeScript ဆိုရင်)
└── App.js
```

### 7.1 `assets/icons/*.svg` — Raw SVG File များ

Icon library (Feather, Heroicons, etc.) ဒါမှမဟုတ် Figma ကနေ download ယူထားတဲ့ file တွေကို အပြောင်းအလဲမလုပ်ဘဲ ဒီထဲထည့်ရုံပါပဲ။ ဥပမာ `assets/icons/home.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M12 3l9 8h-3v9h-5v-6h-2v6H5v-9H2l10-8z"
    fill="currentColor"
  />
</svg>
```

> `fill="currentColor"` ထားခြင်းအားဖြင့် React component ကနေ `fill` prop ပေးလိုက်တာနဲ့ color ပြောင်းလို့ရသွားမယ် (Section 9 မှာ ထပ်ရှင်းထားပါတယ်)။

`search.svg`, `settings.svg`, `heart.svg` တို့ကိုလည်း အလားတူပုံစံနဲ့ ထည့်ပါ။

### 7.2 `components/icons/index.js` — Central Export File

Icon file တစ်ခုချင်းစီကို `./assets/icons/home.svg` စတဲ့ path ရှည်ရှည်နဲ့ တခြားနေရာတွေမှာ မကိုးကားချင်လို့ ဒီ file တစ်ခုတည်းကနေ collect လုပ်ပြီး export လုပ်ထားပါတယ်:

```js
// components/icons/index.js

export { default as HomeIcon } from '../../assets/icons/home.svg';
export { default as SearchIcon } from '../../assets/icons/search.svg';
export { default as SettingsIcon } from '../../assets/icons/settings.svg';
export { default as HeartIcon } from '../../assets/icons/heart.svg';
```

**ဒီလိုရေးထားရင် ဘာကောင်းလဲ?**

```jsx
// ❌ index.js မရှိရင် — path ရှည်ရှည်နဲ့ တစ်ခုချင်းစီ import လုပ်ရ
import HomeIcon from '../../../assets/icons/home.svg';
import SearchIcon from '../../../assets/icons/search.svg';

// ✅ index.js ရှိရင် — တစ်နေရာတည်းကနေ တစ်ခါတည်း import လုပ်လို့ရ
import { HomeIcon, SearchIcon } from '../../components/icons';
```

Icon အသစ်တစ်ခု ထပ်ထည့်ချင်တိုင်း `index.js` ထဲမှာ line တစ်ကြောင်းပဲ ထပ်ထည့်ရင် ရပါပြီ — project အနှံ့က import path တွေကို ပြန်ပြင်စရာမလိုတော့ပါဘူး။

### Component ထဲမှာ သုံးခြင်း

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HomeIcon, SearchIcon, HeartIcon } from './components/icons';

export default function App() {
  return (
    <View style={styles.row}>
      <HomeIcon width={28} height={28} fill="#333" />
      <SearchIcon width={28} height={28} fill="#333" />
      <HeartIcon width={28} height={28} fill="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    padding: 20,
  },
});
```

---

## 8. Reusable Icon Wrapper Component (Bonus)

App တစ်ခုလုံးမှာ icon size/color consistent ဖြစ်အောင် wrapper ဆောက်ထားရင် ပိုအဆင်ပြေတယ်:

```jsx
// components/Icon.js
import React from 'react';
import * as Icons from './icons';

export default function Icon({ name, size = 24, color = '#000', ...props }) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent width={size} height={size} fill={color} {...props} />;
}
```

သုံးရင်:

```jsx
<Icon name="HomeIcon" size={32} color="#3498db" />
<Icon name="HeartIcon" size={32} color="#e74c3c" />
```

---

## 9. Tip: Dynamic Color အတွက် `currentColor`

SVG file ထဲမှာ `fill="#000000"` လို hardcode ထားရင် prop နဲ့ color ပြောင်းလို့မရပါဘူး။ Text editor နဲ့ဖွင့်ပြီး ဒီလိုပြောင်းပါ:

```svg
<!-- before -->
<path fill="#000000" d="..." />

<!-- after -->
<path fill="currentColor" d="..." />
```

ဒါလုပ်ထားရင် `<Icon name="HomeIcon" color={theme.primary} />` ဆိုပြီး theme-based color control လုပ်လို့ရသွားပါမယ်။

---

## 10. Alternative: JSX ထဲ SVG တိုက်ရိုက်ရေးခြင်း

Icon အနည်းငယ်ပဲရှိရင် transformer setup မလိုဘဲ ဒီလိုသုံးလို့ရပါတယ်:

```jsx
import Svg, { Path } from 'react-native-svg';

function HeartIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d="M12 21.35l-1.45-1.32..." fill="#e74c3c" />
    </Svg>
  );
}
```

---

## 11. Alternative: Icon Library Package

Standard icon (home, search, settings) တွေပဲသုံးမယ်ဆိုရင် library တစ်ခုလုံးသုံးတာ အမြန်ဆုံးနည်း:

```bash
npm install react-native-vector-icons
```

```jsx
import Icon from 'react-native-vector-icons/MaterialIcons';

<Icon name="home" size={30} color="#900" />
```

---

## အကျဉ်းချုပ် — ဘယ်နည်းသုံးသင့်လဲ

| Case | Method |
|---|---|
| Custom design (Figma export) icon | Method 1: `react-native-svg-transformer` |
| Icon အနည်းငယ်ပဲ / dynamic path | Method 2: `<Svg>` JSX တိုက်ရိုက်ရေး |
| Standard icon (home, search, settings) | Method 3: `react-native-vector-icons` |

> **⚠️ Note:** Expo Go app ကနေ run ကြည့်ရင် ဒီ setup အားလုံး အလုပ်လုပ်ပါလိမ့်မယ် (`react-native-svg` က Expo Go မှာ built-in ရှိပြီးသား)။ Custom native module ထပ်ထည့်ချင်မှသာ Development Build (`npx expo run:android` / `run:ios`) လိုအပ်ပါမယ်။