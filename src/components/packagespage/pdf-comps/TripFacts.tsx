"use client";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

interface FactInfo {
  id: number;
  title: string | null;
  details: string;
  icon: string;
}

interface TripFact {
  id: number;
  title: string | null;
  fact_info: FactInfo[];
}

const TripFacts: React.FC<{ tripFacts: TripFact[] }> = ({ tripFacts }) => {
  return (
    <>
      {/* Section title */}
      <Text style={styles.sectionTitle}>Facts of the Trip</Text>

      {tripFacts.map((tripFact) => (
        <View key={tripFact.id} style={styles.factsContent}>
          {/* Optional fact category title */}
          {tripFact.title && (
            <Text style={[styles.subTitle, { marginBottom: 8 }]}>
              {tripFact.title}
            </Text>
          )}

          {/* Fact details in two columns */}
          <View style={styles.twoColumnContainer}>
            {tripFact.fact_info.map((fact) => (
              <View key={fact.id} style={styles.twoColumnItem}>
                <Text style={styles.sectionContent}>
                  <Text style={styles.bold}>{fact.title}:</Text> {fact.details}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </>
  );
};

export default TripFacts;

export const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#121212",
    padding: 6,
    paddingLeft: 10,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  subTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },

  sectionContent: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
  },

  bold: {
    fontWeight: "bold",
  },

  factsContent: {
    marginBottom: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },

  twoColumnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  twoColumnItem: {
    width: "48%",
    marginBottom: 6,
  },
});
