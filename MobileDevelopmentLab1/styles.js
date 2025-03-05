import { StyleSheet } from "react-native";

export const styles = StyleSheet.create(
{
    center:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export const profileStyles = StyleSheet.create(
{
    title:
    {
        textAlign: "center",
        fontSize: 35,
        margin: 30,
    },

    inputField:
    {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
    },

    label:
    {
        fontSize: 20,
    },

    signUpButton: 
    {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0076ff",
        padding: 10,
        marginTop: 30,
        borderRadius: 5
    }
});

export const homeStyles = StyleSheet.create(
{
    list:
    {
        paddingLeft: 10,
        paddingRight: 10,
    },

    title:
    {
        textAlign: "center",
        fontSize: 25,
        margin: 10,
        fontWeight: 500,
    },

    item:
    {
        padding: 5,
        display: "flex",
        flexDirection: "row",
    },

    itemImage:
    {
        width: 90,
        height: 70,
        margin: 5,
    },

    itemTitle:
    {
        fontSize: 20,
    },

    itemContent:
    {
        paddingLeft: 5,
    },

    itemDate:
    {
        color: "gray",
    },
    
    itemShortText:
    {
        fontSize: 15,
    }
});

export const galleryStyles = StyleSheet.create(
{
    image:
    {
        flex: 1,
        backgroundColor: "#fff",
        aspectRatio: 1.3,
        margin: 7,
        elevation: 15,
        shadowColor: "black",
    }
});
