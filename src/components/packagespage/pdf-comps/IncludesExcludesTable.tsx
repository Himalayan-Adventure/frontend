import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

const IncludesExcludesTable = ({ includes, excludes }: any) => {
  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Includes</Text>
        <Text style={styles.tableHeaderText}>Excludes</Text>
      </View>

      {/* Table Body */}
      {/* Loop through includes and excludes */}
      {includes.map((includeItem: { description: string }, index: number) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCell}>
            <Text>{includeItem.description}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{excludes[index]?.description || ""}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default IncludesExcludesTable;
