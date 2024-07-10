# Vue.js 從零開始：i18n 國際化

## 一、簡介 i18n

i18n 是 "internationalization"（國際化）的縮寫，18 是因為單詞 "internationalization" 的頭尾字母 i 和 n 之間有 18 個字母。i18n 的目標是使軟體能夠支持多種語言和地區，從而使其能夠被全球不同的用戶使用。

![image](./images/vue-i18n.png)

## 二、Vue.js 的 i18n 安裝與配置

### 技術選型

> vue-i18n

**官方網站：** https://vue-i18n.intlify.dev/

### 安裝與配置

1. **安裝 vue-i18n**

```bash
	npm install vue-i18n@9
```

1. **在 `main.ts` 中配置 Vue I18n**

作為 Vue.js 的插件，vue-i18n 需要在 `main.ts` 中註冊。建議在新的 Vue.js 專案中使用 **Composition API**，並將 `legacy` 屬性設置為 `false`，以啟用 **Composition API** 功能。

```typescript
// main.ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// 定義翻譯信息
const messages = {
  'zh-TW': {
    login: '登入',
    register: '註冊',
  },
  'en-US': {
    login: 'Login',
    register: 'Register',
  },
}

// 創建 i18n 實例
const i18n = createI18n({
  legacy: false, // 開啟 Composition API 支持
  locale: 'zh-TW', // 設定預設語言
  messages,
})

// 創建 Vue 應用
const app = createApp(App)

// 使用 i18n 插件
app.use(i18n)

// 挂載應用
app.mount('#app')
```

## 如何測試是否安裝成功？

在組件中使用翻譯功能非常簡單，您可以通過 `t` 函數來獲取翻譯內容。

```vue
<!-- i18n-demo.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div>{{ t('login') }}</div>
  <div>{{ t('register') }}</div>
</template>
```

### 語言切換測試

分別測試 `createI18n()` 的 `locale` 屬性配置為 `zh-TW` 與 `en-US`，確認是否能成功切換語言。

### vue-i18n 的重要配置參數說明

`createI18n` 的重要配置參數如下：

- `legacy`: 預設為 `true`。設置為 `false` 支援 Composition API 寫法。
- `locale`: 設置 Vue.js 的語言。
- `fallbackLocale`: 當 `$t` 翻譯 API 查無對應語言時，回退使用的語言包。
- `globalInjection`: 是否自動注入 `$t` 到每個 Vue 組件中。
- `messages`: 用於 `$t` 翻譯 API 的語言訊息。結構為層級物件，頂層屬性為語言名稱（如 `en-US`）。

官方文檔：https://vue-i18n.intlify.dev/api/general.html#createi18n

以下是配置示例：

```ts
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  messages: {
    'zh-TW': {
      login: '登入',
      register: '註冊',
    },
    'en-US': {
      login: 'Login',
      register: 'Register',
    },
  },
})
```

## 🐣 i18n 語言包資料夾結構：基礎版

為了方便管理語言包並使配置更簡潔，語言包的資料夾結構可以參考以下配置。

:::tip 📃 TIP
語言包資料夾名稱慣例通常為 `locales` 或是 `locale`。

vue-i18n 官網範例是使用 `locales`，較有名的第三方 UI 套件 Ant Design、Arco Design 則是使用 `locale`。
:::

```bash
// 資料夾結構
src
├─locales
│      en-US.json
│      index.ts
│      zh-TW.json
```

```tsx
// src/locales/index.ts
import { createI18n } from 'vue-i18n'

import tw from './zh-TW.json'
import us from './en-US.json'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  messages: {
    'zh-TW': tw,
    'en-US': us,
  },
})

export default i18n
```

### 範例語言包

```json
// src/locales/zh-TW.json
{
  "app.logo-name": "前端學塘",
  "header.featured-courses": "精選課程",
  "hero.slogan": "前端學塘，{newline}讓醜小鴨前端程式{newline}像變身的{slogan-focus}",
  "hero.slogan-focus": "天鵝一樣優雅",
  "nav.login": "登入",
  "nav.register": "註冊",
  "button.how-to-begin": "如何開始",
  "button.sample-video": "範例影片",
  "button.begin-to-learn": "上課去"
}
```

```json
// src/locales/en-US.json
{
  "app.logo-name": "Front-end Academy",
  "header.featured-courses": "Featured Courses",
  "hero.slogan": "Front-end Academy, {newline}transforming front-end programming{newline} from an ugly duckling into {slogan-focus}",
  "hero.slogan-focus": "an elegant swan",
  "nav.login": "login",
  "nav.register": "register",
  "button.how-to-begin": "How to begin",
  "button.sample-video": "Sample Video",
  "button.begin-to-learn": "learning"
}
```

### 應用 i18n 配置

```tsx
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales'

const app = createApp(App)

app.use(i18n)
app.mount('#app')
```

## 🦢 i18n 語言包資料夾結構：規模化

在多人團隊開發中，共同編輯一份 i18n 語言包文件容易導致版本控制衝突。以下是一些進階的資料夾結構解決方案，可視情況混合使用。

### 01、模組化

將大型的語言包文件拆分成多個小文件，可按功能模組或頁面分開。

### 拆開前

```csharp
src
├─locales
│      en-US.json
│      index.ts
│      zh-TW.json
```

### 拆開後

```bash
src
├─locales
│      en-US
│           moduleA.json
│           moduleB.json
│      zh-TW
│           moduleA.json
│           moduleB.json
│      index.ts
```

### 02、就近原則 (Colocation)

模組化後的語言包資料夾檔案結構，也可以採用**就近原則 (Colocation)**，將個別的語言包直接依附於對應模組或頁面的個別 `locales` 資料夾。並使用 index.ts 索引方式合併回 `src/locales/index.ts`。

:::tip
採用就近原則規劃 (Colocation) 資料夾結構時，也要記得考慮團隊協作與第三方套件 (ex. i18n-ally) 的配置適應性。
:::

### 03、獨立語言包

無論是模組化還是使用變體就近原則，將大型語言包拆分成多個小文件時，`index.ts` 索引仍可能發生版本衝突。如果某個語言包不需要加入總索引 `src/locales/index.ts`，可以使用例如 **Composable API** 的方式，直接讀取該語言包，而無需將其加入總索引 `src/locales/index.ts`。

### 04、SFC 單一檔案化

vue-i18n 支援將個別的語言包直接內嵌在單文件組件 (SFC) 檔案中。

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div>{{ t('login') }}</div>
</template>

<i18n>
{
    "zh-TW": {
        "login": "登錄 (SFC 用法)"
    },
    "en-US": {
        "login": "Login (SFC usage)"
    }
}
</i18n>
```

### 安裝與配置

要直接將語言包內嵌在 SFC 檔案中，需要額外安裝 **unplugin-vue-i18n**，目前支援 Vite 和 Webpack。

### 安裝方式

```bash
npm install @intlify/unplugin-vue-i18n -D
```

### 配置方式 (Vite 版本)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      /* options */
    }),
  ],
})
```

## 語言包的結構

### Flat (平坦) V.S. Nested (嵌套)

如果語言包內容較簡單，鍵值對數量不多，並且希望快速查找和訪問，可以選擇平坦結構。

如果語言包內容較為複雜，包含多層次的分類和組織，需要清晰的層級關係，建議選擇嵌套結構。

在實際應用中，也可以結合兩種結構的優點，根據具體情況進行設計。例如，可以在嵌套結構中使用扁平化的命名方式，以平衡查找速度和層級關係的清晰度。

### Flat (平坦)

```tsx
{
  "app.title": "我的應用程式",
  "menu.home": "首頁",
  "menu.about": "關於",
  "menu.contact": "聯絡我們",
  "contact.title": "聯絡我們",
  "contact.email": "電子郵件",
  "contact.phone": "電話"
}
```

### Nested (嵌套)

```tsx
{
  "app": {
    "title": "我的應用程式"
  },
  "menu": {
    "home": "首頁",
    "about": "關於",
    "contact": "聯絡我們"
  },
  "contact": {
    "title": "聯絡我們",
    "email": "電子郵件",
    "phone": "電話"
  }
}
```

## 三、增加 Vue.js 的 i18n 開發品質與效率

## 使用 Typescript

使用 TypeScript 定義語言包的結構和類型，確保鍵值的一致性和正確性。

```ts
import { createI18n } from 'vue-i18n'

import tw from './zh-TW.json'
import us from './en-US.json'

type MessageSchema = typeof tw

const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US'>({
  legacy: false,
  locale: 'zh-TW',
  messages: {
    'zh-TW': tw,
    'en-US': us,
  },
})

export default i18n
```

## VSCode 套件 i18n-ally

VSCode 的 i18n-ally 是一款專為國際化 (i18n) 設計的 Visual Studio Code 擴展工具。它的主要用途包括：

1. **簡化翻譯管理**：提供一個方便的介面來管理和編輯不同語言的翻譯文件，支持多種翻譯格式，如 JSON、YAML、JS、TS 等。
2. **即時翻譯檢查**：實時檢查翻譯文件中的錯誤和缺失，幫助開發者快速發現和修復問題。
3. **自動補全**：在編寫代碼時提供翻譯鍵的自動補全功能，提高開發效率。
4. **可視化翻譯**：在編輯器中以可視化方式展示翻譯文本，便於查看和管理不同語言的翻譯內容。
5. **語言切換**：支持快速切換不同語言，方便測試和查看翻譯效果。

### 安裝方式

要在 Visual Studio Code 中安裝 i18n-ally 插件，可以按照以下步驟進行：

1. **打開 VSCode**：
   確保你已經安裝並打開了 Visual Studio Code 編輯器。
2. **進入擴展管理頁面**：
   點擊左側活動欄中的擴展圖標，或者使用快捷鍵 `Ctrl+Shift+X`（Windows/Linux）或 `Cmd+Shift+X`（macOS）打開擴展管理頁面。
3. **搜索 i18n-ally**：
   在擴展管理頁面的搜索欄中輸入 "i18n-ally"。
4. **安裝插件**：
   在搜索結果中找到 "i18n-ally" 插件，點擊 "Install" 按鈕進行安裝。
5. **重啟 VSCode**
   安裝完成後，建議重啟 VSCode 以確保插件正常工作。

### 配置方式

常見的配置參數說明：

`i18n-ally.localesPaths` 用於指定存放 Vue.js 語言包的路徑。讓 i18n-ally 能夠讀取和管理不同語言的翻譯內容。

`i18n-ally.keystyle` 用於設定翻譯鍵的命名風格。

`i18n-ally.sourceLanguage` 用於指定 Vue.js 的原始語言。用於參考和翻譯成其他語言。

`i18n-ally.displayLanguage` 開發人員套用 i18n-ally 在 VSCode 顯示看的語言，如果想透過 VSCode 自由切換，可以不配置。

```json
// .vscode/settings.json
{
  /* ... */

  "i18n-ally.localesPaths": ["src/**/locales"],
  "i18n-ally.keystyle": "flat",
  "i18n-ally.sourceLanguage": "zh-TW",
  "i18n-ally.displayLanguage": "zh-TW"
}
```

> 參考文檔：https://github.com/lokalise/i18n-ally/wiki/Configurations

## 四、i18n 常見需求實作方式

## 動態加載語言包

為了優化性能並減少初始加載時間，我們可以在需要時動態載入所需的語言包。以下是動態加載語言包的範例。

### 資料夾結構

```txt
src
├─locales
│      en-US.json
│      index.ts
│      zh-TW.json
```

### 動態加載語言包的配置

```ts
// src/locales/index.ts
import { createI18n } from 'vue-i18n'
import tw from './zh-TW.json'

// 創建 i18n 實例，並設置預設語言為 zh-TW
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  messages: { 'zh-TW': tw },
})

// 使用 import.meta.glob 動態導入語言包
const locales = import.meta.glob('./*.json', { import: 'default' })

// 動態設置語言
export async function setLocale(locale) {
  // 如果語言已經加載，直接設置為當前語言
  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale
    return
  }

  // 動態加載語言包並設置為當前語言
  const messages = await loadLocaleMessages(locale)
  i18n.global.setLocaleMessage(locale, messages)
  i18n.global.locale.value = locale
}

// 加載語言包
async function loadLocaleMessages(locale) {
  const localePath = `./${locale}.json`
  if (locales[localePath]) {
    return await locales[localePath]()
  } else {
    throw new Error(`${locale} not found`)
  }
}

export default i18n
```

## 不同語系對應不同 CSS 樣式

在一些情況下，我們可能需要根據不同的語系應用不同的 CSS 樣式。以下是示範如何實現：

### 範例代碼

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>
<template>
  <div class="text-hero" :class="locale">
    {{ t('hero.slogan') }}
  </div>
</template>
<style lang="scss" scoped>
.text-hero {
  @apply leading-[150%] text-[48px]
    &.en-US {
    @apply leading-[135%] text-[40px];
  }
}
</style>
```

在此範例中，我們使用 `:class="locale"` 動態綁定語言相關的樣式類別，並根據當前語言應用不同的 CSS 樣式。

## HTML Tag in i18n

有時我們需要在翻譯中使用 HTML 標籤來格式化文本，建議不使用 v-html 的方式。vue-i18n 提供了 `i18n-t` 組件來實現這個功能。這個方式在 vue-i18n，稱為 Component Interpolation。

這是通過 `i18n-t` 組件插入 HTML 標籤的一個範例：

```tsx
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
</script>
<template>
      <div class="text-hero">
          <i18n-t keypath="hero.slogan" scope="global">
              <template #newline> <br /> </template>
              <template #slogan-focus>
                  <span class="text-focus">
                      {{ t('hero.slogan-focus') }}
                  </span>
              </template>
          </i18n-t>
      </div>
</template>
```

### 語言包配置

```json
// zh-TW.json
{
  "hero.slogan": "前端學塘，{newline}讓醜小鴨前端程式{newline}像變身的{slogan-focus}",
  "hero.slogan-focus": "天鵝一樣優雅"
}
```

在此範例中，我們在翻譯字符串中使用 `{newline}` 和 `{slogan-focus}` 作為插槽佔位符，並在 `i18n-t` 組件中使用相應的模板來插入 HTML 標籤。
