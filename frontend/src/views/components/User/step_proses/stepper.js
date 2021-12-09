import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import { CCard, CCardBody, CCol, CRow, CAlert } from '@coreui/react'
import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"
import './stepper.css'
import { Link } from "react-router-dom";

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,#17a046 0%, #2eb85c 50%, #39e070 100%)"
        }
    },
    completed: {
        "& $line": {
            backgroundImage:
                "linear-gradient( 95deg,#17a046 0%, #2eb85c 50%, #39e070 100%)"
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#eaeaf0",
        borderRadius: 1
    }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundImage:
            "linear-gradient( 136deg, #39e070 0%, #2eb85c 50%, #0f7933 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    },
    completed: {
        backgroundImage:
            "linear-gradient( 136deg, #39e070 0%, #2eb85c 50%, #0f7933 100%)"
    }
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>,
        2: <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>,
        3: <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>,
        4: <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>,
        5: <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" /></svg>,
    };

    const link = {
        1: "/",
        2: "/user/tambah-produk",
        3: "/user/infq",
        4: "/",
        5: "/",
    };
    return (
        <Link to={link[String(props.icon)]}
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}>
            <span>
                {icons[String(props.icon)]}
            </span>
        </Link>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    button: {
        marginRight: theme.spacing(1)
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function getSteps() {
    return ["Register", "Input Produk", "Infaq", "Evaluasi", "Verifikasi"];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return "Registrasi telah dilewati. Selanjutnya silahkan lakukan pengimputan produk.";
        case 1:
            return "Produk baru telah di input. Silahkan lakukan pembayaran infaq untuk meneruskan proses pemeriksaaan.";
        case 2:
            return "Infaq telah kami terima, mohon menunggu proses evaluasi dari petugas";
        case 3:
            return "Produk anda telah kami evaluasi, mohon menunggu proses verifikasi";
        case 4:
            return "Produk anda telah terverifikasi halal.";
        default:
            return "Unknown step";
    }
}

function CustomizedSteppers() {
    const { state } = useContext(AuthContext);
    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
    }
    const classes = useStyles();
    const [getactiveStep, setActiveStep] = useState(1);
    const steps = getSteps();

    useEffect(() => {
        API.getCekStepProses(id_user).then(res => {
            setActiveStep(res.data);
        });
    }, [id_user])

    const valsSteps = (steps) => {
        switch (steps) {
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            default:
                return 0;
        }
    }
    var finalStep = valsSteps(getactiveStep);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <span className={classes.root}>
                            <Stepper
                                alternativeLabel
                                activeStep={finalStep}
                                connector={<ColorlibConnector />}
                            >
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <>
                                {finalStep === steps.length ? (
                                    <>
                                        <div className={classes.instructions}>
                                            <CAlert color="success">
                                                Produk anda telah terverifikasi halal.
                                            </CAlert>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={classes.instructions}>
                                            <CAlert color="success">
                                                {getStepContent(finalStep)}
                                            </CAlert>
                                        </div>
                                    </>
                                )}
                            </>
                        </span>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default CustomizedSteppers;