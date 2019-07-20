/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, StatusBar, Button } from 'react-native';

import { default as Amplify } from "aws-amplify";
import { withOAuth } from "aws-amplify-react-native";
import { default as awsConfig } from "./aws-exports";

Amplify.configure(awsConfig);

const initialUrl = 'myapp://main/';

Amplify.configure({
  Auth: {
    oauth: {
      // Domain name
      domain: 'manolo-hosted-ui.auth.us-east-1.amazoncognito.com',
      // domain: 'mhvhvghj.auth.us-east-1.amazoncognito-gamma.com',

      // Authorized scopes
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      // scope: ['email', 'openid'],

      // Callback URL
      redirectSignIn: initialUrl,

      // Sign out URL
      redirectSignOut: initialUrl,

      // 'code' for Authorization code grant, 
      // 'token' for Implicit grant
      responseType: 'code',
      // responseType: 'token',

      // urlOpener: (url, _redirectUrl) => Linking.openURL(url)
    }
  }
});

class App extends React.Component {
  render() {
    const {
      oAuthUser: user,
      oAuthError: error,
      hostedUISignIn,
      facebookSignIn,
      googleSignIn,
      amazonSignIn,
      customProviderSignIn,
      signOut
    } = this.props;

    return (
      <SafeAreaView style={styles.safeArea}>
        {user && <Button title="Sign Out" onPress={signOut} />}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text>{JSON.stringify({ user, error }, null, 2)}</Text>
          {!user && <React.Fragment>
            <Button title="Cognito" onPress={hostedUISignIn} />
            <Button title="Facebook" onPress={facebookSignIn} />
            <Button title="Google" onPress={googleSignIn} />
            <Button title="Amazon" onPress={amazonSignIn} />
            <Button title="Yahoo" onPress={() => customProviderSignIn('Yahoo')} />
          </React.Fragment>}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default withOAuth(App);
