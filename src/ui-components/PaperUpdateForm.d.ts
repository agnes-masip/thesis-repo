/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Paper } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PaperUpdateFormInputValues = {
    title?: string;
    description?: string;
    likes?: number;
    author?: string[];
    journal?: string;
    year?: number;
    volume?: string;
    issue?: string;
    doi?: string;
    issn?: string;
    citationStorageLocation?: string;
};
export declare type PaperUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    likes?: ValidationFunction<number>;
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
export declare type PaperUpdateFormOverridesProps = {
    PaperUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type PaperUpdateFormProps = React.PropsWithChildren<{
    overrides?: PaperUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    paper?: Paper;
    onSubmit?: (fields: PaperUpdateFormInputValues) => PaperUpdateFormInputValues;
    onSuccess?: (fields: PaperUpdateFormInputValues) => void;
    onError?: (fields: PaperUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PaperUpdateFormInputValues) => PaperUpdateFormInputValues;
    onValidate?: PaperUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PaperUpdateForm(props: PaperUpdateFormProps): React.ReactElement;