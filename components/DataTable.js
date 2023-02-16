import { useDataStore } from "../utils/store";
import Table from "react-data-table-component";
import { useCallback, useState } from "react";
import { Button, HStack, Icon } from "@chakra-ui/react";
import Temp from "./Temp";

function DataTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "Kunden Nr.",
      selector: (row) => row["Kunden Nr."],
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row["Name"],
      sortable: true,
    },
    {
      name: "Vorname",
      selector: (row) => row["Vorname"],
      sortable: true,
    },
    {
      name: "Straße + HN",
      selector: (row) => row["Straße + HN"],
      sortable: true,
    },
    {
      name: "PLZ",
      selector: (row) => row["PLZ"],
      sortable: true,
    },
    {
      name: "Ort",
      selector: (row) => row["Ort"],
      sortable: true,
    },
    {
      name: "Geb.",
      selector: (row) => row["Geb."],
      sortable: true,
    },
    {
      name: "Krankenkasse",
      selector: (row) => row["Krankenkasse"],
      sortable: true,
    },

    {
      name: "Manuell",
      selector: (row) => row["Manuell"],
      sortable: true,
    },
    {
      name: "Mitarbeiter",
      selector: (row) => row["Mitarbeiter"],
      sortable: true,
    },
    {
      name: "Monatsstunden",
      selector: (row) => row["Monatsstunden"],
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row["Status"],
      sortable: true,
    },

    {
      name: "Tel.:",
      selector: (row) => row["Tel.:"],
      sortable: true,
    },
    {
      name: "Versicherungsnummer",
      selector: (row) => row["Versicherungsnummer"],
      sortable: true,
    },
  ];

  const data = useDataStore((state) => state.data);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <Table
      title="Liste"
      selectableRows
      columns={columns}
      contextComponent={<GoforIt selectedRows={selectedRows} />}
      data={data}
      onSelectedRowsChange={handleRowSelected}
    />
  );
}

export default DataTable;

function GoforIt({ selectedCount, selectedRows }) {
  console.log("sadsa", selectedRows);

  return (
    <>
      <HStack>
        <div>{selectedCount} Kunden ausgewählt</div>
        <Temp data={{
            kundenliste: selectedRows
        }} outputFileName={"listen"} wordFileUrl={"/vordruck.docx"}  />
      </HStack>
    </>
  );
}
