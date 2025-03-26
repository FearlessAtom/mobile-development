import { ABeeZee_400Regular } from "@expo-google-fonts/abeezee"
import { useFonts } from "@expo-google-fonts/abeezee";

import {Screens} from "./screens/Screens.js";
import { ThemeProvider } from "./ThemeContext.js";

export default function App()
{
    useFonts(
    {
        ABeeZee_400Regular,
    });

    return <ThemeProvider>
        <Screens />
    </ThemeProvider>
}
