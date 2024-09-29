import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT, vs, WIDTH} from '@utils';
import Feather from 'react-native-vector-icons/Feather';
import {AppButton, AppTextInput} from '@components';
import {Form, useFormik} from 'formik';
import {LoginInput, loginSchema} from '@schemas/login.schema';
const initialValues: LoginInput = {
  email: '',
  password: '',
};
const EmailAndPassword = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const {resetForm, values, handleChange, handleSubmit, errors} = useFormik<LoginInput>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (value: LoginInput) => {
      console.log('value', value);
    },
  });
  return (
    <>
      <AppTextInput
        withAsterisk
        label="Email"
        outStyle={styles.textInputOutStyle}
        containerStyle={styles.w}
        value={values.email}
        onChangeText={handleChange('email')}
        error={errors.email}
      />
      <AppTextInput
        withAsterisk
        label="Mật khẩu"
        secureTextEntry={hidePassword}
        trailing={<Feather name={hidePassword ? 'eye' : 'eye-off'} size={20} color={COLORS.grey} />}
        outStyle={styles.textInputOutStyle}
        onTrailingPress={() => setHidePassword(!hidePassword)}
        containerStyle={styles.w}
        value={values.password}
        onChangeText={handleChange('password')}
        error={errors.password}
      />
      <TouchableOpacity style={styles.forgotCont}>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <AppButton
        label="Đăng nhập"
        size="S"
        buttonStyle={{width: WIDTH * 0.85, marginVertical: vs(20)}}
        labelStyle={[FONT.content.L, {color: COLORS.white}]}
        onPress={handleSubmit}
      />
      <View style={styles.dividerCont}>
        <View style={styles.divider} />
        <Text style={[FONT.content.XS.medium, {color: COLORS.grey}]}>OR</Text>
        <View style={styles.divider} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputOutStyle: {
    marginTop: vs(20),
  },
  forgotCont: {
    alignSelf: 'flex-end',
    marginTop: vs(8),
  },
  forgotPassword: {
    textDecorationLine: 'underline',
    color: COLORS.green,
  },
  w: {
    width: WIDTH * 0.85,
  },
  dividerCont: {
    marginVertical: vs(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    width: WIDTH * 0.38,
    height: vs(0.75),
    backgroundColor: COLORS.grey,
  },
});

export default EmailAndPassword;
