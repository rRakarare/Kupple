import { Box, Center, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import * as xlsx from "xlsx/xlsx.mjs";
import { useDataStore } from "../utils/store";

function Dropper() {
  const inputRef = useRef(null);
  const setData = useDataStore((state) => state.setData);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        const newjson = json.map((item) => {
          let obj = item;
          const dateSerialNumber = Number(item["Geb."]); // example serial number for 2021-09-01
          const date = new Date((dateSerialNumber - 25569) * 86400 * 1000);
          obj["Geb."] = date.toLocaleDateString();
          return obj;
        });
        setData(newjson);
      };
      reader.readAsArrayBuffer(acceptedFiles[0]);
    }
  }, []);

  const readUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        const newjson = json.map((item) => {
          let obj = item;
          const dateSerialNumber = Number(item["Geb."]); // example serial number for 2021-09-01
          const date = new Date((dateSerialNumber - 25569) * 86400 * 1000);
          obj["Geb."] = date.toLocaleDateString();
          return obj;
        });
        setData(newjson);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      my={5}
      {...getRootProps()}
      p={5}
      border={"dashed 1px grey"}
      borderRadius={"2xl"}
      cursor={"pointer"}
      onClick={() => inputRef.current.click()}
    >
      <Input
        {...getInputProps()}
        ref={inputRef}
        display={"none"}
        w={0}
        h={0}
        type="file"
        name="upload"
        id="upload"
        aria-hidden="true"
        onChange={readUploadFile}
        cursor={"pointer"}
      />
      <Center>
        <VStack>
          <Heading size={"lg"}>leckmi</Heading>
          <Text>
            <strong>Drop File</strong> or <strong>Click</strong> to choose from
            directory
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}

export default Dropper;
