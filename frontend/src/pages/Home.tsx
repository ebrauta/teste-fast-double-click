import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import DoubleClickButton from "../components/doubleClickButton";
import { useSendElapsedTime } from "../hooks/useSendElapsedTime";
import { useState } from "react";

export default function Home() {
  const { sendElapsedTime, loading, error } = useSendElapsedTime();

  const [showResult, setShowResult] = useState<boolean>(false);
  const [elapse, setElapse] = useState<number>(0);
  
  
  const handleClick = (e: number) => {
    setElapse(e);
    setShowResult(!showResult);
  };

  return (
    <Box component="section">
      <Box component="article">
        <p>
          Clique no botão duas vezes para calcular o tempo entre o primeiro
          clique e o segundo clique.
        </p>
        {!showResult && (
          <DoubleClickButton
            onTimeMeasured={sendElapsedTime}
            doubleClick={handleClick}
          />
        )}
        {loading && <Alert severity="info">Calculando dados...</Alert>}
        {error && <Alert severity="error">Erro: {error}</Alert>}
        {showResult && (
          <Paper elevation={3} sx={styles.paper}>
            <Alert security="success">Registro feito com sucesso!</Alert>
            <Typography variant="h6" color="success">
              Tempo: {elapse} segundos
            </Typography>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setShowResult(false)}
            >
              Tentar Novamente
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    margin: "20px auto",
    padding: "20px",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
  },
};
