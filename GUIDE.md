# ဘလော့ဂ် နှင့် သင်ခန်းစာများ ထည့်သွင်းနည်း (မြန်မာဘာသာ)

ဒီစာမျက်နှာမှာ **ဘလော့ဂ်ပို့စ်အသစ်** နှင့် **သင်ခန်းစာအသစ်** တွေ ဘယ်လိုထည့်ရမလဲဆိုတာ အဆင့်ဆင့် ရှင်းပြထားပါတယ်။

---

## 📝 ဘလော့ဂ် ပို့စ်အသစ် ထည့်နည်း

### အဆင့် ၁ — Markdown ဖိုင်ဖန်တီးပါ

`content/blog/` ဖိုလ်ဒါထဲမှာ ဖိုင်အသစ်တစ်ခု ဖန်တီးပါ။ ဖိုင်နာမည်က **အင်္ဂလိပ်လို** ပေးရပါမယ်။ ဥပမာ - `my-new-post.md`

```
content/blog/my-new-post.md
```

### အဆင့် ၂ — Frontmatter ရေးပါ

ဖိုင်ရဲ့ အပေါ်ဆုံးမှာ `---` နှစ်ကြောင်းကြားထဲ Frontmatter ထည့်ပါ။

```yaml
---
title: "ပို့စ်ခေါင်းစဉ်"
description: "ဒီပို့စ်အကြောင်း အတိုချုပ်"
date: 2026-08-10
tags: ["nuxt", "vue", "tutorial"]
---
```

| Field | ရှင်းလင်းချက် | မဖြစ်မနေလား |
|-------|------------|:---:|
| `title` | ပို့စ်ခေါင်းစဉ် | ✅ |
| `description` | ပို့စ်အကြောင်း အတိုချုပ် (စာကြောင်း ၁-၂ ကြောင်း) | ✅ |
| `date` | ရက်စွဲ (YYYY-MM-DD ပုံစံ) | ✅ |
| `tags` | တက်ဂ်များ (အင်္ဂလိပ်လို) | ❌ |

### အဆင့် ၃ — အကြောင်းအရာ ရေးပါ

Frontmatter အောက်မှာ Markdown format နဲ့ အကြောင်းအရာ ရေးပါ။

```markdown
---
title: "Nuxt နဲ့ API ခေါ်နည်း"
description: "useFetch နဲ့ useAsyncData အသုံးပြုပုံ"
date: 2026-08-10
tags: ["nuxt", "api"]
---

# Nuxt နဲ့ API ခေါ်နည်း

Nuxt မှာ data fetch လုပ်ဖို့ နည်းလမ်း ၂ ခု ရှိပါတယ်။

## useFetch

```ts
const { data } = await useFetch('/api/posts')
```

## useAsyncData

```ts
const { data } = await useAsyncData('posts', () =>
  $fetch('/api/posts')
)
```

နှစ်ခုလုံးက auto-refresh လုပ်ပေးပါတယ်။
```

### အဆင့် ၄ — စစ်ဆေးပါ

ဆာဗာကို restart လုပ်စရာ မလိုပါဘူး။ `npm run dev` လုပ်ထားရင် သူ့ဘာသာ auto-reload လုပ်ပါလိမ့်မယ်။

`http://localhost:3000/blog` မှာ ပို့စ်အသစ် ပေါ်လာမလား စစ်ကြည့်ပါ။

---

## 📚 သင်ခန်းစာအသစ် ထည့်နည်း

### အဆင့် ၁ — သင်ခန်းစာ ဖိုလ်ဒါ ဖန်တီးပါ

`content/tutorials/` အောက်မှာ သင်ခန်းစာအတွက် ဖိုလ်ဒါအသစ် လုပ်ပါ။ ဖိုလ်ဒါနာမည်က **အင်္ဂလိပ်လို၊ စာလုံးသေး၊ တုံးတို (-) ခြား**ပြီး ပေးပါ။

```
content/tutorials/my-python-course/
```

### အဆင့် ၂ — Series Index ဖိုင် ဖန်တီးပါ

`index.md` ဆိုတဲ့ ဖိုင်တစ်ခု ဖန်တီးပါ။ ဒါက သင်ခန်းစာရဲ့ မိတ်ဆက်စာမျက်နှာ ဖြစ်ပါတယ်။

```
content/tutorials/my-python-course/index.md
```

```yaml
---
title: "Python ကို ၃ ရက်အတွင်း လေ့လာမယ်"
description: "Python programming အခြေခံကို ၃ ရက်တည်းနဲ့ တတ်မြောက်အောင် လေ့လာပါ။"
series: "my-python-course"
seriesTitle: "Python ကို ၃ ရက်အတွင်း လေ့လာမယ်"
seriesDescription: "Python programming အခြေခံ"
dayCount: 3
---

# Python ကို ၃ ရက်အတွင်း လေ့လာမယ်

ဒီသင်ခန်းစာမှာ Python ရဲ့ အခြေခံတွေကို ၃ ရက်နဲ့ လေ့လာသွားပါမယ်။
```

| Field | ရှင်းလင်းချက် | မဖြစ်မနေလား |
|-------|------------|:---:|
| `title` | သင်ခန်းစာခေါင်းစဉ် | ✅ |
| `description` | အတိုချုပ် | ✅ |
| `seriesTitle` | Sidebar မှာပြမယ့် ခေါင်းစဉ် | ✅ |
| `seriesDescription` | Sidebar မှာပြမယ့် အတိုချုပ် | ✅ |
| `dayCount` | စုစုပေါင်း ရက်အရေအတွက် | ❌ |

### အဆင့် ၃ — နေ့စဉ် သင်ခန်းစာဖိုင်များ ဖန်တီးပါ

နေ့တိုင်းအတွက် သီးခြားဖိုင် ဖန်တီးပါ။ ဖိုင်နာမည်က **နံပါတ်သက်သက်** (`.md` နဲ့ဆုံး) ဖြစ်ရပါမယ်။

```
content/tutorials/my-python-course/1.md
content/tutorials/my-python-course/2.md
content/tutorials/my-python-course/3.md
```

**၁.md** (ပထမနေ့):
```yaml
---
title: "Day 1: Python အခြေခံ"
description: "Variables, data types နဲ့ print function"
series: "my-python-course"
seriesTitle: "Python ကို ၃ ရက်အတွင်း လေ့လာမယ်"
seriesDescription: "Python programming အခြေခံ"
day: 1
---

# Day 1: Python အခြေခံ

Python မှာ variable တွေ ဘယ်လိုသုံးလဲ လေ့လာကြည့်ရအောင်။

## Variables

```python
name = "Aung"
age = 25
print(f"Hello, {name}! You are {age} years old.")
```
```

**၂.md** (ဒုတိယနေ့):
```yaml
---
title: "Day 2: Loop နဲ့ Condition"
description: "if-else နဲ့ for loop တွေ အသုံးပြုပုံ"
series: "my-python-course"
day: 2
---

# Day 2: Loop နဲ့ Condition

...
```

| Field | ရှင်းလင်းချက် | မဖြစ်မနေလား |
|-------|------------|:---:|
| `title` | ဒီနေ့အတွက် ခေါင်းစဉ် | ✅ |
| `description` | ဒီနေ့အတွက် အတိုချုပ် | ✅ |
| `day` | နေ့နံပါတ် (၁, ၂, ၃ ...) | ✅ |
| `series` | သင်ခန်းစာဖိုလ်ဒါနာမည် | ✅ |
| `seriesTitle` | Sidebar ခေါင်းစဉ် (ပထမနေ့မှာပဲထည့်လည်းရ) | ❌ |
| `seriesDescription` | Sidebar အတိုချုပ် (ပထမနေ့မှာပဲထည့်လည်းရ) | ❌ |

### အဆင့် ၄ — စစ်ဆေးပါ

- `http://localhost:3000/tutorials` — သင်ခန်းစာအသစ်ပေါ်လား
- `http://localhost:3000/tutorials/my-python-course` — နေ့စဉ်စာရင်းပေါ်လား
- `http://localhost:3000/tutorials/my-python-course/1` — ပထမနေ့ content ပေါ်လား

---

## 💡 Code Blocks ရေးနည်း

Code block တွေကို backtick ၃ ခု (\`\`\`) နဲ့ ရေးပါ။ Language ကိုပါ ထည့်ပေးရင် syntax highlighting နဲ့ copy button ပါလာပါမယ်။

````markdown
```python
def hello(name):
    return f"Hello, {name}!"
```

```bash
npm install @nuxt/content
```

```ts
interface User {
  name: string
  age: number
}
```
````

---

## 🏷️ Frontmatter Reference (အပြည့်အစုံ)

### Blog Posts အတွက်

```yaml
---
title: "ခေါင်းစဉ်"
description: "အတိုချုပ်"
date: 2026-08-10
tags: ["tag1", "tag2"]
---
```

### Tutorial Series Index (index.md) အတွက်

```yaml
---
title: "ခေါင်းစဉ်"
description: "အတိုချုပ်"
series: "folder-name"
seriesTitle: "Sidebar ခေါင်းစဉ်"
seriesDescription: "Sidebar အတိုချုပ်"
dayCount: 5
---
```

### Tutorial Day အတွက်

```yaml
---
title: "Day 1: ခေါင်းစဉ်"
description: "အတိုချုပ်"
series: "folder-name"
day: 1
seriesTitle: "Sidebar ခေါင်းစဉ်"       # optional
seriesDescription: "Sidebar အတိုချုပ်"  # optional
---
```

---

## ⚠️ အရေးကြီး မှတ်ချက်များ

### ၁။ ဖိုင်နာမည် သတ်မှတ်ချက်
- Blog ဖိုင်တွေ — `hello-world.md`၊ `my-post.md` စသဖြင့် (အင်္ဂလိပ်လို၊ တုံးတိုခြား)
- Tutorial index — **`index.md`** လို့ပဲ ပေးရပါမယ်
- Tutorial day — **`1.md`၊ `2.md`၊ `3.md`** စသဖြင့် နံပါတ်သက်သက်

### ၂။ date ပုံစံ
`YYYY-MM-DD` ပုံစံနဲ့ပဲ ရေးပါ။ ဥပမာ `2026-08-10`။ တခြားပုံစံနဲ့ရေးရင် error တက်ပါမယ်။

### ၃။ day field
Tutorial day တွေမှာ `day` က နံပါတ် (number) ဖြစ်ရပါမယ်။ `"1"` မဟုတ်ဘဲ `1` လို့ရေးပါ။

### ၄။ Content အသစ်ထည့်ပြီးရင်
ဆာဗာကို restart လုပ်စရာ မလိုပါ။ Nuxt dev server က auto-reload လုပ်ပေးပါတယ်။ ဒါပေမယ့် `content.config.ts` ကို ပြင်ရင် restart လုပ်ဖို့လိုပါတယ်။

### ၅။ မြန်မာစာ
Content ထဲမှာ မြန်မာစာ ရေးလို့ရပါတယ်။ Tailwind Typography က Unicode ကို support လုပ်ပါတယ်။
