import VStack from "@/shared/ui/VStack";
import Image from "next/image";
import CloudImage from '@/shared/images/cloud.png'
import styles from './page.module.css'
import FileIcon from '@/shared/icons/fileColor.svg'
import ImageIcon from '@/shared/images/image.png'
import {Figtree} from 'next/font/google'
import Link from "next/link";
import Button from "@/shared/ui/Button";

const figtree = Figtree({
  subsets: ['latin']
})

const features = [
 <li key={1}><span className="font-semibold">🔐 Secure and Private:</span> Your data{"'"}s security is our top priority. We employ state-of-the-art encryption protocols to ensure that your files remain confidential and secure.</li>,
<li key={2}><span className="font-semibold">💻 User-Friendly Interface:</span> Our intuitive interface makes it easy for users of all levels to upload, organize, and access their files effortlessly. No more navigating through complex menus—[Your Project Name] is designed with you in mind.</li>,
<li key={3}><span className="font-semibold">🌐 Access Anywhere, Anytime:</span> Whether you{"'"}re at home, in the office, or on the go, access your files seamlessly from any device with an internet connection. Our platform is optimized for both desktop and mobile use.</li>,
<li key={4}><span className="font-semibold">🔄 Effortless File Sharing:</span> Share files with colleagues, friends, or family with just a few clicks. Maintain full control over who can view or edit your files, ensuring your data remains in the right hands.</li>,
<li key={5}><span className="font-semibold">📈 Scalability:</span> As your storage needs grow, [Your Project Name] grows with you. Upgrade your storage capacity effortlessly to accommodate your expanding digital portfolio.</li>
]

export default function Home() {
  return (
    <main className="bg-cyan-900">
      <VStack as='header' id='header' className={"bg-cyan-600 justify-center gap-16 pb-12 relative px-4 " + styles.fullheight}>
        <div className={"relative mx-auto aspect-video w-3/4 max-w-lg pointer-events-none"}>
          <Image src={CloudImage} alt='cloud' fill className={"opacity-80 select-none " + styles.cloud} />
          <FileIcon className={'absolute left-[20%] w-[30%] h-[30%] select-none ' + styles.file} />
          <FileIcon className={'absolute right-[10%] bottom-0 w-[30%] h-[30%] select-none ' + styles.file} />
          <div className={'absolute left-[2%] bottom-[10%] w-[30%] h-[30%] select-none ' + styles.file}>
            <Image src={ImageIcon} alt='image icon' />
          </div>
        </div>
        <VStack className="items-center gap-4">
          <h1 className={"md:text-4xl sm:text-3xl text-2xl font-bold text-slate-50/85 text-center max-w-2xl " + figtree.className + ' ' + styles.heading}>
            Welcome to <span className="font-extrabold text-slate-50/90">SUPERCLOUD</span> - Your Secure File Storage Solution
          </h1>
          <p className={"text-slate-50/60 text-base sm:text-lg leading-none max-w-3xl text-center " + styles.subHeading}>
          Are you tired of juggling multiple file storage platforms? Looking for a simple, secure, and streamlined solution to manage your digital assets? Look no further! SuperCloud is here to revolutionize the way you store and organize your files.
          </p>
        </VStack>
        <a href="#features" className={"p-3 left-1/2 text-nowrap -translate-x-1/2 text-xl text-slate-100 absolute bottom-8 bg-cyan-950 border-2 border-cyan-100 rounded-full hover:opacity-85 transition-all " + styles.findoutmore}>
          Find out more.
        </a>
      </VStack>
      <section id='features' className="grid lg:grid-cols-3 max-w-5xl mx-auto px-4 py-10 gap-8">
        <VStack className="lg:col-span-2 max-lg:order-2">
          <h2 className="text-4xl font-semibold text-slate-200">
            Key Features:
          </h2>
          <VStack as='ul' className="text-slate-200/90 text-base [&>li]:my-2">
            {features.map(elem => elem)}
          </VStack>
        </VStack>
        <VStack className="justify-center items-center max-sm:px-4 max-lg:px-8 rounded-lg max-lg:order-1 bg-cyan-950 gap-4 place-self-center py-8">
          <h2 className="text-4xl font-semibold text-slate-300 text-center animate-pulse">
            What are you waiting for?
          </h2>
          <Button as={Link} href='/dashboard' className="text-xl">
            Get Started!
          </Button>
        </VStack>
      </section>
    </main>
  );
}
