import {
  INTRO_SEEN_ATTRIBUTE,
  INTRO_SEEN_VALUE,
  INTRO_SESSION_KEY,
} from '@/constants/storage';

export const INTRO_SCRIPT = `try{if(sessionStorage.getItem('${INTRO_SESSION_KEY}')){document.documentElement.dataset.${INTRO_SEEN_ATTRIBUTE}='${INTRO_SEEN_VALUE}'}}catch(e){}`;
