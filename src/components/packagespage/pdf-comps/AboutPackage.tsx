import { Text } from "@react-pdf/renderer";
import { styles } from "./styles";

export const AboutPackage = ({ packageDetails }: any) => {
  return (
    <>
      <Text style={styles.sectionTitle}>About the Package</Text>
      <Text style={styles.sectionContent}>
        {packageDetails.brief_description} Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Obcaecati magni enim autem, natus
        quibusdam ea similique, ipsa vero doloribus iusto, maxime quam. Ducimus
        quisquam quod fugiat est error autem neque.
      </Text>
    </>
  );
};
