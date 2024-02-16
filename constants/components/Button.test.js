import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Button from './Button';

// useNavigation mock'u ekleyin
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

test('should trigger onPress when pressed', () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <NavigationContainer>
      <Button onPress={onPressMock} text="Click me" />
    </NavigationContainer>
  );

  // Test devam eder...
});
