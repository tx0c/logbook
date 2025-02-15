import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { Formik, FormikHelpers } from "formik";
// import { useEthers } from "@usedapp/core";
import { useContractWrite, useAccount } from "wagmi";

import { Dialog, Form } from "~/components";
import { useDialogSwitch, LogbookContext } from "~/hooks";
import { logbookInterface } from "~/utils";

import { WaitCompleteDialog } from "../WaitCompleteDialog";

import styles from "./styles.module.css";

type DialogProps = {
  id: string;
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode;
};

const BaseDialog: React.FC<DialogProps> = ({ id, children }) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true);
  // const { account } = useEthers();

  const logbook = useContext(LogbookContext);

  useEffect(() => {
    console.log("in SettingsDialog: title&summary:", logbook);
  }, [logbook]);

  const [hash, setHash] = useState("");

  const [{ data: accountData }] = useAccount();
  const [, multicall] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: logbookInterface,
    },
    "multicall"
  );
  const [, setTitle] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: logbookInterface,
    },
    "setTitle"
  );
  const [, setDescription] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
      contractInterface: logbookInterface,
    },
    "setDescription"
  );

  const account = accountData?.address;

  const maxAllowedLength = { title: 45, summary: 240 };

  // const { values, isSubmitting, isValid } = useFormikContext();

  const onSubmit = async (
    { title, summary }: { title: string; summary: string },
    formik: FormikHelpers<{
      title: string;
      summary: string;
    }>
  ) => {
    // TODO: analytics
    console.log("submitting:", { title, summary });

    const changedTitle = title !== logbook.title;
    const changedSummary = summary !== logbook.description;
    let data, error;

    if (changedTitle && changedSummary) {
      const calldata = [
        [
          title &&
            title !== logbook.title &&
            logbookInterface.encodeFunctionData("setTitle", [id, title]),
          summary &&
            summary !== logbook.description &&
            logbookInterface.encodeFunctionData("setDescription", [
              id,
              summary,
            ]),
        ].filter(Boolean),
      ];

      ({ data, error } = await multicall({ args: calldata }));
    } else if (changedTitle) {
      // only title changed
      ({ data, error } = await setTitle({ args: [id, title] }));
    } else if (changedSummary) {
      ({ data, error } = await setDescription({ args: [id, summary] }));
    } else {
      console.error("nothing is changing");
      return;
    }

    if (error) {
      console.error("error:", error, formik);

      formik.setErrors({
        title: error?.message || "Failed to set title and summary",
        // summary: errorSummary?.message || "Failed to set summary",
      });
    }

    setHash(data?.hash as string);
    console.log("set title&summary:", data, "refetch:", logbook?.refetch);
    logbook?.refetch();

    closeDialog();
  };

  /* const onValidate = async ({
    title,
    summary,
  }: {
    title: string;
    summary: string;
  }) => {
    const errors = { title: "", summary: "" };
    if (title?.length > maxAllowedLength.title) errors.title = "too long";
    if (summary?.length > maxAllowedLength.summary) errors.summary = "too long";
    if (errors.title || errors.summary) return errors;
    else return;
  }; */

  return (
    <Formik
      initialValues={{
        title: logbook.title as string,
        summary: logbook.description as string,
      }}
      onSubmit={onSubmit}
      // validate={onValidate}
      // onSubmit={() => {console.log("submit!");}}
      // validator={() => ({})}
    >
      {({ values, isSubmitting, isValid, dirty, submitForm }) => (
        <>
          {children({ openDialog })}

          <WaitCompleteDialog
            id={id}
            hash={hash}
            onFinish={() => {
              logbook?.refetch();
            }}
          >
            {({ openDialog: openWaitCompleteDialog }) => (
              <Dialog isOpen={show} onDismiss={closeDialog}>
                <Dialog.Header title="Setting" closeDialog={closeDialog} />

                <Dialog.Content>
                  <Form>
                    <Form.Field
                      label="Title"
                      as="input"
                      name="title"
                      type="text"
                      value={values.title}
                      hint={
                        <p>
                          Max length:&nbsp;
                          <span
                            className={classNames({
                              [styles.error]:
                                values.title?.length > maxAllowedLength.title,
                            })}
                          >
                            {values.title?.length}
                          </span>
                          /{maxAllowedLength.title}
                        </p>
                      }
                    />
                    <Form.Field
                      label="Summary"
                      as="textarea"
                      name="summary"
                      type="text"
                      value={values.summary}
                      hint={
                        <p>
                          Max length:&nbsp;
                          <span
                            className={classNames({
                              [styles.error]:
                                values.summary?.length >
                                maxAllowedLength.summary,
                            })}
                          >
                            {values.summary?.length}
                          </span>
                          /{maxAllowedLength.summary}
                        </p>
                      }
                    />
                  </Form>
                </Dialog.Content>

                <Dialog.Footer.Button
                  color="green"
                  type="submit"
                  // disabled={isSubmitting}
                  disabled={isSubmitting || !isValid || !dirty}
                  onClick={() => {
                    setHash("");
                    openWaitCompleteDialog();
                    closeDialog();
                    submitForm();
                  }}
                >
                  Save
                </Dialog.Footer.Button>
              </Dialog>
            )}
          </WaitCompleteDialog>
        </>
      )}
    </Formik>
  );
};

export const SettingsDialog = (props: DialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
);
