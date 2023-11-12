import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit} from 'react-native-health';
import { LineChart } from "react-native-chart-kit";


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
    // -------------------#---------------------- RING PROPERTIES ---------------------#------------------- 
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign 
        onPress={() => changeDate ( - 1 )} 
        name='left' 
        size={20} 
        color='white'/>

        <Text style={styles.date}>{date.toDateString()}</Text>

        <AntDesign
        onPress={() => changeDate ( + 1 )}  
        name='right' 
        size={20} 
        color='white'/>
      </View>
      
      <RingProgress radius={110} strokeWidth={30} progress={steps / STEP_GOAL} />

      <View style={styles.values}>

        <Value label="Steps" value={steps.toString()}/>
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`}/>
        <Value label="Flights" value={flights.toString()}/>

      </View>
  

    <View>   
        <LineChart
          data={{
           labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
           datasets: [
           {
             data: [
             2312,
             4849,
             5543,
             7895,
             4873,
             6372,
             9157
            ]
            
            }]
          }}
    width={Dimensions.get("window").width} // from react-native
    height={250}
    //yAxisLabel=""
    //yAxisSuffix="ft"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: 'black',
      backgroundGradientFrom: "#040f13",
      backgroundGradientTo: "#000000",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 5
      },
      propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#15E005"
      }
    }}
    bezier
    style={{
      borderRadius: 15,
      marginTop: 60,
      marginHorizontal: -12,
    }}
  />
</View>

      <StatusBar style="auto" />
    </View>
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
