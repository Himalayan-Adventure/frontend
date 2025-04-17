"use client";
import { Text, View, Image } from "@react-pdf/renderer";
import React from "react";
import { styles } from "./styles";

interface ImageFormat {
  url: string;
}

interface ImageAttributes {
  name: string;
  formats: {
    medium?: ImageFormat;
    large?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  url: string;
}

interface GalleryImage {
  id: number;
  attributes: ImageAttributes;
}

interface GalleryProps {
  image: {
    data: GalleryImage[];
  };
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  const images = image?.data || [];

  if (!images.length) return null;

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Gallery</Text>
      <View style={styles.galleryGrid}>
        {images.map(({ id, attributes }) => {
          const imageUrl = attributes.formats?.medium?.url || attributes.url;
          return <Image key={id} src={imageUrl} style={styles.galleryImage} />;
        })}
      </View>
    </View>
  );
};

export default Gallery;
