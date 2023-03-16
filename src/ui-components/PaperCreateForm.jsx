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
import { Paper } from "../models";
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
export default function PaperCreateForm(props) {
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
    description: "",
    likes: [],
    author: [],
    journal: "",
    year: "",
    volume: "",
    issue: "",
    doi: "",
    issn: "",
    citationStorageLocation: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [likes, setLikes] = React.useState(initialValues.likes);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [journal, setJournal] = React.useState(initialValues.journal);
  const [year, setYear] = React.useState(initialValues.year);
  const [volume, setVolume] = React.useState(initialValues.volume);
  const [issue, setIssue] = React.useState(initialValues.issue);
  const [doi, setDoi] = React.useState(initialValues.doi);
  const [issn, setIssn] = React.useState(initialValues.issn);
  const [citationStorageLocation, setCitationStorageLocation] = React.useState(
    initialValues.citationStorageLocation
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setLikes(initialValues.likes);
    setCurrentLikesValue("");
    setAuthor(initialValues.author);
    setCurrentAuthorValue("");
    setJournal(initialValues.journal);
    setYear(initialValues.year);
    setVolume(initialValues.volume);
    setIssue(initialValues.issue);
    setDoi(initialValues.doi);
    setIssn(initialValues.issn);
    setCitationStorageLocation(initialValues.citationStorageLocation);
    setErrors({});
  };
  const [currentLikesValue, setCurrentLikesValue] = React.useState("");
  const likesRef = React.createRef();
  const [currentAuthorValue, setCurrentAuthorValue] = React.useState("");
  const authorRef = React.createRef();
  const validations = {
    title: [{ type: "Required" }],
    description: [{ type: "Required" }],
    likes: [],
    author: [{ type: "Required" }],
    journal: [],
    year: [],
    volume: [],
    issue: [],
    doi: [],
    issn: [],
    citationStorageLocation: [{ type: "URL" }],
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
          description,
          likes,
          author,
          journal,
          year,
          volume,
          issue,
          doi,
          issn,
          citationStorageLocation,
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
          await DataStore.save(new Paper(modelFields));
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
      {...getOverrideProps(overrides, "PaperCreateForm")}
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
              description,
              likes,
              author,
              journal,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
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
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              likes,
              author,
              journal,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes: values,
              author,
              journal,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            values = result?.likes ?? values;
          }
          setLikes(values);
          setCurrentLikesValue("");
        }}
        currentFieldValue={currentLikesValue}
        label={"Likes"}
        items={likes}
        hasError={errors?.likes?.hasError}
        errorMessage={errors?.likes?.errorMessage}
        setFieldValue={setCurrentLikesValue}
        inputFieldRef={likesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Likes"
          isRequired={false}
          isReadOnly={false}
          value={currentLikesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.likes?.hasError) {
              runValidationTasks("likes", value);
            }
            setCurrentLikesValue(value);
          }}
          onBlur={() => runValidationTasks("likes", currentLikesValue)}
          errorMessage={errors.likes?.errorMessage}
          hasError={errors.likes?.hasError}
          ref={likesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "likes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author: values,
              journal,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            values = result?.author ?? values;
          }
          setAuthor(values);
          setCurrentAuthorValue("");
        }}
        currentFieldValue={currentAuthorValue}
        label={"Author"}
        items={author}
        hasError={errors?.author?.hasError}
        errorMessage={errors?.author?.errorMessage}
        setFieldValue={setCurrentAuthorValue}
        inputFieldRef={authorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Author"
          isRequired={true}
          isReadOnly={false}
          value={currentAuthorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.author?.hasError) {
              runValidationTasks("author", value);
            }
            setCurrentAuthorValue(value);
          }}
          onBlur={() => runValidationTasks("author", currentAuthorValue)}
          errorMessage={errors.author?.errorMessage}
          hasError={errors.author?.hasError}
          ref={authorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "author")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Journal"
        isRequired={false}
        isReadOnly={false}
        value={journal}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal: value,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.journal ?? value;
          }
          if (errors.journal?.hasError) {
            runValidationTasks("journal", value);
          }
          setJournal(value);
        }}
        onBlur={() => runValidationTasks("journal", journal)}
        errorMessage={errors.journal?.errorMessage}
        hasError={errors.journal?.hasError}
        {...getOverrideProps(overrides, "journal")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year: value,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Volume"
        isRequired={false}
        isReadOnly={false}
        value={volume}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year,
              volume: value,
              issue,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.volume ?? value;
          }
          if (errors.volume?.hasError) {
            runValidationTasks("volume", value);
          }
          setVolume(value);
        }}
        onBlur={() => runValidationTasks("volume", volume)}
        errorMessage={errors.volume?.errorMessage}
        hasError={errors.volume?.hasError}
        {...getOverrideProps(overrides, "volume")}
      ></TextField>
      <TextField
        label="Issue"
        isRequired={false}
        isReadOnly={false}
        value={issue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year,
              volume,
              issue: value,
              doi,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.issue ?? value;
          }
          if (errors.issue?.hasError) {
            runValidationTasks("issue", value);
          }
          setIssue(value);
        }}
        onBlur={() => runValidationTasks("issue", issue)}
        errorMessage={errors.issue?.errorMessage}
        hasError={errors.issue?.hasError}
        {...getOverrideProps(overrides, "issue")}
      ></TextField>
      <TextField
        label="Doi"
        isRequired={false}
        isReadOnly={false}
        value={doi}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year,
              volume,
              issue,
              doi: value,
              issn,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.doi ?? value;
          }
          if (errors.doi?.hasError) {
            runValidationTasks("doi", value);
          }
          setDoi(value);
        }}
        onBlur={() => runValidationTasks("doi", doi)}
        errorMessage={errors.doi?.errorMessage}
        hasError={errors.doi?.hasError}
        {...getOverrideProps(overrides, "doi")}
      ></TextField>
      <TextField
        label="Issn"
        isRequired={false}
        isReadOnly={false}
        value={issn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year,
              volume,
              issue,
              doi,
              issn: value,
              citationStorageLocation,
            };
            const result = onChange(modelFields);
            value = result?.issn ?? value;
          }
          if (errors.issn?.hasError) {
            runValidationTasks("issn", value);
          }
          setIssn(value);
        }}
        onBlur={() => runValidationTasks("issn", issn)}
        errorMessage={errors.issn?.errorMessage}
        hasError={errors.issn?.hasError}
        {...getOverrideProps(overrides, "issn")}
      ></TextField>
      <TextField
        label="Citation storage location"
        isRequired={false}
        isReadOnly={false}
        value={citationStorageLocation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              likes,
              author,
              journal,
              year,
              volume,
              issue,
              doi,
              issn,
              citationStorageLocation: value,
            };
            const result = onChange(modelFields);
            value = result?.citationStorageLocation ?? value;
          }
          if (errors.citationStorageLocation?.hasError) {
            runValidationTasks("citationStorageLocation", value);
          }
          setCitationStorageLocation(value);
        }}
        onBlur={() =>
          runValidationTasks("citationStorageLocation", citationStorageLocation)
        }
        errorMessage={errors.citationStorageLocation?.errorMessage}
        hasError={errors.citationStorageLocation?.hasError}
        {...getOverrideProps(overrides, "citationStorageLocation")}
      ></TextField>
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
