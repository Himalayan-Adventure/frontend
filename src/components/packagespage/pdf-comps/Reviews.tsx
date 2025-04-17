"use client";
import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";

interface User {
  data: {
    attributes: {
      username: string;
    };
  };
}

interface ReviewAttributes {
  review: string;
  users_permissions_user: User;
}

interface Review {
  id: number;
  attributes: ReviewAttributes;
}

interface ReviewsProps {
  reviews: {
    data: Review[];
  };
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const reviewData = reviews?.data || [];

  if (!reviewData.length) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Reviews</Text>
      {reviewData.map(({ id, attributes }) => (
        <View key={id} style={styles.reviewBox}>
          <Text style={styles.reviewName}>
            {attributes.users_permissions_user?.data?.attributes?.username ||
              "Anonymous"}
          </Text>
          <Text style={styles.reviewText}>{attributes.review}</Text>
        </View>
      ))}
    </View>
  );
};

export default Reviews;
