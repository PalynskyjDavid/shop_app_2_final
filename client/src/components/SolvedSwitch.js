import React from "react";
import { useTranslation } from "react-i18next";

export default function SolvedSwitch({ handlerMap }) {
    const { t } = useTranslation();

    return (
        // <button onClick={() => alert(t("notImplemented."))}>
        <button onClick={() => handlerMap.toggleResolved()}>
            {handlerMap.resolved ? t('showUnresolved') : t('showResolved')}
        </button >
    );
}
