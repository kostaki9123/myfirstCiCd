export type BudgetProfile = {
  currency: "EUR"
  Economy: number
  Balanced: number
  Luxury: number
}

export const countryBudgetProfilesEUR: Record<string, BudgetProfile> = {
  // ─── EUROPE ─────────────────────────
  FR: { currency: "EUR", Economy: 35, Balanced: 65, Luxury: 120 },
  DE: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 130 },
  IT: { currency: "EUR", Economy: 35, Balanced: 65, Luxury: 120 },
  ES: { currency: "EUR", Economy: 30, Balanced: 60, Luxury: 110 },
  PT: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },
  NL: { currency: "EUR", Economy: 45, Balanced: 75, Luxury: 140 },
  BE: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 130 },
  CH: { currency: "EUR", Economy: 65, Balanced: 115,Luxury: 240 },
  AT: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 130 },
  SE: { currency: "EUR", Economy: 50, Balanced: 90, Luxury: 170 },
  NO: { currency: "EUR", Economy: 60, Balanced: 105,Luxury: 210 },
  DK: { currency: "EUR", Economy: 50, Balanced: 90, Luxury: 170 },
  FI: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 150 },
  PL: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },
  CZ: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },
  HU: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 95 },
  RO: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 85 },
  BG: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 85 },
  GR: { currency: "EUR", Economy: 30, Balanced: 60, Luxury: 110 },
  HR: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },
  IE: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 150 },
  UK: { currency: "EUR", Economy: 50, Balanced: 85, Luxury: 160 },
  GB: { currency: "EUR", Economy: 60, Balanced: 110,Luxury: 220 },

  // ─── NORTH AMERICA ───────────────────
  US: { currency: "EUR", Economy: 45, Balanced: 85, Luxury: 170 },
  CA: { currency: "EUR", Economy: 42, Balanced: 80, Luxury: 150 },
  MX: { currency: "EUR", Economy: 28, Balanced: 52, Luxury: 95 },
  CR: { currency: "EUR", Economy: 32, Balanced: 60, Luxury: 110 },
  PA: { currency: "EUR", Economy: 32, Balanced: 60, Luxury: 110 },
  // ─── SOUTH AMERICA ──Economy──────Balanced──L  BR: { currency: "EUR", budget: 28, mid: 52, Luxury: 95 },
  AR: { currency: "EUR", Economy: 28, Balanced: 52, Luxury: 95 },
  CL: { currency: "EUR", Economy: 38, Balanced: 68, Luxury: 125 },
  CO: { currency: "EUR", Economy: 24, Balanced: 42, Luxury: 80 },
  PE: { currency: "EUR", Economy: 24, Balanced: 42, Luxury: 80 },
  EC: { currency: "EUR", Economy: 24, Balanced: 42, Luxury: 80 },
  BO: { currency: "EUR", Economy: 22, Balanced: 38, Luxury: 70 },
  PY: { currency: "EUR", Economy: 22, Balanced: 38, Luxury: 70 },
  UY: { currency: "EUR", Economy: 32, Balanced: 60, Luxury: 110 },
  // ─── ASIA ───────────Economy──────Balanced──L  IN: { currency: "EUR", budget: 18, mid: 32, Luxury: 65 },
  TH: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 85 },
  VN: { currency: "EUR", Economy: 21, Balanced: 38, Luxury: 75 },
  ID: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  PH: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  MY: { currency: "EUR", Economy: 28, Balanced: 52, Luxury: 95 },
  CN: { currency: "EUR", Economy: 32, Balanced: 60, Luxury: 110 },
  JP: { currency: "EUR", Economy: 55, Balanced: 95, Luxury: 180 },
  KR: { currency: "EUR", Economy: 50, Balanced: 90, Luxury: 170 },
  SG: { currency: "EUR", Economy: 60, Balanced: 100,Luxury: 190 },
  HK: { currency: "EUR", Economy: 55, Balanced: 95, Luxury: 180 },
  NP: { currency: "EUR", Economy: 16, Balanced: 28, Luxury: 55 },
  LK: { currency: "EUR", Economy: 18, Balanced: 32, Luxury: 65 },
  BD: { currency: "EUR", Economy: 16, Balanced: 28, Luxury: 55 },
  KH: { currency: "EUR", Economy: 21, Balanced: 38, Luxury: 75 },
  LA: { currency: "EUR", Economy: 21, Balanced: 38, Luxury: 75 },

  // ─── MIDDLE EAST ─────────────────────
  AE: { currency: "EUR", Economy: 42, Balanced: 78, Luxury: 150 },
  SA: { currency: "EUR", Economy: 38, Balanced: 72, Luxury: 145 },
  TR: { currency: "EUR", Economy: 28, Balanced: 52, Luxury: 95 },
  IL: { currency: "EUR", Economy: 48, Balanced: 88, Luxury: 170 },
  JO: { currency: "EUR", Economy: 32, Balanced: 60, Luxury: 110 },
  OM: { currency: "EUR", Economy: 38, Balanced: 72, Luxury: 145 },
  TN: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  EG: { currency: "EUR", Economy: 21, Balanced: 38, Luxury: 75 },
  ZA: { currency: "EUR", Economy: 28, Balanced: 52, Luxury: 95 },
  KE: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  TZ: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  UG: { currency: "EUR", Economy: 21, Balanced: 38, Luxury: 75 },
  GH: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  NG: { currency: "EUR", Economy: 23, Balanced: 42, Luxury: 80 },
  NZ: { currency: "EUR", Economy: 48, Balanced: 88, Luxury: 165 },
  FJ: { currency: "EUR", Economy: 38, Balanced: 68, Luxury: 125 },

  // ─── EUROPE (missing previously) ─────────────────────────
  AL: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },  // Albania 🇦🇱
  AD: { currency: "EUR", Economy: 70, Balanced: 100,Luxury: 180 }, // Andorra 🇦🇩
  BY: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Belarus 🇧🇾
  BA: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Bosnia and Herzegovina 🇧🇦
  CY: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Cyprus 🇨🇾
  EE: { currency: "EUR", Economy: 38, Balanced: 70, Luxury: 120 },  // Estonia 🇪🇪
  LV: { currency: "EUR", Economy: 36, Balanced: 65, Luxury: 110 },  // Latvia 🇱🇻
  LI: { currency: "EUR", Economy: 80, Balanced: 130,Luxury: 240 }, // Liechtenstein 🇱🇮
  LT: { currency: "EUR", Economy: 35, Balanced: 65, Luxury: 110 },  // Lithuania 🇱🇹
  LU: { currency: "EUR", Economy: 70, Balanced: 120,Luxury: 220 }, // Luxembourg 🇱🇺
  MT: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Malta 🇲🇹
  MD: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Moldova 🇲🇩
  MC: { currency: "EUR", Economy: 120,Balanced: 200,Luxury: 350 },// Monaco 🇲🇨
  ME: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Montenegro 🇲🇪
  MK: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // North Macedonia 🇲🇰
  SM: { currency: "EUR", Economy: 60, Balanced: 100,Luxury: 180 }, // San Marino 🇸🇲
  RS: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Serbia 🇷🇸
  SK: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Slovakia 🇸🇰
  SI: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Slovenia 🇸🇮
  UA: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },  // Ukraine 🇺🇦
  VA: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Vatican City 🇻🇦

  // ─── NORTH & CENTRAL AMERICA ───────────────────
  AG: { currency: "EUR", Economy: 60, Balanced: 100,Luxury: 180 }, // Antigua and Barbuda 🇦🇬
  BS: { currency: "EUR", Economy: 60, Balanced: 100,Luxury: 180 }, // Bahamas 🇧🇸
  BB: { currency: "EUR", Economy: 55, Balanced: 95, Luxury: 170 },  // Barbados 🇧🇧
  BZ: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 140 },  // Belize 🇧🇿
  CU: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Cuba 🇨🇺
  DM: { currency: "EUR", Economy: 55, Balanced: 90, Luxury: 160 },  // Dominica 🇩🇲
  DO: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 140 },  // Dominican Republic 🇩🇴
  SV: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 110 },  // El Salvador 🇸🇻
  GD: { currency: "EUR", Economy: 55, Balanced: 90, Luxury: 160 },  // Grenada 🇬🇩
  GT: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 110 },  // Guatemala 🇬🇹
  HT: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Haiti 🇭🇹
  HN: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },  // Honduras 🇭🇳
  JM: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Jamaica 🇯🇲
  NI: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 100 },  // Nicaragua 🇳🇮
  KN: { currency: "EUR", Economy: 55, Balanced: 90, Luxury: 160 },  // Saint Kitts and Nevis 🇰🇳
  LC: { currency: "EUR", Economy: 55, Balanced: 90, Luxury: 160 },  // Saint Lucia 🇱🇨
  VC: { currency: "EUR", Economy: 50, Balanced: 85, Luxury: 150 },  // Saint Vincent & Grenadines 🇻🇨
  TT: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 140 },  // Trinidad and Tobago 🇹🇹

  // ─── SOUTH AMERICA ───────────────────
  GY: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 110 },  // Guyana 🇬🇾
  SR: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 130 },  // Suriname 🇸🇷
  VE: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 130 },  // Venezuela 🇻🇪
 // ─── ASIA ────────────────────────────L  AF: { currency: "EUR", budget: 50, mid: 85, Luxury: 150 },  // Afghanistan 🇦🇫
  AM: { currency: "EUR", Economy: 40, Balanced: 70, Luxury: 120 },  // Armenia 🇦🇲
  AZ: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Azerbaijan 🇦🇿
  BH: { currency: "EUR", Economy: 55, Balanced: 95, Luxury: 160 },  // Bahrain 🇧🇭
  BT: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Bhutan 🇧🇹
  BN: { currency: "EUR", Economy: 55, Balanced: 95, Luxury: 160 },  // Brunei 🇧🇳
  GE: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Georgia 🇬🇪
  IR: { currency: "EUR", Economy: 50, Balanced: 90, Luxury: 160 },  // Iran 🇮🇷
  IQ: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 140 },  // Iraq 🇮🇶
  KZ: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Kazakhstan 🇰🇿
  KW: { currency: "EUR", Economy: 65, Balanced: 110,Luxury: 190 }, // Kuwait 🇰🇼
  KG: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Kyrgyzstan 🇰🇬
  MV: { currency: "EUR", Economy: 50, Balanced: 90, Luxury: 160 },  // Maldives 🇲🇻
  MN: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Mongolia 🇲🇳
  MM: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Myanmar 🇲🇲
  PK: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Pakistan 🇵🇰
  QA: { currency: "EUR", Economy: 70, Balanced: 115,Luxury: 200 }, // Qatar 🇶🇦
  TJ: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Tajikistan 🇹🇯
  TL: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Timor-Leste 🇹🇱
  TM: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Turkmenistan 🇹🇲
  UZ: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Uzbekistan 🇺🇿
  YE: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 140 },  // Yemen 🇾🇪
  PS: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Palestine 🇵🇸

  // ─── AFRICA ──────────────────────────
  DZ: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 95 },   // Algeria 🇩🇿
  AO: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 95 },   // Angola 🇦🇴
  BJ: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Benin 🇧🇯
  BW: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 110 },  // Botswana 🇧🇼
  BF: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Burkina Faso 🇧🇫
  BI: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Burundi 🇧🇮
  CV: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Cabo Verde 🇨🇻
  CM: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Cameroon 🇨🇲
  CF: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Central African Republic 🇨🇫
  TD: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Chad 🇹🇩
  KM: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Comoros 🇰🇲
  CG: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Congo (Republic) 🇨🇬
  CD: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // DR Congo 🇨🇩
  CI: { currency: "EUR", Economy: 27, Balanced: 48, Luxury: 82 },   // Côte d’Ivoire 🇨🇮
  DJ: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Djibouti 🇩🇯
  GQ: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Equatorial Guinea 🇬🇶
  ER: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Eritrea 🇪🇷
  SZ: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Eswatini 🇸🇿
  ET: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Ethiopia 🇪🇹
  GA: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Gabon 🇬🇦
  GM: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Gambia 🇬🇲
  GN: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Guinea 🇬🇳
  GW: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Guinea-Bissau 🇬🇼
  LS: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Lesotho 🇱🇸
  LR: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Liberia 🇱🇷
  LY: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Libya 🇱🇾
  MW: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Malawi 🇲🇼
  ML: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Mali 🇲🇱
  MR: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Mauritania 🇲🇷
  MU: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Mauritius 🇲🇺
  MZ: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Mozambique 🇲🇿
  NA: { currency: "EUR", Economy: 30, Balanced: 55, Luxury: 90 },   // Namibia 🇳🇦
  NE: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Niger 🇳🇪
  RW: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Rwanda 🇷🇼
  SN: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Senegal 🇸🇳
  SC: { currency: "EUR", Economy: 35, Balanced: 60, Luxury: 100 },  // Seychelles 🇸🇨
  SL: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Sierra Leone 🇸🇱
  SO: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Somalia 🇸🇴
  SS: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // South Sudan 🇸🇸
  SD: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Sudan 🇸🇩
  TG: { currency: "EUR", Economy: 25, Balanced: 45, Luxury: 80 },   // Togo 🇹🇬
  ZM: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Zambia 🇿🇲
  ZW: { currency: "EUR", Economy: 28, Balanced: 50, Luxury: 85 },   // Zimbabwe 🇿🇼

  // ─── OCEANIA ─────────────────────────
  PG: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 150 },  // Papua New Guinea 🇵🇬
  WS: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Samoa 🇼🇸
  SB: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Solomon Islands 🇸🇧
  TO: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Tonga 🇹🇴
  VU: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Vanuatu 🇻🇺
  KI: { currency: "EUR", Economy: 35, Balanced: 65, Luxury: 110 },  // Kiribati 🇰🇮
  FM: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Micronesia 🇫🇲
  MH: { currency: "EUR", Economy: 45, Balanced: 80, Luxury: 150 },  // Marshall Islands 🇲🇭
  NR: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Nauru 🇳🇷
  PW: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Palau 🇵🇼
  TV: { currency: "EUR", Economy: 40, Balanced: 75, Luxury: 130 },  // Tuvalu 🇹🇻
  IN: { currency: "EUR", Economy: 25, Balanced: 55, Luxury: 140 }, // India 🇮🇳
}

