/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { List } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ListCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    papers: [],
    listOwner: "",
    sharedWith: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [papers, setPapers] = React.useState(initialValues.papers);
  const [listOwner, setListOwner] = React.useState(initialValues.listOwner);
  const [sharedWith, setSharedWith] = React.useState(initialValues.sharedWith);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setPapers(initialValues.papers);
    setCurrentPapersValue("");
    setListOwner(initialValues.listOwner);
    setSharedWith(initialValues.sharedWith);
    setCurrentSharedWithValue("");
    setErrors({});
  };
  const [currentPapersValue, setCurrentPapersValue] = React.useState("");
  const papersRef = React.createRef();
  const [currentSharedWithValue, setCurrentSharedWithValue] =
    React.useState("");
  const sharedWithRef = React.createRef();
  const validations = {
    title: [{ type: "Required" }],
    papers: [],
    listOwner: [{ type: "Required" }],
    sharedWith: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          papers,
          listOwner,
          sharedWith,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new List(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ListCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              papers,
              listOwner,
              sharedWith,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              papers: values,
              listOwner,
              sharedWith,
            };
            const result = onChange(modelFields);
            values = result?.papers ?? values;
          }
          setPapers(values);
          setCurrentPapersValue("");
        }}
        currentFieldValue={currentPapersValue}
        label={"Papers"}
        items={papers}
        hasError={errors?.papers?.hasError}
        errorMessage={errors?.papers?.errorMessage}
        setFieldValue={setCurrentPapersValue}
        inputFieldRef={papersRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Papers"
          isRequired={false}
          isReadOnly={false}
          value={currentPapersValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.papers?.hasError) {
              runValidationTasks("papers", value);
            }
            setCurrentPapersValue(value);
          }}
          onBlur={() => runValidationTasks("papers", currentPapersValue)}
          errorMessage={errors.papers?.errorMessage}
          hasError={errors.papers?.hasError}
          ref={papersRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "papers")}
        ></TextField>
      </ArrayField>
      <TextField
        label="List owner"
        isRequired={true}
        isReadOnly={false}
        value={listOwner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              papers,
              listOwner: value,
              sharedWith,
            };
            const result = onChange(modelFields);
            value = result?.listOwner ?? value;
          }
          if (errors.listOwner?.hasError) {
            runValidationTasks("listOwner", value);
          }
          setListOwner(value);
        }}
        onBlur={() => runValidationTasks("listOwner", listOwner)}
        errorMessage={errors.listOwner?.errorMessage}
        hasError={errors.listOwner?.hasError}
        {...getOverrideProps(overrides, "listOwner")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              papers,
              listOwner,
              sharedWith: values,
            };
            const result = onChange(modelFields);
            values = result?.sharedWith ?? values;
          }
          setSharedWith(values);
          setCurrentSharedWithValue("");
        }}
        currentFieldValue={currentSharedWithValue}
        label={"Shared with"}
        items={sharedWith}
        hasError={errors?.sharedWith?.hasError}
        errorMessage={errors?.sharedWith?.errorMessage}
        setFieldValue={setCurrentSharedWithValue}
        inputFieldRef={sharedWithRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Shared with"
          isRequired={false}
          isReadOnly={false}
          value={currentSharedWithValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sharedWith?.hasError) {
              runValidationTasks("sharedWith", value);
            }
            setCurrentSharedWithValue(value);
          }}
          onBlur={() =>
            runValidationTasks("sharedWith", currentSharedWithValue)
          }
          errorMessage={errors.sharedWith?.errorMessage}
          hasError={errors.sharedWith?.hasError}
          ref={sharedWithRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sharedWith")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
