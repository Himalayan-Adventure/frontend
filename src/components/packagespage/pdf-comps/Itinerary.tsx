"use client";
import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";

interface TimelineItem {
  id: number;
  week: string;
  day: string;
  description: string;
}

const Itinerary: React.FC<{ timeline: TimelineItem[] }> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  const groupedByWeek: Record<string, TimelineItem[]> = timeline.reduce(
    (acc, item) => {
      if (!acc[item.week]) acc[item.week] = [];
      acc[item.week].push(item);
      return acc;
    },
    {} as Record<string, TimelineItem[]>,
  );

  return (
    <View style={{ marginTop: 20 }}>
      {/* Itinerary Title */}
      <Text style={styles.sectionTitle}>Itinerary</Text>

      {Object.entries(groupedByWeek).map(([week, days]) => (
        <View key={week} style={{ marginBottom: 20 }}>
          <Text
            style={[
              styles.bold,
              {
                marginBottom: 8,
                fontSize: 12,
                backgroundColor: "#f2f2f2",
                padding: 5,
                borderRadius: 4,
                color: "#2C3E50",
              },
            ]}
          >
            Week {week}
          </Text>

          {days.map((item) => (
            <View
              key={item.id}
              style={{
                marginBottom: 8,
                padding: 8,
                borderRadius: 6,
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
              }}
            >
              <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                <Text style={[styles.bold, { fontSize: 10, color: "#34495E" }]}>
                  Day {item.day}:{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#555" }}>
                  {item.description}
                </Text>
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Itinerary;
