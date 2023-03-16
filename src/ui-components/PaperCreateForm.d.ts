/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PaperCreateFormInputValues = {
    title?: string;
    description?: string;
    likes?: string[];
    author?: string[];
    journal?: string;
    year?: number;
    volume?: string;
    issue?: string;
    doi?: string;
    issn?: string;
    citationStorageLocation?: string;
};
export declare type PaperCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    likes?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    journal?: ValidationFunction<string>;
    year?: ValidationFunction<number>;
    volume?: ValidationFunction<string>;
    issue?: ValidationFunction<string>;
    doi?: ValidationFunction<string>;
    issn?: ValidationFunction<string>;
    citationStorageLocation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PaperCreateFormOverridesProps = {
    PaperCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    journal?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    volume?: PrimitiveOverrideProps<TextFieldProps>;
    issue?: PrimitiveOverrideProps<TextFieldProps>;
    doi?: PrimitiveOverrideProps<TextFieldProps>;
    issn?: PrimitiveOverrideProps<TextFieldProps>;
    citationStorageLocation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PaperCreateFormProps = React.PropsWithChildren<{
    overrides?: PaperCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PaperCreateFormInputValues) => PaperCreateFormInputValues;
    onSuccess?: (fields: PaperCreateFormInputValues) => void;
    onError?: (fields: PaperCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PaperCreateFormInputValues) => PaperCreateFormInputValues;
    onValidate?: PaperCreateFormValidationValues;
} & React.CSSProperties>;
export default function PaperCreateForm(props: PaperCreateFormProps): React.ReactElement;
