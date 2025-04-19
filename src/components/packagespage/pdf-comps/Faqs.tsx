"use client";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const Faqs: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <View style={{ marginTop: 20 }}>
      {/* FAQs Title */}
      <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>
        Frequently Asked Questions
      </Text>

      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqItem}>
          <Text style={[styles.faqQuestion, { fontWeight: "bold" }]}>
            <Text style={styles.bold}>Q:</Text> {faq.question}
          </Text>
          <Text style={styles.faqAnswer}>
            <Text style={styles.bold}>A:</Text> {faq.answer}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Faqs;

export const styles = StyleSheet.create({
  // existing ones...

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

  faqItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },

  faqQuestion: {
    fontSize: 11,
    marginBottom: 4,
    color: "#333",
    lineHeight: 1.4,
  },

  faqAnswer: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
  },

  bold: {
    fontWeight: "bold",
  },
});
