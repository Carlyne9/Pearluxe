# Project brief

## What
An online shop for **Pearluxe**. Launch catalogue: bags. Later: shoes and accessories.

## Who it's for
- **Client:** the Pearluxe owner. Already sells and posts on Instagram and TikTok.
- **Shoppers:** her existing social audience, plus new visitors who find the site.

## The core idea
Her social videos are aesthetic and already build trust. The site should feel like an extension of her feed, not a generic store. Video-led, calm, premium.

## Brand (from current logo, `assets/brand/logo-reference.jpg`)
- Monogram "PL" in a high-contrast serif; wordmark "PEARLUXE" in wide-tracked caps
- White mark on muted, soft-focus product photography
- Product palette in the photo: tan/cognac leather, cream, blush, olive, near-black

## Must-haves (v1)
- Home page with video hero + featured bags
- Product listing (bags) with filters
- Product detail page with photos and video
- Cart + checkout
- Social content section (see `social-content.md`)

## Later
- Shoes / accessories categories
- Customer accounts, wishlist

## Open questions
- [ ] Where does she sell today (DMs, WhatsApp, another store)? Should checkout replace or link to that?
- [ ] Payments: we plan **Paystack + mobile money** (MTN MoMo, Telecel Cash, AirtelTigo Money), prices in **GH₵**. OK, or does she want another method?
- [ ] Does she want a WhatsApp "order via chat" button as well?
- [ ] Delivery: which areas, what fees, and is there a free-delivery threshold?
  - Checkout currently uses placeholder zones/fees in `src/data/delivery.ts` (e.g. East Legon GH₵ 35, outside Accra to bus station GH₵ 25). Need her real list.
- [ ] Pickup: does she offer pickup, and from where? (Checkout says "location shared on WhatsApp".)
- [ ] Paystack: does she have a Paystack business account? We need its public key to switch on payment.
- [ ] Does she want brand colors in the purple / lavender range? (We're testing this now.)
- [ ] Who adds products after launch: the client herself, or us?
- [ ] Instagram + TikTok handles
- [ ] Domain name
