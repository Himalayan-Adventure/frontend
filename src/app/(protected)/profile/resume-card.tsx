import { Separator } from "@radix-ui/react-dropdown-menu";
import { BookOpenText, Circle, Dot, FileSearch, Mail, MapPin, Pen, Phone, Plane, UserRound } from "lucide-react";
import { Text } from "@/components/ui/text";
import { MdPhone } from "react-icons/md";
import Link from "next/link";
import { AiFillBehanceCircle } from "react-icons/ai";
import { PiBasketballThin } from "react-icons/pi";
import { IoLogoFigma } from "react-icons/io5";
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobexd,
} from "react-icons/si";
export const ResumeCard = () => {
  const resumeData = {
    name: "Andrey Rublev",
    role: "UI/UX Designer",
    contact: {
      email: "mehedihasankhan153@gmail.com",
      phone: "+8801633165851",
      location: "Joydepur, Gazipur, Bangladesh",
    },
    portfolio: {
      behance: "https://www.behance.net/mehedihasankhan1",
      dribbble: "https://www.dribbble.com/mehedihasan5851",
    },
    education: {
      institution:
        "Model Institute of Science and Technology (Under National University)",
      degree: "Bachelor of Science (BSC)",
      subject: "Computer Science and Engineering (CSE)",
      result: "GPA in Progress (Last Semester)",
    },
    hardSkills: [
      "Problem Solving",
      "Wireframing",
      "Responsive Design",
      "Usability Testing",
      "Prototyping",
      "High Fidelity Design",
    ],
    technicalSkill: [
      { skillName: "Figma", skillLevel: 80 },
      { skillName: "Adobe XD", skillLevel: 70 },
      { skillName: "Adobe Photoshop", skillLevel: 85 },
      { skillName: "Adobe Illustrator", skillLevel: 75 },
    ],
    languages: ["English", "Bangla", "Hindi"],
    interests: ["Research", "Travel", "Reading", "Writing"],
  };
  const contactIconMap = {
    email: <Mail size={24} />,
    phone: <MdPhone size={24} />,
    location: <MapPin size={24} />,
  };
  const portfolioIconMap: { [key: string]: React.ReactNode } = {
    behance: <AiFillBehanceCircle size={24} />,
    dribbble: <PiBasketballThin size={24} className="rotate-[45deg]" />,
  };
  const technicalSkillconMap: { [key: string]: React.ReactNode } = {
    Figma: <IoLogoFigma size={24} />,
    "Adobe XD": <SiAdobexd size={24} />,
    "Adobe Photoshop": <SiAdobephotoshop size={24} />,
    "Adobe Illustrator": <SiAdobeillustrator size={24} />,
  };
  const InterestslconMap: { [key: string]: React.ReactNode } = {
    "Research": <FileSearch size={24}/>,
    "Travel": <Plane size={24}/>,
    "Reading": <BookOpenText size={24} />,
    "Writing": <Pen size={24} />,
  };

  return (
    <div className="rounded-xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Resume</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        {/* User details */}
        <div>
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Andrey Rublev
          </Text>
          <Text variant="text-lg" className="text-primary">
            UI/UX Designer
          </Text>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Contact
          </Text>
          <div className="space-y-2">
            <LinkWithIcon
              href={`mailto:${resumeData.contact.email}`}
              icon={contactIconMap.email}
              name={resumeData.contact.email}
            />
            <LinkWithIcon
              href={`tel:${resumeData.contact.phone}`}
              icon={contactIconMap.phone}
              name={resumeData.contact.phone}
            />

            <LinkWithIcon
              href={`https://www.google.com/maps/place/${resumeData.contact.location}`}
              icon={contactIconMap.location}
              name={resumeData.contact.location}
            />
          </div>
        </div>

        {/* Portfolio details */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Portfolio
          </Text>
          <div className="space-y-2">
            {Object.entries(resumeData.portfolio).map(([key, value]) => (
              <LinkWithIcon
                key={`portfolio-${key}`}
                href={value}
                icon={portfolioIconMap[key]}
                name={value}
              />
            ))}
          </div>
        </div>

        {/* Education details */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Education
          </Text>
          <div className="space-y-2">
            {Object.entries(resumeData.education).map(([key, value]) => (
              <span key={`education-${key}`} className="flex items-start">
                <Text
                  variant="text-lg"
                  className="whitespace-nowrap first-letter:capitalize"
                >
                  {key}:&nbsp;
                </Text>

                <Text variant="text-lg" className="first-letter:capitalize">
                  {value}
                </Text>
              </span>
            ))}
          </div>
        </div>

        {/* Hard details */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Hard Skills
          </Text>
          <div className="space-y-2">
            {resumeData.hardSkills.map((skill) => (
              <Text
                variant="text-lg"
                key={`hardskill-${skill}`}
                className="whitespace-nowrap first-letter:capitalize"
              >
                {skill}
              </Text>
            ))}
          </div>
        </div>

        {/* Technical skills */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Technical Skills
          </Text>
          <div className="space-y-5">
            {resumeData.technicalSkill.map(({ skillLevel, skillName }) => (
              <div key={`technical-skill-${skillName}`} className="space-y-2">
                <span className="flex items-center gap-x-4">
                  {technicalSkillconMap[skillName]}
                  <Text
                    variant="text-lg"
                    className="whitespace-nowrap first-letter:capitalize"
                  >
                    {skillName}
                  </Text>
                </span>
                <div className="relative w-80">
                  <Separator className="realtive h-1 w-full bg-black" />
                  <Circle
                    fill="#000"
                    size={14}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${skillLevel}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages*/}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Languages
          </Text>
          <div className="space-y-2">
            {resumeData.languages.map((lang) => (
              <Text
                variant="text-lg"
                key={`languages-${lang}`}
                className="whitespace-nowrap first-letter:capitalize"
              >
                {lang}
              </Text>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <Text variant="text-xl" className="font-semibold lg:text-2xl">
            Interests
          </Text>
          <div className="flex items-center gap-x-2">
            {resumeData.interests.map((lang) => (
              <Text
                variant="text-md"
                key={`languages-${lang}`}
                className="whitespace-nowrap first-letter:capitalize grid place-items-center"
              >
                {InterestslconMap[lang]}
                {lang}
              </Text>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



const LinkWithIcon = ({
  href,
  icon,
  name,
}: {
  href: string;
  icon: React.ReactNode;
  name: string;
}) => {
  return (
    <Link href={href} target="_blank" className="flex items-center gap-x-2">
      {icon}
      <Text variant="text-lg" className="sm:text-md text-sm md:text-lg">
        {name}
      </Text>
    </Link>
  );
};
