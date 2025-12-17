import { TextInput } from "react-native-paper";
import { StyleSheet } from 'react-native';

type Props = {
  value: string;
}

export default function Textfield({ value }: Props) {

    return (
        <TextInput
            value={value}
            editable={false}
            multiline
            numberOfLines={4}
            mode="flat"
            underlineColor="transparent"
            className="bg-white text-black text-3xl"
            style={styles.text_align_right_input}
        />
    );

};

const styles = StyleSheet.create({
  text_align_right_input: {
    textAlign: "right",
    writingDirection: "ltr"
  },
});
