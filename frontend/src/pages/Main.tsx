import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Home from "./Home";
import Records from "./Records";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Main() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography component="h1" variant="h4">
          Fast Double-Click
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Página Inicial" />
          <Tab label="Recordes" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Records />
        </TabPanel>
      </Box>
    </Container>
  );
}
