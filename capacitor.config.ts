import { CapacitorConfig } from '@capacitor/cli';
import { BrowserPlugin } from '@capacitor/browser';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'appformuas2',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Browser: {
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
