import { Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const fira = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Next.js starter app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={fira.className}>
        <div id='root'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
