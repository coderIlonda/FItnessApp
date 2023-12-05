import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit} from 'react-native-health';
import { LineChart } from "react-native-chart-kit";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Exercice } from './Excercice';
import { LoginPage } from './Login';

const Tab = createBottomTabNavigator()
const Practice = () => <SafeAreaView style={{flex:1}} ><Exercice/></SafeAreaView>
const Login = () => <SafeAreaView style={{flex:1}} ><LoginPage/></SafeAreaView>
const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.FlightsClimbed,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};

const STEP_GOAL = 10_000;


export default function App() {

//-------------------------------------- To make the Date more dynamic ------------------------------------

  const [date, setDate] = useState(new Date())
  const{steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays : number) => {
    const currentDate = new Date(date); //Create a copy of the new date

    //Update the date by adding/substracting the number of days
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  }

  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name='Login' component={Login} />
      <Tab.Screen name='Step Counter' component={Practice} />
    </Tab.Navigator>
   </NavigationContainer>
  );
}

// -------------------#---------------------- RING PROPERTIES ---------------------#------------------- 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
    flexDirection: 'column',
    gap: 10,
    marginTop: -60,
  },

  values: {
    flexDirection: 'row', 
    gap: 80,
    flexWrap: 'wrap',
    marginTop: 5,
  },

  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  date: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },

});
