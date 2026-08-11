---
title: "MCP နှင့် Tool Calling ကို နက်နက်နဲနဲ နားလည်ခြင်း"
description: "AI agent တွေ ဘယ်လို tools တွေကို ခေါ်သုံးကြသလဲ၊ Model Context Protocol (MCP) က ဘာကြောင့် အရေးကြီးလဲဆိုတာကို အခြေခံကနေ Laravel MCP server တည်ဆောက်ခြင်းအထိ ရှင်းပြထားပါတယ်။"
date: 2026-08-11
tags: ["mcp", "ai", "tool-calling", "laravel", "deep-dive"]
---

# MCP နှင့် Tool Calling ကို နက်နက်နဲနဲ နားလည်ခြင်း

AI model တွေဟာ text ကို ကောင်းကောင်း ဖန်တီးနိုင်ပေမယ့်၊ သူတို့ကိုယ်တိုင် database ကို query မလုပ်နိုင်ဘူး၊ file ကိုလည်း ဖတ်လို့မရဘူး၊ API ကိုလည်း ခေါ်လို့မရဘူး။ ဒီကွက်လပ်ကို ဖြည့်ပေးတာက **tool calling** ပါ။ ဒီ blog post မှာ tool calling ဘယ်လိုအလုပ်လုပ်လဲ၊ **Model Context Protocol (MCP)** က ဘာကြောင့်လိုအပ်လဲဆိုတာကို ရှင်းရှင်းလင်းလင်း ရှေ့ဆက်ရှင်းပြပါမယ်။

## Tool Calling ဆိုတာ ဘာလဲ

Tool calling (function calling လို့လည်း ခေါ်တတ်ပါတယ်) ဆိုတာ AI model တစ်ခုက စကားပြောနေရင်း "ဒီအလုပ်ကို လုပ်ဖို့ ငါ့မှာ tool တစ်ခု လိုတယ်" လို့ ဆုံးဖြတ်ပြီး၊ tool ရဲ့ name နဲ့ arguments ကို structured data အနေနဲ့ ထုတ်ပေးတဲ့ machanism ပါ။ Model ကိုယ်တိုင် tool ကို run တာမဟုတ်ဘဲ၊ application (client) ဘက်က tool ကို အမှန်တကယ် run ပြီး ရလဒ်ကို model ဆီ ပြန်ပို့ပေးရပါတယ်။

ဥပမာ - user က "ရန်ကုန်ရဲ့ ယနေ့ရာသီဥတု ဘယ်လိုလဲ" လို့ မေးလိုက်ရင်:

1. Model က ဒီမေးခွန်းကို ဖြေဖို့ `get_weather(location: "Yangon")` ဆိုတဲ့ tool တစ်ခု လိုအပ်တယ်လို့ ဆုံးဖြတ်ပါတယ်။
2. Model က tool name နဲ့ arguments ကို JSON format နဲ့ ထုတ်ပေးပါတယ် — text အနေနဲ့ မဟုတ်ဘဲ structured object အနေနဲ့ပါ။
3. Application က ဒီ request ကို လက်ခံပြီး weather API ကို အမှန်တကယ် ခေါ်ပါတယ်။
4. ရလဒ်ကို model ဆီ ပြန်ပို့ပေးပြီး၊ model က natural language ဖြင့် အဖြေကို ပြန်ဖွဲ့စည်းပါတယ်။

ဒီလို flow ကြောင့် model တွေဟာ static training data အပြင် **real-time, real-world data** တွေကို ချိတ်ဆက်သုံးနိုင်လာတာပါ။

## MCP မတိုင်ခင် - Integration ရဲ့ ပြဿနာ

Tool calling ကိုယ်တိုင်ဟာ standard တစ်ခုအနေနဲ့ ရှိပေမယ့်၊ **tool ကို ဘယ်လို define လုပ်မလဲ၊ ဘယ်လို discover လုပ်မလဲ၊ ဘယ်လို connect လုပ်မလဲ** ဆိုတာကတော့ platform တစ်ခုနဲ့ တစ်ခု မတူညီခဲ့ပါဘူး။ Developer တစ်ယောက်က Claude အတွက် integration တစ်ခု ရေးရင်၊ ChatGPT အတွက် ထပ်ရေးရ၊ တခြား agent framework အတွက် ထပ်ရေးရ — N tools × M clients ဆိုတဲ့ ပြင်းထန်တဲ့ combinatorial ပြဿနာ ဖြစ်လာပါတယ်။

Anthropic က ၂၀၂၄ နိုဝင်ဘာလမှာ **Model Context Protocol (MCP)** ကို open standard အနေနဲ့ မိတ်ဆက်ခဲ့ပါတယ်။ ရည်ရွယ်ချက်က ရှင်းရှင်းလေးပါ — AI application (client) တစ်ခုနဲ့ data/tool source (server) တစ်ခုကြားက ချိတ်ဆက်မှုကို standardize လုပ်ဖို့ပါ။ USB-C port ကို တခြား device တွေအားလုံးက အသုံးပြုသလိုမျိုး၊ MCP-compatible client တစ်ခုဟာ MCP-compatible server မည်သည့်ခုကိုမဆို ချိတ်ဆက်နိုင်ပါတယ်။

## MCP ရဲ့ Architecture

MCP မှာ core component သုံးမျိုး ပါဝင်ပါတယ်:

- **MCP Host** — Claude Desktop, IDE, ဒါမှမဟုတ် custom application လိုမျိုး AI ကို run နေတဲ့ program
- **MCP Client** — Host အထဲမှာ embed ဖြစ်နေတဲ့ connector တစ်ခု၊ server တစ်ခုနဲ့ 1:1 connection ကို ထိန်းသိမ်းပေးသူ
- **MCP Server** — Tool, resource, prompt တွေကို standardized protocol နဲ့ expose လုပ်ပေးတဲ့ program

Server တစ်ခုက capability သုံးမျိုးကို ပေးနိုင်ပါတယ်:

| Capability | ဘာလုပ်ပေးသလဲ | ဥပမာ |
|---|---|---|
| **Tools** | Model က ခေါ်နိုင်တဲ့ callable function | Order ကို database ထဲ query လုပ်ခြင်း၊ email ပို့ခြင်း |
| **Resources** | URI နဲ့ ဖတ်နိုင်တဲ့ data | Config file, database record |
| **Prompts** | ပြန်လည်အသုံးပြုနိုင်တဲ့ conversation template | Code review prompt template |

Client နဲ့ server ကြား communication ကို **JSON-RPC 2.0** protocol နဲ့ standardize လုပ်ထားပြီး၊ transport အနေနဲ့ STDIO (local process) သို့မဟုတ် HTTP/SSE (remote server) ကို သုံးလို့ရပါတယ်။

## MCP Flow ကို တစ်ဆင့်ချင်း

Client တစ်ခုက server တစ်ခုနဲ့ ချိတ်ဆက်ပြီး tool ကို ခေါ်တဲ့အခါ ဒီအဆင့်တွေ ဖြစ်ပေါ်ပါတယ်:

1. **Handshake** — Client က server ဆီ `initialize` request ပို့ပြီး protocol version, capabilities ကို exchange လုပ်ပါတယ်။
2. **Discovery** — Client က `tools/list` request ပို့ပြီး server ဘယ်ဟာတွေ ပေးနိုင်လဲဆိုတာ (tool name, description, input schema) စာရင်းယူပါတယ်။
3. **Injection** — Client က ဒီ tool list ကို model ရဲ့ system context ထဲ ထည့်ပေးပါတယ်။ Model က tool ဘယ်လောက်ရှိလဲ၊ ဘယ်လိုသုံးရလဲဆိုတာ ဒီအချိန်မှာ သိသွားပါတယ်။
4. **Invocation** — User request တစ်ခုက tool သုံးဖို့ လိုအပ်တယ်လို့ model က ဆုံးဖြတ်ရင်၊ client က `tools/call` request ကို server ဆီ ပို့ပါတယ်။
5. **Execution & Response** — Server က tool ကို run ပြီး ရလဒ်ကို ပြန်ပို့ပေးပါတယ်။ Client က ဒီရလဒ်ကို model ရဲ့ context ထဲ ပြန်ထည့်ပြီး၊ model က နောက်ဆုံး အဖြေကို ဖန်တီးပါတယ်။

Tool တစ်ခုချင်းစီမှာ **input schema** (JSON Schema format) ပါဝင်ရပါတယ် — ဒါကြောင့် model က argument name, type, ဘယ်ဟာ required လဲဆိုတာ တိတိကျကျ သိနိုင်ပါတယ်။ ဒါ့အပြင် **description** ကလည်း အရေးအကြီးဆုံးအချက်ပါ — model က tool ဘယ်အချိန်သုံးရမလဲဆိုတာ ဒီ description ကနေပဲ ဆုံးဖြတ်တာပါ။

## Tools vs Resources vs Prompts

သုံးမျိုးလုံးဟာ context ကို model ဆီ ပေးဖို့ ရည်ရွယ်ပေမယ့်၊ role ချင်း ကွာခြားပါတယ်:

- **Tool** — Action တစ်ခု "လုပ်" ဖို့ (side effect ရှိနိုင်တယ်)၊ model ကိုယ်တိုင် ဆုံးဖြတ်ပြီး ခေါ်တာ
- **Resource** — Data တစ်ခု "ဖတ်" ဖို့ (read-only)၊ URI နဲ့ reference လုပ်တာ
- **Prompt** — Template ကို user သို့မဟုတ် client က ရွေးချယ်သုံးတာ၊ model ကိုယ်တိုင် ဆုံးဖြတ်ပြီးမသုံးဘူး

ဒီကွာခြားချက်ကို နားလည်ထားရင် server ကို design လုပ်တဲ့အခါ tool ထားရမလား resource ထားရမလားဆိုတာ ရွေးရလွယ်ပါလိမ့်မယ်။

## MCP ကို ဘယ်တော့ သုံးသင့်သလဲ

MCP က ကောင်းတဲ့ solution ဖြစ်ပေမယ့်၊ case အားလုံးအတွက် လိုအပ်တာတော့ မဟုတ်ပါဘူး:

- **Developer တစ်ယောက်တည်း, context ရယူရုံ** — API တစ်ခုကို `curl` နဲ့ ခေါ်ရုံလောက်ဆိုရင် protocol layer တစ်ခု ထပ်ထည့်စရာ မလိုပါဘူး
- **Non-technical user တွေ ဝင်ရောက်သုံးမယ်** — Application ကို connect လုပ်ပြီး terminal command မသိဘဲ AI နဲ့ interact လုပ်ချင်ရင် MCP က အသင့်တော်ဆုံးပါ
- **Team ကြီးကြီး, client အမျိုးမျိုး** — Engineer ၅၀ ဆီက tool integration အသီးသီး ရေးနေရမယ့်အစား၊ MCP server တစ်ခုတည်းနဲ့ client အားလုံးကို ဝန်ဆောင်နိုင်ပါတယ်

## Laravel MCP — Laravel App ကို MCP Server ဖြစ်အောင် ပြောင်းလဲခြင်း

Laravel framework အတွက် official `laravel/mcp` package ရှိပါတယ်။ ဒါက Laravel Boost ကိုပါ power ပေးထားတဲ့ package ဖြစ်ပြီး၊ Laravel app တစ်ခုကို AI client တွေ (Claude, Cursor, ChatGPT စသည်) နဲ့ ချိတ်ဆက်နိုင်တဲ့ MCP server အဖြစ် အလွယ်တကူ ပြောင်းလဲပေးပါတယ်။

### Install လုပ်ခြင်း

```bash
composer require laravel/mcp
```

Route file ကို publish လုပ်ပါ:

```bash
php artisan vendor:publish --tag=ai-routes
```

ဒီ command က `routes/ai.php` file ကို ဖန်တီးပေးပြီး၊ ဒီ file ထဲမှာ MCP server တွေကို register လုပ်ရပါမယ်။

### Server တည်ဆောက်ခြင်း

```bash
php artisan make:mcp-server WeatherServer
```

ဒါက `app/Mcp/Servers/WeatherServer.php` မှာ server class တစ်ခု ဖန်တီးပေးပါတယ်:

```php
<?php

namespace App\Mcp\Servers;

use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;
use Laravel\Mcp\Server;

#[Name('Weather Server')]
#[Version('1.0.0')]
#[Instructions('This server provides weather information and forecasts.')]
class WeatherServer extends Server
{
    protected array $tools = [
        // CurrentWeatherTool::class,
    ];

    protected array $resources = [
        // WeatherGuidelinesResource::class,
    ];

    protected array $prompts = [
        // DescribeWeatherPrompt::class,
    ];
}
```

Server ကို `routes/ai.php` ထဲမှာ register လုပ်ပါ — remote client တွေအတွက် `Mcp::web()`, local Artisan tool အတွက် `Mcp::local()` ကို သုံးနိုင်ပါတယ်:

```php
use App\Mcp\Servers\WeatherServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::web('/mcp/weather', WeatherServer::class)
    ->middleware(['throttle:mcp']);
```

### Tool ဖန်တီးခြင်း

```bash
php artisan make:mcp-tool CurrentWeatherTool
```

Tool class တစ်ခုမှာ method နှစ်ခု အရေးကြီးပါတယ် — input schema ကို define လုပ်ဖို့ `schema()` နဲ့ actual logic ကို run ဖို့ `handle()`:

```php
<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tool;

#[Description('Fetches the current weather forecast for a specified location.')]
class CurrentWeatherTool extends Tool
{
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'location' => 'required|string|max:100',
            'units' => 'in:celsius,fahrenheit',
        ]);

        // Weather data ကို fetch လုပ်ခြင်း...

        return Response::text('The weather in ' . $validated['location'] . ' is sunny, 32°C.');
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'location' => $schema->string()
                ->description('The location to get the weather for.')
                ->required(),

            'units' => $schema->string()
                ->enum(['celsius', 'fahrenheit'])
                ->description('The temperature units to use.')
                ->default('celsius'),
        ];
    }
}
```

`#[Description]` attribute က အရေးအကြီးဆုံးအချက်ပါ — AI model က tool ကို ဘယ်အချိန်၊ ဘယ်လို သုံးရမလဲဆိုတာ ဒီ description ကနေ ဆုံးဖြတ်တာမို့ ရှင်းလင်းတိကျစွာ ရေးရပါမယ်။

Tool ကို server ရဲ့ `$tools` property ထဲ ထည့်ပြီး register လုပ်ပါ:

```php
class WeatherServer extends Server
{
    protected array $tools = [
        CurrentWeatherTool::class,
    ];
}
```

Laravel ရဲ့ service container ကနေတဆင့် dependency injection ကိုလည်း constructor သို့မဟုတ် `handle()` method ထဲမှာ တိုက်ရိုက် အသုံးပြုနိုင်ပါတယ်:

```php
class CurrentWeatherTool extends Tool
{
    public function handle(Request $request, WeatherRepository $weather): Response
    {
        $forecast = $weather->getForecastFor($request->get('location'));

        return Response::text($forecast);
    }
}
```

### Authentication ထည့်ခြင်း

Remote client တွေ အသုံးပြုမယ့် web server ဆိုရင် middleware နဲ့ authentication ထည့်သင့်ပါတယ်။ Sanctum token auth ကို ရိုးရှင်းစွာ ချိတ်ချင်ရင်:

```php
Mcp::web('/mcp/weather', WeatherServer::class)
    ->middleware('auth:sanctum');
```

OAuth 2.1 ကို Laravel Passport နဲ့ အသုံးပြုချင်ရင်လည်း package ကနေ ကိုယ်တိုင် support ပေးထားပါတယ်။

### Testing

Real client တစ်ခု connect မလုပ်ခင် built-in MCP Inspector နဲ့ စမ်းသပ်လို့ရပါတယ်:

```bash
php artisan mcp:inspector mcp/weather
```

Unit test ကိုလည်း ရေးနိုင်ပါတယ်:

```php
test('tool', function () {
    $response = WeatherServer::tool(CurrentWeatherTool::class, [
        'location' => 'New York City',
        'units' => 'fahrenheit',
    ]);

    $response
        ->assertOk()
        ->assertSee('The current weather in New York City is 72°F and sunny.');
});
```

## နိဂုံး

MCP ဟာ AI agent တွေနဲ့ application တွေကြား ချိတ်ဆက်မှုကို standardize လုပ်ပေးတဲ့ protocol ဖြစ်ပြီး၊ tool calling ရဲ့ N×M integration ပြဿနာကို ဖြေရှင်းပေးပါတယ်။ Tools, resources, prompts ဆိုတဲ့ capability သုံးမျိုးကို server တစ်ခုကနေ expose လုပ်ပေးနိုင်ပြီး၊ client မည်သည့်ခုကမဆို standard protocol တစ်ခုတည်းနဲ့ ချိတ်ဆက်နိုင်ပါတယ်။

Laravel developer တွေအတွက်ကတော့ `laravel/mcp` package ကြောင့် app တစ်ခုလုံးကို MCP server အဖြစ် ပြောင်းလဲဖို့ artisan command လေးနှစ်ခုလောက်ပဲ လိုအပ်ပါတော့တယ်။ Route register လုပ်ခြင်း၊ server class ဖန်တီးခြင်း၊ tool တစ်ခုရေးခြင်းနဲ့ MCP Inspector နဲ့ စမ်းသပ်ခြင်း — ဒါလေးတွေပဲ လိုအပ်ပါတယ်။ Team ကြီးတွေ AI client အမျိုးမျိုးနဲ့ Laravel app ကို ချိတ်ဆက်ချင်တဲ့အခါ ဒီ package ဟာ အလွန်အသုံးဝင်တဲ့ foundation တစ်ခု ဖြစ်ပါလိမ့်မယ်။