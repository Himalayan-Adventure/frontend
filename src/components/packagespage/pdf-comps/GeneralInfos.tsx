"use client";
import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";

interface GeneralInfosProps {
  season: string;
  duration: string;
  grade: string;
  maxAltitude: string;
  location: string;
  hostedBy: string;
}

const GeneralInfos: React.FC<GeneralInfosProps> = ({
  season,
  duration,
  grade,
  maxAltitude,
  location,
  hostedBy,
}) => {
  const infoList = [
    { label: "Season", value: season },
    { label: "Duration", value: `${duration} days` },
    { label: "Grade", value: grade },
    { label: "Max Altitude", value: maxAltitude },
    { label: "Location", value: location },
    { label: "Hosted By", value: hostedBy },
  ];

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        General Info
      </Text>
      <View style={styles.infoGrid}>
        {infoList.map(
          (item, idx) =>
            item.value && (
              <View style={styles.infoItem} key={idx}>
                <Text style={styles.infoLabel}>{item.label}:</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ),
        )}
      </View>
    </View>
  );
};

export default GeneralInfos;
