import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ToastConfiguration {
	text: string;
	actionText?: string;
	type?: 'danger' | 'success' | 'warning' ;
	duration?: number;
	onDismiss?: () => any;
	onActionClick?: () => any;
}

export interface ConfirmConfiguration {
	title?: string;
	message: string;
	positiveButtonTitle?: string;
	negativeButtonTitle?: string;
	onPositiveButtonPress?: () => any;
	onNegativeButtonPress?: () => any;
}

export interface AlertConfiguration {
	title?: string;
	message: string;
	buttonTitle?: string;
	onButtonPress?: () => any;
}
