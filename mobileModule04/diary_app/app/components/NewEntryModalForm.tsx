import { JSX } from 'react/jsx-runtime';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { diaryEntrySchema } from '../validation/diaryValidation';
import { useNetwork } from '../hooks/useNetwork';
import { useFormik, FormikHelpers, FormikProvider } from 'formik';
import { feelings } from '../constants/diary_constants';


type FormValues = {
    title: string;
    feeling: string;
    content: string;
    email: string | null;
};

type NewEntryModalFormProps = {
    visible: boolean;
    hideModal: () => void;
    showSnackBar: (msg: string) => void;
    onSubmit: (data: FormValues) => Promise<void>;
    email: string | null;
};


export function NewEntryModalForm(newEntryModalFormProps: NewEntryModalFormProps): JSX.Element {

    const {visible, hideModal, showSnackBar, onSubmit, email}  = newEntryModalFormProps;
    const { isConnected } = useNetwork();

    const formValues = {
        title: "",
        feeling: "",
        content: "",
        email: email,
    };

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: diaryEntrySchema,
        onSubmit: processSubmit,
    });

    async function processSubmit(values: FormValues, { resetForm, setSubmitting }: FormikHelpers<FormValues>){
        try {
            
            if (!isConnected) {
                Alert.alert(
                    'Offline',
                    'You are currently offline. Your entry cannot be created right now.'
                );
                return;
            }            
            setSubmitting(true);

            await onSubmit(values);

            resetForm();
            hideModal();
            showSnackBar('Entry created successfully!');
        } catch (err: any) {
            console.error('Submit failed:', err);
        } finally {
            setSubmitting(false);
        }
    };


    return (

        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                <Text className="mb-4 text-lg">Diary Entry</Text>

                <FormikProvider value={formik}>
                    <Text className="mb-2 text-base font-medium">
                    Title
                    </Text>
                    <TextInput
                        value={formik.values.title}
                        onChangeText={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        mode="outlined"
                        error={!!(formik.touched.title && formik.errors.title)}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <Text className="text-red text-sm mb-2">
                        {formik.errors.title}
                        </Text>
                    )}

                    <Text className="mt-2 text-base font-medium">
                    Feeling
                    </Text>

                    <View className="border border-black rounded-lg overflow-hidden my-3">
                    <Picker
                    style={{ color: '#000000'}}
                    selectedValue={formik.values.feeling}
                    onValueChange={(value) =>
                        formik.setFieldValue('feeling', value)
                    }
                    >
                    <Picker.Item label="Select feeling…" value="" />
                    {feelings.map(item => (
                        <Picker.Item
                        key={item.id}
                        label={`${item.emoji} ${item.label}`}
                        value={item.id}
                        />
                    ))}
                    </Picker>
                </View>

                {formik.touched.feeling && formik.errors.feeling && (
                    <Text className="text-red text-sm mb-2">
                    {formik.errors.feeling}
                    </Text>
                )}

                <Text className="mb-2 text-base font-medium">
                Content
                </Text>

                <TextInput
                    value={formik.values.content}
                    multiline
                    numberOfLines={4}
                    onChangeText={formik.handleChange('content')}
                    onBlur={formik.handleBlur('content')}
                    mode="outlined"
                    className="h-24 mb-4"
                    style={{ textAlignVertical: 'top' }}
                    error={!!(formik.touched.content && formik.errors.content)}
                />

                {formik.touched.content && formik.errors.content && (
                    <Text className="text-red text-sm mb-2">
                    {formik.errors.content}
                    </Text>
                )}

                <Button
                    className="mt-4"
                    mode="outlined"
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting}
                    onPress={formik.submitForm}
                >
                Submit
                </Button>   
            
                <Button
                    mode="outlined"
                    onPress={hideModal}
                    className="mt-4"
                    disabled={formik.isSubmitting}
                >
                Cancel
                </Button>

                </FormikProvider>
            </Modal>
        </Portal>

    );

}


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
});
