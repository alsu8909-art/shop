import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./App.css";
import { VegetablesPage } from "./pages/VegetablesPage";

export default function App() {
  return (
    <MantineProvider>
      <VegetablesPage />
    </MantineProvider>
  );
}
