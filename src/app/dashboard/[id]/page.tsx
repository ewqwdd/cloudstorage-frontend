import styles from '../dashboard.module.css'
import Back from "./(ui)/Back";
import Image from "next/image";
import VStack from "@/shared/ui/VStack";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  return (
    <VStack className={"justify-center w-full h-full max-w-6xl mx-auto py-8 px-4 " + styles.fullheight}>
      <Back />
      <div className="relative grow">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + "uploads/" + id}
          alt={"image"}
          fill
          className="object-contain"
        />
      </div>
    </VStack>
  );
}
