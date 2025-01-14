import React, { useState, useEffect } from "react";

import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { TextField, Grid, Button } from "@mui/material";

import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import CustomError from "../Error";
import useOnEnter from "../../hooks/useOnEnter";
import {
  isValidUrl,
  isValidDescription,
  isValidStepsToReproduce,
} from "../../utilities/validators";

const FeedbackPanel: React.FC<{ styleOverrides?: {} }> = ({
  styleOverrides = {},
}) => {
  const intl: IntlShape = useIntl();

  const [feedbackUrl, setFeedbackUrl] = useState<string>("");
  const [feedbackUrlInvalid, setFeedbackUrlInvalid] = useState<boolean>(false); // @TODO all of these useStates probably might could be cleaned up and combined
  const [stepsToReproduce, setStepsToReproduce] = useState<string>("");
  const [stepsToReproduceInvalid, setStepsToReproduceInvalid] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [descriptionInvalid, setDescriptionInvalid] = useState<boolean>(false);
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (
      isValidUrl(feedbackUrl) &&
      isValidDescription(description) &&
      isValidStepsToReproduce(stepsToReproduce)
    ) {
      setAllRequiredValid(true);
    } else {
      setAllRequiredValid(false);
    }
  }, [feedbackUrl, description, stepsToReproduce]);

  useOnEnter(() => {
    if (allRequiredValid) {
      handleFeedbackSubmission();
    }
  });

  const handleFeedbackUrlChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFeedbackUrl: string = event?.currentTarget?.value;
    setFeedbackUrl(currentFeedbackUrl);
    setFeedbackUrlInvalid(!isValidUrl(currentFeedbackUrl));
  };

  const handleDescriptionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentDescription: string = event?.currentTarget?.value;
    setDescription(currentDescription);
    setDescriptionInvalid(!isValidDescription(currentDescription));
  };

  const handleStepsToReproduceChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentStepsToReproduce: string = event?.currentTarget?.value;
    setStepsToReproduce(currentStepsToReproduce);
    setStepsToReproduceInvalid(
      !isValidStepsToReproduce(currentStepsToReproduce)
    );
  };

  const handleFeedbackSubmission: () => void = async () => {
    try {
      // @TODO add the feedback to the database
      // console.log("deleteMe handleFeedbackSubmission called!");
      // console.log("deleteMe feedbackUrl is: " + feedbackUrl);
      // console.log("deleteMe description is: " + description);
      // console.log("deleteMe stepsToReproduce is: " + stepsToReproduce);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <InfoPanel
      titleId="LEAVE_FEEDBACK"
      titleDefault="Leave Feedback"
      styleOverrides={styleOverrides}
      key="my-subscription"
    >
      <InfoPanelBody
        bodyId="GIVE_DEVELOPERS_FEEDBACK_ABOUT_THE_APP"
        bodyDefault="Give the developers feedback about the app."
        styleOverrides={{ marginBottom: "4vh" }}
      />
      <Grid container>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            data-testid={"urlInput"}
            error={feedbackUrlInvalid}
            variant="filled"
            label={
              <FormattedMessage
                id="URL_LINK_TO_ISSUE"
                defaultMessage="URL link to the issue"
              />
            }
            required
            helperText={
              feedbackUrlInvalid
                ? intl.formatMessage({
                    id: "MUST_BE_VALID_URL",
                    defaultMessage: "Must be a valid URL",
                  })
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleFeedbackUrlChange}
            value={feedbackUrl}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            data-testid={"descriptionInput"}
            error={descriptionInvalid}
            variant="filled"
            label={
              <FormattedMessage id="DESCRIPTION" defaultMessage="Description" />
            }
            required
            helperText={
              descriptionInvalid
                ? intl.formatMessage({
                    id: "DESCRIPTION_MUST_BE_INCLUDED",
                    defaultMessage: "Description must be included",
                  })
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleDescriptionChange}
            value={description}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <TextField
            fullWidth
            data-testid={"stepsToReproduceInput"}
            error={stepsToReproduceInvalid}
            variant="filled"
            label={
              <FormattedMessage
                id="STEPS_TO_REPRODUCE"
                defaultMessage="Steps to reproduce"
              />
            }
            required
            helperText={
              stepsToReproduceInvalid
                ? intl.formatMessage({
                    id: "STEPS_TO_REPRODUCE_MUST_BE_INCLUDED",
                    defaultMessage:
                      "Steps to reproduce any issue must be included",
                  })
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleStepsToReproduceChange}
            value={stepsToReproduce}
          ></TextField>
        </Grid>
        <Grid item lg={12} sm={12}>
          <Button
            style={{ marginBottom: 10 }}
            data-testid={"submit-button"}
            variant="contained"
            disabled={!allRequiredValid}
            onClick={handleFeedbackSubmission}
          >
            <FormattedMessage id="SUBMIT" defaultMessage="Submit" />
          </Button>
          {error && <CustomError errorMsg={error} />}
        </Grid>
      </Grid>
    </InfoPanel>
  );
};

export default FeedbackPanel;
