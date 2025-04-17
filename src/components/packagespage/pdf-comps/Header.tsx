/* eslint-disable jsx-a11y/alt-text */
import { Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles";

const Header = ({ packageDetails }: any) => {
  return (
    <>
      {/* Logo Image */}
      <Image src="/logo-black.png" style={styles.logo} />

      {/* Package Name */}
      <Text style={styles.packageName}>{packageDetails.package_name}</Text>
    </>
  );
};

export default Header;
