import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Noto_Serif as NotoSerif,
  Roboto as Roboto,
  Roboto_Mono as RobotoMono
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const notoSerif = NotoSerif({
  subsets: ["latin"],
  variable: "--font-noto"
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"]
});

export const robotoMono = RobotoMono({
  subsets: ["latin"],
  variable: "--font-roboto-mono"
});
