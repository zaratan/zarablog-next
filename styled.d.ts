// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    yellow: string;
    orange: string;
    red: string;
    magenta: string;
    violet: string;
    blue: string;
    cyan: string;
    green: string;
    base0: string;
    base1: string;
    base2: string;
    base3: string;
    base00: string;
    base01: string;
    base02: string;
    base03: string;
  }
}
