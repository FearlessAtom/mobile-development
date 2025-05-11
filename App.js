import { AuthProvider, useAuth } from "./contexts/AuthContext.js";
import { NavigationContainer } from '@react-navigation/native';
import AppStack from "./stacks/AppStack.js";
import GuestStack from "./stacks/GuestStack.js";

function AppContent()
{
    const { loggedInUser } = useAuth();

    return <NavigationContainer>
        { loggedInUser ? <AppStack /> : <GuestStack /> }
    </NavigationContainer>
}

export default function App()
{
    return <AuthProvider>
        <AppContent />
    </AuthProvider>
}
