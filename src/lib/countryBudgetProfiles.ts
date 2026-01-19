export type BudgetProfile = {
  currency: "EUR"
  budget: number
  mid: number
  luxury: number
}

export const countryBudgetProfilesEUR: Record<string, BudgetProfile> = {
  // ─── EUROPE ─────────────────────────
  FR: { currency: "EUR", budget: 35, mid: 65, luxury: 120 },
  DE: { currency: "EUR", budget: 40, mid: 70, luxury: 130 },
  IT: { currency: "EUR", budget: 35, mid: 65, luxury: 120 },
  ES: { currency: "EUR", budget: 30, mid: 60, luxury: 110 },
  PT: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },
  NL: { currency: "EUR", budget: 45, mid: 75, luxury: 140 },
  BE: { currency: "EUR", budget: 40, mid: 70, luxury: 130 },
  CH: { currency: "EUR", budget: 65, mid: 115, luxury: 240 },
  AT: { currency: "EUR", budget: 40, mid: 70, luxury: 130 },
  SE: { currency: "EUR", budget: 50, mid: 90, luxury: 170 },
  NO: { currency: "EUR", budget: 60, mid: 105, luxury: 210 },
  DK: { currency: "EUR", budget: 50, mid: 90, luxury: 170 },
  FI: { currency: "EUR", budget: 45, mid: 80, luxury: 150 },
  PL: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },
  CZ: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },
  HU: { currency: "EUR", budget: 28, mid: 50, luxury: 95 },
  RO: { currency: "EUR", budget: 25, mid: 45, luxury: 85 },
  BG: { currency: "EUR", budget: 25, mid: 45, luxury: 85 },
  GR: { currency: "EUR", budget: 30, mid: 60, luxury: 110 },
  HR: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },
  IE: { currency: "EUR", budget: 45, mid: 80, luxury: 150 },
  UK: { currency: "EUR", budget: 50, mid: 85, luxury: 160 },

  // ─── NORTH AMERICA ───────────────────
  US: { currency: "EUR", budget: 45, mid: 85, luxury: 170 },
  CA: { currency: "EUR", budget: 42, mid: 80, luxury: 150 },
  MX: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  CR: { currency: "EUR", budget: 32, mid: 60, luxury: 110 },
  PA: { currency: "EUR", budget: 32, mid: 60, luxury: 110 },

  // ─── SOUTH AMERICA ───────────────────
  BR: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  AR: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  CL: { currency: "EUR", budget: 38, mid: 68, luxury: 125 },
  CO: { currency: "EUR", budget: 24, mid: 42, luxury: 80 },
  PE: { currency: "EUR", budget: 24, mid: 42, luxury: 80 },
  EC: { currency: "EUR", budget: 24, mid: 42, luxury: 80 },
  BO: { currency: "EUR", budget: 22, mid: 38, luxury: 70 },
  PY: { currency: "EUR", budget: 22, mid: 38, luxury: 70 },
  UY: { currency: "EUR", budget: 32, mid: 60, luxury: 110 },

  // ─── ASIA ────────────────────────────
  IN: { currency: "EUR", budget: 18, mid: 32, luxury: 65 },
  TH: { currency: "EUR", budget: 23, mid: 42, luxury: 85 },
  VN: { currency: "EUR", budget: 21, mid: 38, luxury: 75 },
  ID: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  PH: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  MY: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  CN: { currency: "EUR", budget: 32, mid: 60, luxury: 110 },
  JP: { currency: "EUR", budget: 55, mid: 95, luxury: 180 },
  KR: { currency: "EUR", budget: 50, mid: 90, luxury: 170 },
  SG: { currency: "EUR", budget: 60, mid: 100, luxury: 190 },
  HK: { currency: "EUR", budget: 55, mid: 95, luxury: 180 },
  NP: { currency: "EUR", budget: 16, mid: 28, luxury: 55 },
  LK: { currency: "EUR", budget: 18, mid: 32, luxury: 65 },
  BD: { currency: "EUR", budget: 16, mid: 28, luxury: 55 },
  KH: { currency: "EUR", budget: 21, mid: 38, luxury: 75 },
  LA: { currency: "EUR", budget: 21, mid: 38, luxury: 75 },

  // ─── MIDDLE EAST ─────────────────────
  AE: { currency: "EUR", budget: 42, mid: 78, luxury: 150 },
  SA: { currency: "EUR", budget: 38, mid: 72, luxury: 145 },
  TR: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  IL: { currency: "EUR", budget: 48, mid: 88, luxury: 170 },
  JO: { currency: "EUR", budget: 32, mid: 60, luxury: 110 },
  OM: { currency: "EUR", budget: 38, mid: 72, luxury: 145 },

  // ─── AFRICA ──────────────────────────
  MA: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  TN: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  EG: { currency: "EUR", budget: 21, mid: 38, luxury: 75 },
  ZA: { currency: "EUR", budget: 28, mid: 52, luxury: 95 },
  KE: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  TZ: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  UG: { currency: "EUR", budget: 21, mid: 38, luxury: 75 },
  GH: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },
  NG: { currency: "EUR", budget: 23, mid: 42, luxury: 80 },

  // ─── OCEANIA ─────────────────────────
  AU: { currency: "EUR", budget: 50, mid: 90, luxury: 170 },
  NZ: { currency: "EUR", budget: 48, mid: 88, luxury: 165 },
  FJ: { currency: "EUR", budget: 38, mid: 68, luxury: 125 },

  // ─── EUROPE (missing previously) ─────────────────────────
  AL: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },  // Albania 🇦🇱
  AD: { currency: "EUR", budget: 70, mid: 100, luxury: 180 }, // Andorra 🇦🇩
  BY: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Belarus 🇧🇾
  BA: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Bosnia and Herzegovina 🇧🇦
  CY: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Cyprus 🇨🇾
  EE: { currency: "EUR", budget: 38, mid: 70, luxury: 120 },  // Estonia 🇪🇪
  LV: { currency: "EUR", budget: 36, mid: 65, luxury: 110 },  // Latvia 🇱🇻
  LI: { currency: "EUR", budget: 80, mid: 130, luxury: 240 }, // Liechtenstein 🇱🇮
  LT: { currency: "EUR", budget: 35, mid: 65, luxury: 110 },  // Lithuania 🇱🇹
  LU: { currency: "EUR", budget: 70, mid: 120, luxury: 220 }, // Luxembourg 🇱🇺
  MT: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Malta 🇲🇹
  MD: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Moldova 🇲🇩
  MC: { currency: "EUR", budget: 120, mid: 200, luxury: 350 },// Monaco 🇲🇨
  ME: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Montenegro 🇲🇪
  MK: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // North Macedonia 🇲🇰
  SM: { currency: "EUR", budget: 60, mid: 100, luxury: 180 }, // San Marino 🇸🇲
  RS: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Serbia 🇷🇸
  SK: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Slovakia 🇸🇰
  SI: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Slovenia 🇸🇮
  UA: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },  // Ukraine 🇺🇦
  VA: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Vatican City 🇻🇦

  // ─── NORTH & CENTRAL AMERICA ───────────────────
  AG: { currency: "EUR", budget: 60, mid: 100, luxury: 180 }, // Antigua and Barbuda 🇦🇬
  BS: { currency: "EUR", budget: 60, mid: 100, luxury: 180 }, // Bahamas 🇧🇸
  BB: { currency: "EUR", budget: 55, mid: 95, luxury: 170 },  // Barbados 🇧🇧
  BZ: { currency: "EUR", budget: 45, mid: 80, luxury: 140 },  // Belize 🇧🇿
  CU: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Cuba 🇨🇺
  DM: { currency: "EUR", budget: 55, mid: 90, luxury: 160 },  // Dominica 🇩🇲
  DO: { currency: "EUR", budget: 45, mid: 80, luxury: 140 },  // Dominican Republic 🇩🇴
  SV: { currency: "EUR", budget: 35, mid: 60, luxury: 110 },  // El Salvador 🇸🇻
  GD: { currency: "EUR", budget: 55, mid: 90, luxury: 160 },  // Grenada 🇬🇩
  GT: { currency: "EUR", budget: 35, mid: 60, luxury: 110 },  // Guatemala 🇬🇹
  HT: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Haiti 🇭🇹
  HN: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },  // Honduras 🇭🇳
  JM: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Jamaica 🇯🇲
  NI: { currency: "EUR", budget: 30, mid: 55, luxury: 100 },  // Nicaragua 🇳🇮
  KN: { currency: "EUR", budget: 55, mid: 90, luxury: 160 },  // Saint Kitts and Nevis 🇰🇳
  LC: { currency: "EUR", budget: 55, mid: 90, luxury: 160 },  // Saint Lucia 🇱🇨
  VC: { currency: "EUR", budget: 50, mid: 85, luxury: 150 },  // Saint Vincent & Grenadines 🇻🇨
  TT: { currency: "EUR", budget: 45, mid: 80, luxury: 140 },  // Trinidad and Tobago 🇹🇹

  // ─── SOUTH AMERICA ───────────────────
  GY: { currency: "EUR", budget: 35, mid: 60, luxury: 110 },  // Guyana 🇬🇾
  SR: { currency: "EUR", budget: 40, mid: 70, luxury: 130 },  // Suriname 🇸🇷
  VE: { currency: "EUR", budget: 40, mid: 70, luxury: 130 },  // Venezuela 🇻🇪

  // ─── ASIA ────────────────────────────
  AF: { currency: "EUR", budget: 50, mid: 85, luxury: 150 },  // Afghanistan 🇦🇫
  AM: { currency: "EUR", budget: 40, mid: 70, luxury: 120 },  // Armenia 🇦🇲
  AZ: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Azerbaijan 🇦🇿
  BH: { currency: "EUR", budget: 55, mid: 95, luxury: 160 },  // Bahrain 🇧🇭
  BT: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Bhutan 🇧🇹
  BN: { currency: "EUR", budget: 55, mid: 95, luxury: 160 },  // Brunei 🇧🇳
  GE: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Georgia 🇬🇪
  IR: { currency: "EUR", budget: 50, mid: 90, luxury: 160 },  // Iran 🇮🇷
  IQ: { currency: "EUR", budget: 45, mid: 80, luxury: 140 },  // Iraq 🇮🇶
  KZ: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Kazakhstan 🇰🇿
  KW: { currency: "EUR", budget: 65, mid: 110, luxury: 190 }, // Kuwait 🇰🇼
  KG: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Kyrgyzstan 🇰🇬
  MV: { currency: "EUR", budget: 50, mid: 90, luxury: 160 },  // Maldives 🇲🇻
  MN: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Mongolia 🇲🇳
  MM: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Myanmar 🇲🇲
  PK: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Pakistan 🇵🇰
  QA: { currency: "EUR", budget: 70, mid: 115, luxury: 200 }, // Qatar 🇶🇦
  TJ: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Tajikistan 🇹🇯
  TL: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Timor-Leste 🇹🇱
  TM: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Turkmenistan 🇹🇲
  UZ: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Uzbekistan 🇺🇿
  YE: { currency: "EUR", budget: 45, mid: 80, luxury: 140 },  // Yemen 🇾🇪
  PS: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Palestine 🇵🇸

  // ─── AFRICA ──────────────────────────
  DZ: { currency: "EUR", budget: 30, mid: 55, luxury: 95 },   // Algeria 🇩🇿
  AO: { currency: "EUR", budget: 30, mid: 55, luxury: 95 },   // Angola 🇦🇴
  BJ: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Benin 🇧🇯
  BW: { currency: "EUR", budget: 35, mid: 60, luxury: 110 },  // Botswana 🇧🇼
  BF: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Burkina Faso 🇧🇫
  BI: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Burundi 🇧🇮
  CV: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Cabo Verde 🇨🇻
  CM: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Cameroon 🇨🇲
  CF: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Central African Republic 🇨🇫
  TD: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Chad 🇹🇩
  KM: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Comoros 🇰🇲
  CG: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Congo (Republic) 🇨🇬
  CD: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // DR Congo 🇨🇩
  CI: { currency: "EUR", budget: 27, mid: 48, luxury: 82 },   // Côte d’Ivoire 🇨🇮
  DJ: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Djibouti 🇩🇯
  GQ: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Equatorial Guinea 🇬🇶
  ER: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Eritrea 🇪🇷
  SZ: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Eswatini 🇸🇿
  ET: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Ethiopia 🇪🇹
  GA: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Gabon 🇬🇦
  GM: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Gambia 🇬🇲
  GN: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Guinea 🇬🇳
  GW: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Guinea-Bissau 🇬🇼
  LS: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Lesotho 🇱🇸
  LR: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Liberia 🇱🇷
  LY: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Libya 🇱🇾
  MW: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Malawi 🇲🇼
  ML: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Mali 🇲🇱
  MR: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Mauritania 🇲🇷
  MU: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Mauritius 🇲🇺
  MZ: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Mozambique 🇲🇿
  NA: { currency: "EUR", budget: 30, mid: 55, luxury: 90 },   // Namibia 🇳🇦
  NE: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Niger 🇳🇪
  RW: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Rwanda 🇷🇼
  SN: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Senegal 🇸🇳
  SC: { currency: "EUR", budget: 35, mid: 60, luxury: 100 },  // Seychelles 🇸🇨
  SL: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Sierra Leone 🇸🇱
  SO: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Somalia 🇸🇴
  SS: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // South Sudan 🇸🇸
  SD: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Sudan 🇸🇩
  TG: { currency: "EUR", budget: 25, mid: 45, luxury: 80 },   // Togo 🇹🇬
  ZM: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Zambia 🇿🇲
  ZW: { currency: "EUR", budget: 28, mid: 50, luxury: 85 },   // Zimbabwe 🇿🇼

  // ─── OCEANIA ─────────────────────────
  PG: { currency: "EUR", budget: 45, mid: 80, luxury: 150 },  // Papua New Guinea 🇵🇬
  WS: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Samoa 🇼🇸
  SB: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Solomon Islands 🇸🇧
  TO: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Tonga 🇹🇴
  VU: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Vanuatu 🇻🇺
  KI: { currency: "EUR", budget: 35, mid: 65, luxury: 110 },  // Kiribati 🇰🇮
  FM: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Micronesia 🇫🇲
  MH: { currency: "EUR", budget: 45, mid: 80, luxury: 150 },  // Marshall Islands 🇲🇭
  NR: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Nauru 🇳🇷
  PW: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Palau 🇵🇼
  TV: { currency: "EUR", budget: 40, mid: 75, luxury: 130 },  // Tuvalu 🇹🇻
}

