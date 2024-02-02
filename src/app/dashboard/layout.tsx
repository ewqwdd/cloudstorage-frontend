import HStack from '@/shared/ui/HStack'
import styles from './dashboard.module.css'
import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: "Dashboard",
  };

export default function Layout({
    children,
    modal
  }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode
  }>) {
  return (
    <HStack className={styles.fullheight + " flex overflow-y-clip"}>
        {children}
        {modal}
    </HStack>
  )
}
