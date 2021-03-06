import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import AuthService from "../src/services/Auth";

export default Login = () => {
	return (
		<>
			<View style={{ flex: 3, justifyContent: "center" }}>
				<Text
					style={{
						fontSize: 80,
						textAlign: "center",
					}}
				>
					ASAP Bookings
				</Text>
			</View>
			<View style={styles.container}>
				<Icon.Button
					style={{ margin: 10, alignSelf: "center" }}
					name="facebook"
					backgroundColor="#3b5998"
					onPress={AuthService.loginWithFacebook}
				>
					Login with Facebook
				</Icon.Button>
				{/* <Button
					onPress={AuthService.loginWithFacebook}
					title="Login with Facebook"
				/> */}
				<Icon.Button
					style={{ margin: 10, alignSelf: "center" }}
					name="google"
					backgroundColor="#DB4437"
					onPress={AuthService.loginWithGoogle}
				>
					Login with Google
				</Icon.Button>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		margin: 20,
	},
});
