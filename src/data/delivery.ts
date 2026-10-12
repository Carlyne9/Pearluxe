// shortcut: placeholder zones and fees, modelled on other Accra shops. Replace with the client's real zones + prices.
export interface DeliveryOption {
  id: string;
  label: string;
  note?: string;
  fee: number;
}

export const shipOptions: DeliveryOption[] = [
  { id: 'accra-central', label: 'Accra Central, Osu, Labone, Cantonments, Airport', fee: 35 },
  { id: 'legon-madina', label: 'East Legon, Madina, Adenta, Haatso, Dome', fee: 35 },
  { id: 'west', label: 'Awoshie, Dansoman, Kaneshie, Weija, Mallam', fee: 40 },
  { id: 'tema-kasoa', label: 'Tema, Ashaiman, Kasoa, Pokuase, Amasaman', fee: 50 },
  { id: 'outside-accra', label: 'Outside Accra', note: 'Sent to your bus station. Use the name on your ID.', fee: 25 },
];

export const pickup = {
  id: 'pickup',
  label: 'Pick up from Pearluxe',
  note: 'Location shared on WhatsApp after you order. Usually ready in 2 hours.',
  fee: 0,
};
