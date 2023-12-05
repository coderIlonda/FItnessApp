import { View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import React, { useState } from "react"
export const LoginPage = () => {
const [ email, setEmail ] = useState('')
const [ password, setPassword ] = useState('')

    return <View>
<TextInput label='Email' />
<TextInput secureTextEntry label='Password' />
        <View>
            <Button icon='login' >Login </Button>
            </View>
    </View>
}