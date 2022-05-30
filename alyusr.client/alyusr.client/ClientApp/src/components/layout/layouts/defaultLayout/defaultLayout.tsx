import { FC, ReactNode, useEffect } from "react";
import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { LayoutHeader } from "../../header/layoutHeader";
import { LayoutFooter } from "../../footer/layoutFooter";
import useCulture from "../../../../hooks/useCulture";
import { CookieGet } from "../../../../utils";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));
export const DefaultLayout: FC<{ children?: ReactNode | undefined }> = ({
  children,
}) => {
  const { changeCulture } = useCulture("");
  const classes = useStyles();
  //@ts-ignore
  const uiLanguage: string =
    process.env.REACT_APP_languageStorageKey != null &&
    process.env.REACT_APP_languageStorageKey != undefined
      ? process.env.REACT_APP_languageStorageKey
      : "";
  //@ts-ignore
  const language: string = Cookies.get(uiLanguage)
    ? CookieGet(uiLanguage)
    : process.env.REACT_APP_defaultUiLanguage;
  useEffect(() => {
    console.log("current_language", language);
    //@ts-ignore
    changeCulture(language);
  }, [language]);
  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            <React.Fragment>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{<LayoutHeader />}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>{children}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>{<LayoutFooter />}</TableCell>
              </TableRow>
            </React.Fragment>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
