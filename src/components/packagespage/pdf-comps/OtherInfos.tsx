"use client";
import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";

interface DescriptionBlock {
  type: string;
  children: { text: string; type: string }[];
}

interface OtherInfo {
  id: number;
  title: string;
  description: DescriptionBlock[];
}

interface OtherInfosProps {
  others: OtherInfo[];
}

const OtherInfos: React.FC<OtherInfosProps> = ({ others }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
        Other Information
      </Text>
      {others?.map((info) => (
        <View key={info.id} style={styles.otherInfoBlock}>
          <Text style={styles.otherInfoTitle}>{info.title}</Text>
          {info.description?.map((block, idx) =>
            block.children?.map((child, i) => (
              <Text key={`${idx}-${i}`} style={styles.otherInfoText}>
                {child.text}
              </Text>
            )),
          )}
        </View>
      ))}
    </View>
  );
};

export default OtherInfos;
