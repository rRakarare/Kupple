import { Box, Container } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import Dropper from "../components/Dropper";

export default function Home() {
  return (
    <>
      <Container maxW={"7xl"}>
        <Dropper />
      </Container>
      <Box mx={10}>
        <DataTable />
      </Box>
    </>
  );
}
