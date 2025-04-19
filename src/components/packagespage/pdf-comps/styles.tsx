import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8f9fa",
    padding: 30,
    fontFamily: "Nunito",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#121212",
    borderBottom: "2px solid #F29017",
    paddingBottom: 6,
  },

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

  sectionContent: {
    fontSize: 12,
    marginBottom: 12,
    color: "#555",
    lineHeight: 1.5,
  },

  image: {
    width: "48%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    objectFit: "cover",
  },

  list: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 1.5,
  },

  bold: { fontWeight: "bold" },

  logo: {
    width: 100,
    height: 50,
    marginBottom: 12,
  },

  packageName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 12,
  },

  tableContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 6,
    overflow: "hidden",
    border: "1px solid #F29017",
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#121212",
    padding: 6,
    borderBottom: 1,
    borderColor: "#F29017",
  },

  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    width: "45%",
    textAlign: "center",
    color: "#fff",
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#eee",
  },

  tableCell: {
    width: "45%",
    fontSize: 11,
    padding: 6,
    color: "#333",
  },

  factsContent: {
    fontSize: 12,
    color: "#555",
    lineHeight: 1.4,
  },

  twoColumnContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  twoColumnItem: {
    width: "48%",
    marginBottom: 15,
  },

  galleryGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },

  galleryImage: {
    width: 250,
    height: 180,
    marginBottom: 10,
    objectFit: "cover",
    borderRadius: 8,
  },

  reviewBox: {
    marginBottom: 12,
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    backgroundColor: "#FAFAFA",
  },

  reviewName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#121212",
  },

  reviewText: {
    fontSize: 11,
    lineHeight: 1.4,
    color: "#555",
  },

  infoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  infoItem: {
    width: "47%",
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#FDFEFE",
    border: "1px solid #eee",
    borderRadius: 6,
  },

  infoLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 11,
    color: "#555",
    lineHeight: 1.4,
  },

  otherInfoBlock: {
    marginBottom: 14,
    padding: 10,
    backgroundColor: "#FDF3E3",
    borderLeft: "4px solid #F29017",
    borderRadius: 6,
  },

  otherInfoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 4,
    textTransform: "capitalize",
  },

  otherInfoText: {
    fontSize: 11,
    color: "#555",
    lineHeight: 1.5,
  },
});
