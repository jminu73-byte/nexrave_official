export interface MemberProfile {
  id: string;
  koreanName: string;
  englishName: string;
  birthdate: string;
  pastelBg: string;
  image: string;
  instagramHandle: string;
  role: string;
}

export interface DiscographyItem {
  id: string;
  date: string;
  type: 'Single' | 'EP' | 'Full';
  albumTitle: string;
  titleTrack: string;
  coverImage: string;
  tracks: string[];
}

export const FIXED_BACKGROUND_IMAGE = '/assets/aistudio/___432e289e.png';
export const GROUP_CONCEPT_IMAGE = '/assets/aistudio/____5c5970b8.png';

export const GROUP_INFO = {
  name: 'NEXRAVE',
  agency: 'daelim',
  debutDate: '2026.12.11',
  tagline: 'NEXRAVE — Five voices, one singular presence.',
};

export const MEMBERS: MemberProfile[] = [
  {
    id: 'jea',
    koreanName: '제아',
    englishName: 'JEA',
    birthdate: '2007',
    pastelBg: '#E4D7F5', // Lilac
    image: '/assets/aistudio/1_9dc5cde4.png',
    instagramHandle: 'nexrave_official',
    role: 'Vocal',
  },
  {
    id: 'seorin',
    koreanName: '서린',
    englishName: 'SEORIN',
    birthdate: '2003',
    pastelBg: '#D0E6F8', // Sky Blue
    image: '/assets/aistudio/2_5e19ec73.png',
    instagramHandle: 'nexrave_official',
    role: 'Leader · Vocal',
  },
  {
    id: 'ryua',
    koreanName: '류아',
    englishName: 'RYUA',
    birthdate: '2005',
    pastelBg: '#D2F0E4', // Light Mint
    image: '/assets/aistudio/3_cc6cb8cc.png',
    instagramHandle: 'nexrave_official',
    role: 'Main Dancer · Rap',
  },
  {
    id: 'ian',
    koreanName: '이안',
    englishName: 'IAN',
    birthdate: '2004',
    pastelBg: '#FAF8F5', // Soft White / Cream
    image: '/assets/aistudio/4_846a7a1f.png',
    instagramHandle: 'nexrave_official',
    role: 'Vocal · Center',
  },
  {
    id: 'sion',
    koreanName: '시온',
    englishName: 'SION',
    birthdate: '2006',
    pastelBg: '#FCF1C6', // Warm Yellow
    image: '/assets/aistudio/5_e9ec33c5.png',
    instagramHandle: 'nexrave_official',
    role: 'Main Vocal',
  },
];

export const DISCOGRAPHY: DiscographyItem[] = [
  {
    id: 'nexrave-debut',
    date: '2026.12.11',
    type: 'Single',
    albumTitle: 'NEXRAVE',
    titleTrack: 'IGNITE',
    coverImage: '/assets/aistudio/___d2da5873.png',
    tracks: ['IGNITE', 'SHADOWS'],
  },
];
