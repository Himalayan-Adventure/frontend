"use client";
import { Document, Font, Page, pdf, View } from "@react-pdf/renderer";
import React, { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { AboutPackage } from "./AboutPackage";
import Faqs from "./Faqs";
import Gallery from "./Gallery";
import GeneralInfos from "./GeneralInfos";
import Header from "./Header";
import IncludesExcludesTable from "./IncludesExcludesTable";
import Itinerary from "./Itinerary";
import OtherInfos from "./OtherInfos";
import Reviews from "./Reviews";
import { styles } from "./styles";
import TripFacts from "./TripFacts";

const PackagePDF: React.FC<{ packageDetails: any }> = ({ packageDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setIsLoading(true);
    try {
      Font.register({
        family: "Nunito",
        src: "/fonts/nunito/static/Nunito-Regular.ttf",
      });
      Font.register({
        family: "Nunito",
        src: "/fonts/nunito/static/Nunito-Bold.ttf",
        fontWeight: "bold",
      });
      Font.register({
        family: "Nunito",
        src: "/fonts/nunito/static/Nunito-Italic.ttf",
        fontStyle: "italic",
      });

      const doc = (
        <Document>
          <Page style={styles.page}>
            <Header packageDetails={packageDetails} />
            <AboutPackage packageDetails={packageDetails} />
            <GeneralInfos
              duration={packageDetails?.adventure_specification?.duration}
              season={
                packageDetails?.adventure_specification?.season?.[0]?.name
              }
              grade={packageDetails?.adventure_specification?.grade?.[0]?.name}
              maxAltitude={
                packageDetails?.adventure_specification?.max_altitude
              }
              hostedBy={packageDetails?.hostname}
              location="Nepal"
            />
            {packageDetails?.itinerary?.timeline && (
              <Itinerary timeline={packageDetails?.itinerary?.timeline} />
            )}
            {packageDetails?.itinerary?.includes && (
              <IncludesExcludesTable
                includes={packageDetails?.itinerary?.includes}
                excludes={packageDetails?.itinerary?.excludes}
              />
            )}
            {packageDetails?.trip_facts && (
              <TripFacts tripFacts={packageDetails?.trip_facts} />
            )}
            {packageDetails?.faq && <Faqs faqs={packageDetails?.faq} />}
            <Gallery image={packageDetails?.image} />
            {packageDetails?.itinerary?.others?.length > 0 && (
              <OtherInfos others={packageDetails?.itinerary?.others} />
            )}
            {packageDetails?.reviews?.data?.length > 0 && (
              <Reviews reviews={packageDetails?.reviews} />
            )}
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url); // still set this if you want to show the "Download" button later
      window.open(url, "_blank"); // auto open new tab
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-4">
        {/* View PDF Button */}
        {pdfUrl && (
          <button
            onClick={() => window.open(pdfUrl, "_blank")}
            className="flex items-center gap-2 rounded-lg border border-black px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl md:text-base"
          >
            <AiOutlineDownload /> Download PDF
          </button>
        )}
      </div>

      {/* Trigger PDF Generation Button */}
      {!pdfUrl && (
        <button
          onClick={handleGeneratePDF}
          disabled={isLoading}
          className="mt-4 flex items-center gap-2 rounded-lg border border-black px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl disabled:opacity-50 md:text-base"
        >
          {isLoading ? "Generating PDF..." : "Download PDF"}
        </button>
      )}
    </div>
  );
};

export default PackagePDF;
