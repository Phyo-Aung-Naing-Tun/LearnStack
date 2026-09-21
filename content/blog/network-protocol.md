---

title: "Network Protocol များကို နားလည်ခြင်း — TCP/UDP မှ HTTP, HTTPS နှင့် SSH အထိ"

description: "Network Protocol, TCP, UDP, IP Address, Port, HTTP, HTTPS, SSH နှင့် Firewall တို့ကို Beginner များအတွက် အခြေခံမှစ၍ နားလည်လွယ်အောင် ရှင်းပြထားသော လမ်းညွှန်။"

date: 2026-09-21

## tags: ["networking", "protocol", "tcp", "udp", "http", "https", "ssh", "firewall", "beginner"]

# Network Protocol ဆိုတာဘာလဲ?

ကျွန်တော်တို့ Internet အသုံးပြုတဲ့အခါ Computer, Server, Phone စတဲ့ Device တွေဟာ တစ်ခုနဲ့တစ်ခု အမြဲတမ်း ဆက်သွယ်နေကြပါတယ်။

ဥပမာ—

* Browser က Web Server နဲ့ ဆက်သွယ်တယ်
* SSH သုံးပြီး Linux Server ထဲကို ဝင်တယ်
* Mobile App က API Server ကို Request ပို့တယ်
* Online Game က Game Server နဲ့ Data အမြဲပို့နေတယ်

ဒီလို Computer တွေအချင်းချင်း ဆက်သွယ်ဖို့ **စည်းမျဉ်း (Rules)** တွေလိုပါတယ်။

အဲဒီစည်းမျဉ်းတွေကို **Protocol** လို့ခေါ်ပါတယ်။

---

## Protocol ဆိုတာဘာလဲ?

**Protocol** ဆိုတာ Computer တွေ၊ Device တွေ၊ Server တွေ အချင်းချင်း ဆက်သွယ်တဲ့အခါ လိုက်နာရမယ့် **စည်းမျဉ်းများ (Rules)** ဖြစ်ပါတယ်။

လူနှစ်ယောက် စကားပြောတဲ့အခါလည်း စည်းမျဉ်းတချို့ရှိပါတယ်။

ဥပမာ—

* ဘယ်ဘာသာစကားနဲ့ ပြောမလဲ?
* စကားကို ဘယ်လိုစမလဲ?
* မေးခွန်းကို ဘယ်လိုမေးမလဲ?
* တစ်ဖက်လူက နားလည်မလည် ဘယ်လိုသိမလဲ?

Computer တွေမှာလည်း ဒီလို စည်းမျဉ်းတွေလိုပါတယ်။

```text
Computer A
    |
    |  Protocol
    |
    v
Computer B
```

Protocol က အောက်ပါအရာတွေကို သတ်မှတ်ပေးနိုင်ပါတယ်။

* Communication ကို ဘယ်လိုစမလဲ
* Data ကို ဘယ်လို Format လုပ်မလဲ
* Data ကို ဘယ်လိုပို့မလဲ
* Data ကို ဘယ်လိုလက်ခံမလဲ
* Error ဖြစ်ရင် ဘယ်လိုလုပ်မလဲ
* Communication ကို ဘယ်လိုအဆုံးသတ်မလဲ

Protocol မရှိဘူးဆိုရင် Computer တစ်လုံးနဲ့တစ်လုံး အတူတကွ နားလည်နိုင်အောင် ဆက်သွယ်ဖို့ ခက်ခဲသွားပါလိမ့်မယ်။

---

# အသုံးများတဲ့ Network Protocol များ

Network မှာ Protocol အမျိုးအစား အများကြီးရှိပါတယ်။

အချို့ကိုကြည့်ရအောင်။

| Protocol | အသုံးပြုတဲ့နေရာ                             |
| -------- | ------------------------------------------- |
| TCP      | Data ကို ယုံကြည်စိတ်ချရအောင် ပို့ရန်        |
| UDP      | Data ကို မြန်မြန်ပို့ရန်                    |
| IP       | Addressing နှင့် Routing                    |
| HTTP     | Web Communication                           |
| HTTPS    | Secure Web Communication                    |
| SSH      | Remote Server ကို Secure Access လုပ်ရန်     |
| DNS      | Domain Name ကို IP Address ပြောင်းရန်       |
| DHCP     | Device များကို IP Address အလိုအလျောက်ပေးရန် |
| FTP      | File Transfer                               |
| SMTP     | Email ပို့ရန်                               |

Protocol တစ်ခုချင်းစီမှာ သူ့ရဲ့ တာဝန်နဲ့ သူ့ရဲ့ ရည်ရွယ်ချက်ရှိပါတယ်။

---

# Network Layer များ

Network ကို နားလည်ရလွယ်အောင် **Layer** တွေအဖြစ် ခွဲပြီး စဉ်းစားလို့ရပါတယ်။

ရိုးရှင်းအောင်ပြရရင်—

```text
Application Layer
        |
        | HTTP / HTTPS / SSH / DNS
        v
Transport Layer
        |
        | TCP / UDP
        v
Internet Layer
        |
        | IP
        v
Network Access Layer
        |
        | Ethernet / Wi-Fi
        v
Physical Network
```

Layer တစ်ခုချင်းစီမှာ ကိုယ့်တာဝန်နဲ့ကိုယ် ရှိပါတယ်။

ဥပမာ Browser က Website တစ်ခုကို ဝင်တဲ့အခါ—

```text
HTTPS
  |
  v
TCP
  |
  v
IP
  |
  v
Wi-Fi / Ethernet
```

ဆိုပြီး Protocol အမျိုးမျိုးက အတူတကွ အလုပ်လုပ်ပါတယ်။

---

# IP ဆိုတာဘာလဲ?

TCP/UDP နဲ့ Port တွေကို မလေ့လာခင် **IP** ကို နားလည်ထားဖို့လိုပါတယ်။

IP ဆိုတာ—

> **Internet Protocol**

ဖြစ်ပါတယ်။

IP ရဲ့ အဓိကတာဝန်က Network ထဲမှာ Data Packet တွေ ဘယ်နေရာကိုသွားရမလဲဆိုတာ သတ်မှတ်ပေးပြီး Routing လုပ်ပေးတာဖြစ်ပါတယ်။

ဥပမာ—

```text
Computer A
IP: 192.168.1.10
        |
        |
        v
Computer B
IP: 192.168.1.20
```

IP Address က Network ထဲမှာ Device တစ်ခုရဲ့ Address ကို သတ်မှတ်ပေးပါတယ်။

IPv4 Address ဥပမာ—

```text
192.168.1.10
```

IPv6 Address ဥပမာ—

```text
2001:db8::1
```

အလွယ်မှတ်ရရင်—

> **IP က Data ဘယ်နေရာကို သွားရမလဲဆိုတာ ပြောပေးတာပါ။**

---

# TCP ဆိုတာဘာလဲ?

TCP ဆိုတာ—

> **Transmission Control Protocol**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

TCP က **Reliable** ဖြစ်အောင် Data ပို့ပေးတဲ့ Transport Layer Protocol တစ်ခုပါ။

TCP ရဲ့ အဓိကအယူအဆက—

> **"Data ကို သေချာရောက်အောင် ပို့မယ်"**

ဆိုတာပါ။

ဥပမာ—

```text
HELLO WORLD
```

ဆိုတဲ့ Data ကို ပို့တယ်ဆိုပါစို့။

Data ကို အပိုင်းငယ်တွေ ခွဲပြီး ပို့နိုင်ပါတယ်။

```text
[HELLO] [ WORL] [D]
```

Network ကနေ သွားပြီးနောက် Receiver ဘက်မှာ ပြန်စုပေးပါတယ်။

```text
[HELLO] [ WORL] [D]

        ↓

HELLO WORLD
```

Data တစ်ပိုင်း ပျောက်သွားရင် TCP က ပြန်ပို့နိုင်ပါတယ်။

ဥပမာ—

```text
Sender                    Receiver

Packet 1 ----------------> ✓

Packet 2 ----------------> ✗

Packet 3 ----------------> ✓

             <------------ "Packet 2 ပြန်ပို့ပါ"

Packet 2 ----------------> ✓
```

ဒါကြောင့် TCP ကို **Reliable Protocol** လို့ ပြောနိုင်ပါတယ်။

---

# TCP Connection

TCP က Application Data မပို့ခင် Connection တစ်ခု တည်ဆောက်ပါတယ်။

TCP မှာ အရေးကြီးတဲ့ Connection Setup တစ်ခုက **Three-Way Handshake** ဖြစ်ပါတယ်။

ရိုးရှင်းအောင်ပြရရင်—

```text
Client                     Server

   | -------- SYN --------> |
   | <------ SYN-ACK -------|
   | -------- ACK --------> |
   |                        |
   |    Connection Ready    |
```

အဆင့် ၃ ဆင့်က—

1. SYN
2. SYN-ACK
3. ACK

ဖြစ်ပါတယ်။

ဒီအဆင့်တွေပြီးသွားရင် TCP Connection က Data ပို့ဖို့ အသင့်ဖြစ်ပါပြီ။

---

# UDP ဆိုတာဘာလဲ?

UDP ဆိုတာ—

> **User Datagram Protocol**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

UDP က TCP လို Connection တည်ဆောက်ပြီး Reliable Delivery ကို TCP ပုံစံနဲ့ အာမခံပေးတဲ့ Transport Protocol မဟုတ်ပါဘူး။

UDP ရဲ့ အဓိကအယူအဆက—

> **"Data ကို မြန်မြန်ပို့မယ်၊ Delivery ကို TCP လို ပြန်စစ်ဆေးမနေဘူး"**

ဆိုတဲ့သဘောပါ။

ဥပမာ—

```text
Client
  |
  | Packet 1
  | Packet 2
  | Packet 3
  | Packet 4
  v
Server
```

Packet တစ်ခု ပျောက်သွားရင် UDP ကိုယ်တိုင်က TCP ပုံစံနဲ့ အဲဒီ Packet ကို ပြန်ပို့ပေးမှာ မဟုတ်ပါဘူး။

ဒါကြောင့် **Speed နဲ့ Low Latency** က အရေးကြီးတဲ့ Application တွေမှာ UDP ကို အသုံးပြုနိုင်ပါတယ်။

ဥပမာ—

* Online Games
* Real-time Communication
* Video / Audio Streaming
* DNS
* QUIC လို Modern Transport Protocol များ

---

# TCP နဲ့ UDP ကွာခြားချက်

| အချက်            | TCP                  | UDP                               |
| ---------------- | -------------------- | --------------------------------- |
| Connection       | Connection-oriented  | Connectionless                    |
| Reliability      | Built-in Reliability | TCP လို Built-in Reliability မရှိ |
| Ordering         | Ordered Byte Stream  | Ordered Byte Stream မဟုတ်         |
| Retransmission   | ရှိ                  | TCP ပုံစံ Built-in မရှိ           |
| Overhead         | ပိုများ              | ပိုနည်း                           |
| အသုံးများတဲ့နေရာ | HTTP/HTTPS, SSH      | DNS, Games, Real-time Traffic     |

TCP နဲ့ UDP မှာ ဘယ်ဟာက အမြဲတမ်း ပိုကောင်းတယ်ဆိုတာ မရှိပါဘူး။

Application ရဲ့ လိုအပ်ချက်ပေါ်မူတည်ပြီး ရွေးချယ်ရပါတယ်။

---

# Port ဆိုတာဘာလဲ?

IP Address က **ဘယ် Computer / Server ကို သွားရမလဲ** ဆိုတာ သိစေပါတယ်။

ဒါပေမယ့် Computer တစ်လုံးထဲမှာ Network Service အများကြီး တစ်ပြိုင်နက် Run နေနိုင်ပါတယ်။

ဥပမာ Server တစ်လုံးမှာ—

```text
Server
IP: 203.0.113.10

    Port 22   → SSH
    Port 80   → HTTP
    Port 443  → HTTPS
```

ဆိုပြီး Service အမျိုးမျိုး ရှိနိုင်ပါတယ်။

**Port** က အဲဒီ Service တွေထဲက ဘယ် Service ကို ဆက်သွယ်ရမလဲဆိုတာ ခွဲခြားပေးပါတယ်။

အလွယ်မှတ်ရရင်—

```text
IP Address
    |
    v
အဆောက်အအုံရဲ့ Address

Port
    |
    v
အဲဒီအဆောက်အအုံထဲက တံခါး
```

ဥပမာ—

```text
Server
 |
 +---- Port 22  → SSH
 |
 +---- Port 80  → HTTP
 |
 +---- Port 443 → HTTPS
```

---

# Protocol နဲ့ Port မတူပါ

ဒီအချက်ကို သေချာမှတ်ထားသင့်ပါတယ်။

```text
Protocol = ဘယ်လို ဆက်သွယ်မလဲ?

Port = ဘယ် Service / Endpoint ကို ဆက်သွယ်မလဲ?
```

ဥပမာ—

```text
2222/tcp
```

မှာ—

```text
2222 → Port Number
tcp  → Transport Protocol
```

ဖြစ်ပါတယ်။

`2222` က TCP မဟုတ်ပါဘူး။

`2222` က Port Number ဖြစ်ပြီး `TCP` က Transport Protocol ဖြစ်ပါတယ်။

---

# အသုံးများတဲ့ Port များ

| Port | Service    |
| ---: | ---------- |
|   22 | SSH        |
|   53 | DNS        |
|   80 | HTTP       |
|  443 | HTTPS      |
|   25 | SMTP       |
|  110 | POP3       |
|  143 | IMAP       |
| 3306 | MySQL      |
| 5432 | PostgreSQL |

သတိထားရမယ့်အချက်က Service တစ်ခုဟာ သူ့ရဲ့ Default Port ကို မဖြစ်မနေသုံးရမယ်လို့ မဆိုလိုပါဘူး။

Administrator က Configuration ပြောင်းပြီး Port တစ်ခုကို အခြား Port နဲ့ Run နိုင်ပါတယ်။

ဥပမာ SSH ရဲ့ Default Port က—

```text
22/tcp
```

ဖြစ်ပေမယ့် SSH ကို—

```text
2222/tcp
```

မှာ Run အောင် Configuration ပြောင်းနိုင်ပါတယ်။

---

# HTTP ဆိုတာဘာလဲ?

HTTP ဆိုတာ—

> **Hypertext Transfer Protocol**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

Web Browser နဲ့ Web Server ကြား Communication အတွက် အသုံးပြုတဲ့ Application Layer Protocol ဖြစ်ပါတယ်။

အခြေခံ Flow က—

```text
Browser
   |
   | HTTP Request
   v
Web Server
   |
   | HTTP Response
   v
Browser
```

ဥပမာ Browser က—

```http
GET /users HTTP/1.1
Host: example.com
```

လို Request ပို့နိုင်ပါတယ်။

Server က—

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

လို Response ပြန်ပေးနိုင်ပါတယ်။

ပြီးတော့ Data ကို—

```json
{
  "users": [
    "John",
    "Alice"
  ]
}
```

လို ပြန်ပေးနိုင်ပါတယ်။

---

# HTTP Methods

HTTP မှာ အသုံးများတဲ့ Method တွေရှိပါတယ်။

## GET

Data ရယူဖို့ အသုံးပြုပါတယ်။

```http
GET /users
```

---

## POST

Data ပို့ရန် သို့မဟုတ် Resource အသစ် ဖန်တီးရန် အသုံးပြုပါတယ်။

```http
POST /users
```

---

## PUT

Resource တစ်ခုလုံးကို Update / Replace လုပ်ရန် အသုံးပြုနိုင်ပါတယ်။

```http
PUT /users/10
```

---

## PATCH

Resource ရဲ့ အစိတ်အပိုင်းတစ်ခုကို Update လုပ်ရန် အသုံးပြုပါတယ်။

```http
PATCH /users/10
```

---

## DELETE

Resource ကို ဖျက်ရန် အသုံးပြုပါတယ်။

```http
DELETE /users/10
```

ဒီ HTTP Methods တွေဟာ Web API တွေမှာ အလွန်အရေးကြီးပါတယ်။

---

# HTTPS ဆိုတာဘာလဲ?

HTTPS ဆိုတာ—

> **Hypertext Transfer Protocol Secure**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

ရိုးရှင်းအောင်ပြောရရင်—

```text
HTTP
 +
TLS
 =
HTTPS
```

HTTPS က HTTP Communication ကို **TLS** အသုံးပြုပြီး Secure လုပ်ထားတာဖြစ်ပါတယ်။

HTTP သီးသန့်ဆိုရင်—

```text
Browser -------- HTTP --------> Server
```

HTTPS ဆိုရင်—

```text
Browser ===== encrypted =====> Server
```

လို ဖြစ်ပါတယ်။

HTTPS က Network Communication ကို Encryption နဲ့ Authentication mechanisms တွေသုံးပြီး ကာကွယ်ပေးပါတယ်။

အထူးသဖြင့် အောက်ပါ Data တွေအတွက် HTTPS က အရေးကြီးပါတယ်။

* Password
* Authentication Token
* Personal Information
* Payment Information
* API Request
* Private Message

---

# HTTP နဲ့ HTTPS ကွာခြားချက်

| အချက်       | HTTP           | HTTPS            |
| ----------- | -------------- | ---------------- |
| TLS         | မသုံး          | သုံး             |
| Encryption  | TLS မရှိ       | TLS ဖြင့် ကာကွယ် |
| Security    | HTTPS ထက် နည်း | ပိုမို Secure    |
| Common Port | 80             | 443              |

ယနေ့ခေတ် Website အများစုမှာ HTTPS ကို အသုံးပြုကြပါတယ်။

---

# DNS ဆိုတာဘာလဲ?

DNS ဆိုတာ—

> **Domain Name System**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

လူတွေက—

```text
google.com
```

လို Domain Name ကို မှတ်ရတာ လွယ်ပါတယ်။

Computer Network တွေကတော့ IP Address ကို အသုံးပြုပါတယ်။

DNS က Domain Name ကို IP Address နဲ့ Resolve လုပ်ပေးပါတယ်။

Conceptually—

```text
Browser
   |
   | "example.com ရဲ့ IP ဘာလဲ?"
   v
DNS Server
   |
   | "IP က ..."
   v
Browser
```

ဥပမာ—

```text
example.com
     |
     v
203.0.113.10
```

ပြီးရင် Browser က အဲဒီ IP Address ရှိတဲ့ Server ကို ဆက်သွယ်နိုင်ပါတယ်။

---

# SSH ဆိုတာဘာလဲ?

SSH ဆိုတာ—

> **Secure Shell**

ရဲ့ အတိုကောက်ဖြစ်ပါတယ်။

SSH ကို Remote Server တွေကို Securely Access လုပ်ဖို့ အသုံးပြုပါတယ်။

ဥပမာ—

```bash
ssh root@203.0.113.10
```

ဆိုရင် ကိုယ့် Computer ကနေ Remote Ubuntu Server ကို SSH နဲ့ ချိတ်ဆက်တာဖြစ်ပါတယ်။

Flow က—

```text
Your Computer
      |
      | SSH
      |
      v
Ubuntu Server
```

Server ထဲဝင်ပြီးရင်—

```bash
cd /var/www
ls
systemctl status nginx
```

လို Command တွေ Run နိုင်ပါတယ်။

SSH ရဲ့ Default Port က—

```text
22/tcp
```

ဖြစ်ပါတယ်။

ဒါပေမယ့် SSH ကို Port `2222` မှာ Run အောင် Configuration ပြောင်းထားရင်—

```text
2222/tcp
```

ဖြစ်သွားနိုင်ပါတယ်။

---

# Firewall ဆိုတာဘာလဲ?

**Firewall** ဆိုတာ Network Traffic ကို ခွင့်ပြုမလား၊ ပိတ်မလားဆိုတာ သတ်မှတ်ပေးတဲ့ Security System ဖြစ်ပါတယ်။

ဥပမာ—

```text
Internet
   |
   v
[ Firewall ]
   |
   +---- Port 22  → Allow
   |
   +---- Port 80  → Allow
   |
   +---- Port 443 → Allow
   |
   +---- Port 3306 → Block
```

Firewall က Rule တွေအပေါ်မူတည်ပြီး Traffic ကို Allow သို့မဟုတ် Block လုပ်ပေးပါတယ်။

Ubuntu မှာ Firewall ကို လွယ်လွယ်ကူကူ Manage လုပ်ဖို့ **UFW (Uncomplicated Firewall)** ကို အသုံးပြုနိုင်ပါတယ်။

---

# `sudo ufw allow 2222/tcp` ဆိုတာဘာလဲ?

ဒီ Command ကိုကြည့်ရအောင်—

```bash
sudo ufw allow 2222/tcp
```

တစ်ပိုင်းချင်း ခွဲကြည့်ရင်—

```text
sudo
  ↓
Administrator Permission ဖြင့် Run

ufw
  ↓
Ubuntu Firewall ကို Manage လုပ်တဲ့ Tool

allow
  ↓
Traffic ကို ခွင့်ပြု

2222
  ↓
Port Number

tcp
  ↓
Transport Protocol
```

အကုန်ပေါင်းလိုက်ရင်—

> **TCP Protocol အသုံးပြုပြီး Port 2222 ကို ရောက်လာတဲ့ Incoming Traffic ကို Firewall ကနေ ဖြတ်ခွင့်ပြုပါ။**

ဆိုတဲ့အဓိပ္ပါယ် ဖြစ်ပါတယ်။

---

# SSH ကို Port 2222 သုံးထားတဲ့ Example

SSH Server ကို—

```text
SSH
Port: 2222
Protocol: TCP
```

မှာ Run ထားတယ်ဆိုပါစို့။

Firewall မှာ—

```bash
sudo ufw allow 2222/tcp
```

လို့ ခွင့်ပြုနိုင်ပါတယ်။

ပြီးရင် Client က—

```bash
ssh -p 2222 root@SERVER_IP
```

နဲ့ ချိတ်ဆက်နိုင်ပါတယ်။

Flow က—

```text
Your Computer
     |
     | TCP
     | Destination Port: 2222
     v
  Firewall
     |
     | ALLOW
     v
 SSH Server
     |
     v
Remote Shell
```

ဒီနေရာမှာ အရေးကြီးတာက—

```text
TCP
 ↓
ဘယ်လို Data ပို့မလဲ?

2222
 ↓
ဘယ် Port ကို သွားမလဲ?

SSH
 ↓
ဘယ် Application Protocol / Service လဲ?
```

ဆိုတာကို ခွဲခြားမြင်နိုင်ဖို့ပါ။

---

# အားလုံးကို တစ်ခါတည်း ဆက်စပ်ကြည့်မယ်

ဥပမာ Browser က—

```text
https://example.com
```

ကို ဝင်တယ်ဆိုပါစို့။

အကြမ်းဖျင်း Flow က—

```text
                DNS
                 |
                 v
          example.com
                 |
                 v
             IP Address
                 |
                 v
             TCP / TLS
                 |
                 v
              Port 443
                 |
                 v
            Web Server
                 |
                 v
              HTTPS
                 |
                 v
           HTTP Request
```

တစ်ခုချင်းစီရဲ့ တာဝန်က—

```text
DNS
 ↓
Domain ရဲ့ IP ကို ရှာပေး

IP
 ↓
Data ဘယ် Destination ကို သွားရမလဲ သတ်မှတ်

TCP
 ↓
Reliable Transport ပေး

TLS
 ↓
Communication ကို Secure လုပ်

Port 443
 ↓
HTTPS Service ကို ခွဲခြားပေး

HTTP
 ↓
Web Request / Response စည်းမျဉ်းကို သတ်မှတ်
```

ဒါကြောင့် Networking က ရှုပ်ထွေးတယ်လို့ ခံစားရတာဟာ Protocol တစ်ခုတည်းနဲ့ အလုပ်လုပ်တာမဟုတ်ဘဲ **Protocol အများကြီးက Layer အလိုက် အတူတကွ အလုပ်လုပ်နေလို့ပါ။**

---

# Server တစ်ခုမှာ ဘယ်လိုအလုပ်လုပ်လဲ?

ဥပမာ Ubuntu Server တစ်ခုမှာ—

```text
Nginx
Laravel
MySQL
SSH
```

ရှိတယ်ဆိုပါစို့။

Port တွေက—

```text
Port 22
  ↓
SSH

Port 80
  ↓
HTTP / Nginx

Port 443
  ↓
HTTPS / Nginx

Port 3306
  ↓
MySQL
```

လို ဖြစ်နိုင်ပါတယ်။

Firewall ကို—

```text
Internet
   |
   v
Firewall
   |
   +---- 22/tcp  → Allow
   |
   +---- 80/tcp  → Allow
   |
   +---- 443/tcp → Allow
   |
   +---- 3306/tcp → Block
```

လို Configure လုပ်နိုင်ပါတယ်။

MySQL ကို Internet ကနေ တိုက်ရိုက် Access ပေးစရာမလိုဘူးဆိုရင် Public Internet ကနေ `3306` ကို ပိတ်ထားနိုင်ပါတယ်။

Architecture ကို—

```text
Internet
   |
   v
Nginx :443
   |
   v
Laravel
   |
   v
MySQL :3306
```

လို တည်ဆောက်နိုင်ပါတယ်။

ဒီလိုဆိုရင် MySQL ကို Public Internet ကနေ တိုက်ရိုက်ဝင်ခွင့် မပေးဘဲ Application Server ကနေသာ Access လုပ်နိုင်အောင် ထိန်းချုပ်နိုင်ပါတယ်။

---

# အရေးကြီးဆုံး မှတ်ထားရမယ့် Concepts

Networking ကို စလေ့လာနေတဲ့အချိန်မှာ အောက်က Concepts တွေကို အရင်သေချာနားလည်ထားပါ။

```text
Protocol
    ↓
Communication လုပ်ဖို့ စည်းမျဉ်း

IP
    ↓
Network Destination ရဲ့ Address

Port
    ↓
Service / Endpoint ကို ခွဲခြားပေး

TCP
    ↓
Reliable Transport

UDP
    ↓
Lightweight / Low-Latency Transport

HTTP
    ↓
Web Communication

HTTPS
    ↓
TLS ဖြင့် Secure လုပ်ထားတဲ့ HTTP

SSH
    ↓
Remote Server ကို Secure Access လုပ်ရန်

Firewall
    ↓
Network Traffic ကို Allow / Block လုပ်ရန်
```

ဒီလိုလည်း မှတ်နိုင်ပါတယ်—

```text
                 Application
                     |
          +----------+----------+
          |          |          |
         HTTP       SSH        DNS
          |          |          |
          +----------+----------+
                     |
                TCP / UDP
                     |
                     v
                    IP
                     |
                     v
              Network / Wi-Fi
```

---

# နိဂုံး

**Protocol** ဆိုတာ Computer တွေ အချင်းချင်း Communication လုပ်တဲ့အခါ လိုက်နာရမယ့် စည်းမျဉ်းတွေ ဖြစ်ပါတယ်။

Protocol တစ်ခုချင်းစီမှာ ကိုယ်ပိုင်တာဝန် ရှိပါတယ်။

```text
IP
→ Data ဘယ်နေရာကို သွားရမလဲ?

TCP / UDP
→ Data ကို ဘယ်လို Transport လုပ်မလဲ?

Port
→ ဘယ် Service ကို သွားမလဲ?

HTTP / HTTPS
→ Web Application တွေ ဘယ်လို Communicate လုပ်မလဲ?

SSH
→ Remote Server ကို ဘယ်လို Secure Access လုပ်မလဲ?

Firewall
→ ဘယ် Network Connection တွေကို Allow / Block လုပ်မလဲ?
```

ဒီ Concepts တွေကို နားလည်သွားပြီဆိုရင်—

* Linux Server
* Nginx
* Laravel Deployment
* Docker Networking
* API
* Cloud Server
* Reverse Proxy
* Load Balancer
* WebSocket
* Network Security
* Network Troubleshooting

စတာတွေကို ဆက်လေ့လာတဲ့အခါ ပိုပြီး လွယ်ကူလာပါလိမ့်မယ်။

အရေးကြီးဆုံးက **Port နံပါတ်တွေကို အလွတ်ကျက်ဖို့ မဟုတ်ပါဘူး။**

Protocol တစ်ခုချင်းစီ **ဘာကြောင့်ရှိတာလဲ၊ ဘာတာဝန်ယူတာလဲ၊ တခြား Protocol တွေနဲ့ ဘယ်လိုအတူတကွ အလုပ်လုပ်တာလဲ** ဆိုတာကို နားလည်ဖို့ ဖြစ်ပါတယ်။
