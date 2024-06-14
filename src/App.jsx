import "./App.css";
import { MainPage } from "@/features/main-page";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <MainPage />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
