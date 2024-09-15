import { Separator } from "@radix-ui/react-dropdown-menu";
import {UserRound } from "lucide-react";
export const AboutCard = ()=>{
    return(

          <div>
            {/* About section */}
            <div className="bg-white px-4 py-8 sm:px-6 lg:px-8 rounded-xl">
              <div className="mx-auto max-w-3xl">
                <div className="relative w-fit">
                <h1 className="text-3xl w-fit font-bold text-foreground">About</h1>
                <Separator className="w-auto h-2 bg-black"/>

                </div>
                <p className="mt-4 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ac porta odio. Morbi imperdiet ligula eu nisl viverra,
                  et idareet erat faucibus. In a velit at neque tincidunt
                  elementum. Maecenas ultrices sollicitudin quam at hendrerit.
                  Praesent tempus turpis mi, sed aliquet lectus dapibus in.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                </p>
              </div>
            </div>
            <MyServices />
          </div>
    )
}

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
