import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function HostInfo() {
  return (
    <section className="container py-4 lg:py-8">
      <div className="space-y-4">
        <div>
          <h1 className="font-bold lg:text-lg">
            Bordeaux, Nouvelle-Aquitaine, France
          </h1>
          <p className="text-sm md:text-base">
            Very dynamic and appreciated district by the people of Bordeaux
            thanks to rue St James and place Fernand Lafargue. Home to many
            historical monuments such as the Grosse Cloche, the Porte de
            Bourgogne and the Porte Cailhau, and cultural sites such as the
            Aquitaine Museum.
          </p>
          {/* show more button  */}
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-green-100">B</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-base md:text-lg font-semibold">Hosted by Ghazal</h2>
            <p className="text-sm md:text-base text-gray-600">joined may 2021</p>
          </div>
        </div>
        <div className="space-y-3 lg:max-w-lg text-sm md:text-base">
          <p className="font-semibold">Ghazal is a super host</p>
          <p>
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests.
          </p>
          <p>Response rate: 100%</p>
          <p>Response time: within an hour</p>
        </div>
        <div className="flex">
          <button className="rounded-lg border border-black px-4 py-2 text-sm md:text-base">
            Contact Host
          </button>
        </div>
      </div>
    </section>
  );
}
