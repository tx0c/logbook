import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  useAttrs,
  useChainedCommands,
  useCurrentSelection,
  useExtension,
  // useRemirror,
  useUpdateReason,
} from "@remirror/react";

import {
  createMarkPositioner, // LinkExtension,
  ShortcutHandlerProps,
  LinkExtension,
  LinkAttributes,
} from "remirror/extensions";
import { InputRule, wrappingInputRule } from "@remirror/pm/inputrules";

export class MarkdownLinkExtension extends LinkExtension {
  createInputRules(): InputRule[] {
    const regexp = /[^\!]\[(.*)\]\((https?:\/\/.*)\) /gim;
    console.log("createInputRules:", regexp);

    return [
      // wrappingInputRule(regexp, this.type),
      new InputRule(regexp, (state, _match, start, end) => {
        // const { from, to } = getTextSelection(selection ?? tr.selection, tr.doc);
        const [, title, href] = _match;
        const tr = state.tr;
        console.log(
          "inputrule:",
          regexp,
          state,
          "matched:",
          _match,
          start,
          end
        );

        /*
        const node = this.store.commands.wrapInNode(
          "link",
          {
            title,
            href,
          } as LinkAttributes,
          {}
        );
        console.log("inputrule node:", node); */

        // tr.replaceRangeWith(start, end, title);
        // tr.deleteRange(start, end);
        // tr.insertText(title);

        return tr;
      }),
    ];
  }
}

export function useLinkShortcut() {
  const [linkShortcut, setLinkShortcut] = useState<
    ShortcutHandlerProps | undefined
  >();
  const [isEditing, setIsEditing] = useState(false);

  useExtension(
    MarkdownLinkExtension,
    ({ addHandler }) =>
      addHandler("onShortcut", (props) => {
        if (!isEditing) {
          setIsEditing(true);
        }

        return setLinkShortcut(props);
      }),
    [isEditing]
  );

  return { linkShortcut, isEditing, setIsEditing };
}

export function useFloatingLinkState() {
  const chain = useChainedCommands();
  const { isEditing, linkShortcut, setIsEditing } = useLinkShortcut();
  const { to, empty } = useCurrentSelection();

  const url = (useAttrs().link()?.href as string) ?? "";
  const [href, setHref] = useState<string>(url);

  // A positioner which only shows for links.
  const linkPositioner = useMemo(
    () => createMarkPositioner({ type: "link" }),
    []
  );

  const onRemove = useCallback(() => {
    return chain.removeLink().focus().run();
  }, [chain]);

  const updateReason = useUpdateReason();

  useLayoutEffect(() => {
    if (!isEditing) {
      return;
    }

    if (updateReason.doc || updateReason.selection) {
      setIsEditing(false);
    }
  }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection]);

  useEffect(() => {
    setHref(url);
  }, [url]);

  const submitHref = useCallback(() => {
    setIsEditing(false);
    const range = linkShortcut ?? undefined;

    if (href === "") {
      chain.removeLink();
    } else {
      chain.updateLink({ href, auto: false }, range);
    }

    chain.focus(range?.to ?? to).run();
  }, [setIsEditing, linkShortcut, chain, href, to]);

  const cancelHref = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const clickEdit = useCallback(() => {
    if (empty) {
      chain.selectLink();
    }

    setIsEditing(true);
  }, [chain, empty, setIsEditing]);

  return useMemo(
    () => ({
      href,
      setHref,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    }),
    [
      href,
      linkShortcut,
      linkPositioner,
      isEditing,
      clickEdit,
      onRemove,
      submitHref,
      cancelHref,
    ]
  );
}
