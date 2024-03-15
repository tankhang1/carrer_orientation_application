import {View, Text} from 'react-native';
import React from 'react';
import {atom, useAtom} from 'jotai';
import {atomWithQuery} from 'jotai-tanstack-query';
import {useFlipper} from '@react-navigation/devtools';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@utils/config';
const idAtom = atom(1);
const userAtom = atomWithQuery(get => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async ({queryKey: [, id]}) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  },
}));
const App = () => {
  const [{data, isPending, isError}] = useAtom(userAtom);
  if (isPending) return <Text>Loading....</Text>;
  if (isError) return <Text>Error</Text>;
  return (
    <View>
      <Text style={{fontFamily: 'Raleway-Bold', color: COLORS.orange}}>
        {JSON.stringify(data, null, 2)}
      </Text>
      <AntDesign name="arrowright" />
    </View>
  );
};

export default App;
