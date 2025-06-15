import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

const endpointMapping = {
  Notion: "notion",
  Airtable: "airtable",
  Hubspot: "hubspot",
};

export const DataForm = ({ integrationType, credentials }) => {
  const [loadedData, setLoadedData] = useState(null);
  const endpoint = endpointMapping[integrationType];
  console.log(integrationType, endpoint);

  const handleLoad = async () => {
    try {
      const formData = new FormData();
      formData.append("credentials", JSON.stringify(credentials));
      const response = await axios.post(
        `http://localhost:8000/integrations/${endpoint}/load`,
        formData
      );
      setLoadedData(JSON.stringify(response.data, null, 2));
    } catch (e) {
      alert(e?.response?.data?.detail);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <Box display="flex" flexDirection="column" width="100%">
        <TextField
          label="Loaded Data"
          value={loadedData || ""}
          sx={{ mt: 2, width: 600 }}
          InputLabelProps={{ shrink: true }}
          multiline
          minRows={10}
          disabled
        />
        <Button onClick={handleLoad} sx={{ mt: 2 }} variant="contained">
          Load Data
        </Button>
        <Button
          onClick={() => setLoadedData(null)}
          sx={{ mt: 1 }}
          variant="contained"
        >
          Clear Data
        </Button>
      </Box>
    </Box>
  );
};
