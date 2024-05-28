import JavascriptIcon from "@mui/icons-material/Javascript";
import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { Start } from "./pages/Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./pages/Game";

function App() {

  const questions =useQuestionsStore(state => state.questions)

  

  return (
    <Container maxWidth="sm">
      
      <Stack
        direction="row"
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <JavascriptIcon fontSize="large" />
        <Typography variant="h2" component={"h1"}>
          Javascript Quiz
        </Typography>

        
      </Stack>

      {questions.length === 0 && <Start />}
      {questions.length > 0 && <Game/>}
    </Container>
  );
}

export default App;
