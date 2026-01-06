import { store as Stores } from '../../redux';
import { LangList } from '../../common/constants';
import { Buffer } from 'buffer';
import crypto from 'react-native-quick-crypto';

interface LangListProps {
  [key: string]: string[];
  // ... other properties
}

const API_ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef';
const API_VI_KEY = 'abcdef9876543210';
const algorithm = 'aes-256-cbc';

const key = Buffer.from(API_ENCRYPTION_KEY);
const iv = Buffer.from(API_VI_KEY);

function toBuffer(data: unknown): Buffer {
  if (typeof data === 'string') {
    return Buffer.from(data, 'utf8');
  }

  if (data instanceof ArrayBuffer) {
    return Buffer.from(new Uint8Array(data));
  }

  if (data instanceof Uint8Array) {
    return Buffer.from(data);
  }

  if (Buffer.isBuffer(data)) {
    return data;
  }

  throw new Error(
    `Unsupported data type for Buffer conversion: ${typeof data}`,
  );
}

export const UtilsFunc = {
  encryptData: (plainText: any): any => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const updateResult = cipher.update(Buffer.from(plainText, 'utf8'));
    const finalResult = cipher.final();

    const encrypted = Buffer.concat([
      toBuffer(updateResult),
      toBuffer(finalResult),
    ]);

    return encrypted.toString('base64');
  },

  decryptData: (encryptedText: string): string => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const updateResult = decipher.update(Buffer.from(encryptedText, 'base64'));
    const finalResult = decipher.final();

    const decrypted = Buffer.concat([
      toBuffer(updateResult),
      toBuffer(finalResult),
    ]);

    return decrypted.toString('utf8');
  },

  getCurrentQuarterDate: () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (currentMonth >= 1 && currentMonth <= 3) {
      return { quarter: 'Q1', year: `${currentYear}` };
    }
    if (currentMonth >= 4 && currentMonth <= 6) {
      return { quarter: 'Q2', year: `${currentYear}` };
    }
    if (currentMonth >= 7 && currentMonth <= 9) {
      return { quarter: 'Q3', year: `${currentYear}` };
    }
    if (currentMonth >= 10 && currentMonth <= 12) {
      return { quarter: 'Q4', year: `${currentYear}` };
    }
  },

  searchDashboardData: (data: any[], search: string) => {
    if (search?.length > 0) {
      return data.filter(
        (item: any) =>
          item?.first_name?.toLowerCase().includes(search?.toLowerCase()) ||
          item?.last_name?.toLowerCase().includes(search?.toLowerCase()),
      );
    } else {
      return [...data];
    }
  },

  getUpdateArr: (data1: string[], data2: string[]) => {
    for (let i = 0; i < data2.length; i++) {
      data1[i] = data2[i];
    }
    return data1;
  },

  getCovertedString: (str: string): string => {
    const { selectedLang } = Stores.getState()?.lang;
    const langList: LangListProps = LangList;

    if (langList?.hasOwnProperty(str)) {
      if (selectedLang === 'en') {
        return langList?.[str]?.[0];
      } else {
        return langList?.[str]?.[1];
      }
    } else {
      return str;
    }
  },
};
