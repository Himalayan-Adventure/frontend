import { Separator } from "@radix-ui/react-dropdown-menu";
import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Text } from "@/components/ui/text";
import { MdPhone } from "react-icons/md";
import Link from "next/link";
import { AiFillBehanceCircle } from "react-icons/ai";
import { PiBasketballThin } from "react-icons/pi";
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

  return (
    <div className="rounded-xl bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="relative w-fit">
          <h1 className="w-fit text-3xl font-bold text-foreground">Resume</h1>
          <Separator className="h-2 w-auto bg-black" />
        </div>

        {/* User details */}
        <div>
          <Text variant="text-xl" className="text-2xl font-semibold">
            Andrey Rublev
          </Text>
          <Text variant="text-lg" className="text-primary">
            UI/UX Designer
          </Text>
        </div>

        {/* Contact details */}
        <div className="space-y-3">
          <Text variant="text-xl" className="text-2xl font-semibold">
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
          <Text variant="text-xl" className="text-2xl font-semibold">
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
          <Text variant="text-xl" className="text-2xl font-semibold">
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
          <Text variant="text-xl" className="text-2xl font-semibold">
            Hard Skills
          </Text>
          <div className="space-y-2">
            {resumeData.hardSkills.map((skill) => (
              <Text
                variant="text-lg"
                className="whitespace-nowrap first-letter:capitalize"
              >
                {skill}
              </Text>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center space-x-4 text-center">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">
          <UserRound />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const MyServices = () => {
  return (
    <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900">My Services</h2>
        <div className="mt-12 flex items-start divide-x-2">
          <ServiceItem
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. endent. Present tempus turpis mi, sed aliquet lectus dapibus in."
          />
          <ServiceItem
            title="Lorem Ipsum"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. endent. Present tempus turpis mi, sed aliquet lectus dapibus in."
          />
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
