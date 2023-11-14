import './globals.css'
import {Header} from "@/components/layout/Header";
import {Box} from "@mui/material";
import {ThemeProviderClient} from "../../public/theme";
import styles from "./page.module.css"

export const metadata = {
  title: 'Pelican Platform',
  description: 'Software designed to make data distribution easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProviderClient>
        <body>
          <Header/>
          <main className={styles.main}>
            {children}
          </main>
        </body>
      </ThemeProviderClient>
    </html>
  )
}
