import { Text, TextInput } from 'react-native';
import { fontFamily } from './fonts';

let applied = false;

export function applyDefaultFont() {
  if (applied) return;
  applied = true;

  const TextAny = Text as any;
  const TextInputAny = TextInput as any;

  TextAny.defaultProps = TextAny.defaultProps || {};
  TextAny.defaultProps.style = [{ fontFamily: fontFamily.regular }, TextAny.defaultProps.style];

  TextInputAny.defaultProps = TextInputAny.defaultProps || {};
  TextInputAny.defaultProps.style = [{ fontFamily: fontFamily.regular }, TextInputAny.defaultProps.style];
}
