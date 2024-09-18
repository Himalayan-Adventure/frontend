import fbIcon from "/public/icons/facebook-bw.png";
import WhatsAppIcon from "/public/icons/whatsApp-bw.png";
import MessagesIcon from "/public/icons/messages-bw.png";
import IgImage from "/public/icons/instagram-bw.png";
import { StaticImageData } from "next/image";
export const socialIcons:{name:string, href:string, icon:StaticImageData}[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: fbIcon,
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com",
    icon: WhatsAppIcon,
  },
  {
    name: "Messages",
    href: "https://messages.com",
    icon: MessagesIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: IgImage,
  },
];
