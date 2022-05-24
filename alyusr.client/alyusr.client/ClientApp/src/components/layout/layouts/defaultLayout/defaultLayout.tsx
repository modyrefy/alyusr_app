﻿import { FC, ReactNode } from "react";
import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { LayoutHeader } from "../../header/layoutHeader";
import { LayoutFooter } from "../../footer/layoutFooter";



const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        // marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    }
}));
export const DefaultLayout: FC<{ children?: ReactNode | undefined }> = ({ children }) => {
    const classes = useStyles();
    return (<>
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
    </>)

}